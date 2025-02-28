
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Header from './components/UI/Header';
import CodeEditor from './components/Editor/CodeEditor';
import Terminal from './components/Terminal/Terminal';
import { getDefaultCode } from './utils/themes';

function App() {
  const [code, setCode] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [language, setLanguage] = useState('javascript');
  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(false);
  const [codeHistory, setCodeHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize code from local storage or default
  useEffect(() => {
    const savedCode = localStorage.getItem('code');
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    if (savedCode) {
      setCode(savedCode);
      // Initialize history with saved code
      setCodeHistory([savedCode]);
    } else {
      const defaultCode = getDefaultCode(language);
      setCode(defaultCode);
      // Initialize history with default code
      setCodeHistory([defaultCode]);
    }
  }, []);

  // Update localStorage when code changes
  useEffect(() => {
    if (code) {
      localStorage.setItem('code', code);
    }
  }, [code]);
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // If empty code or switching language, load default code
    if (!code || code === getDefaultCode(language !== 'javascript' ? 'javascript' : 'typescript')) {
      const defaultCode = getDefaultCode(language);
      setCode(defaultCode);
      
      // Reset history with new default code
      setCodeHistory([defaultCode]);
      setHistoryIndex(0);
    }
  }, [language]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    // Clear previous terminal output
    setTerminalLines([]);
    
    // Only JavaScript can be executed in the browser
    if (language === 'javascript') {
      try {
        // Create a new function with console.log that writes to our terminal
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleInfo = console.info;
        
        const captureOutput = (method: string, ...args: any[]) => {
          const output = args.map(arg => 
            typeof arg === 'object' 
              ? JSON.stringify(arg, null, 2) 
              : String(arg)
          ).join(' ');
          
          setTerminalLines(prev => [...prev, `[${method}] ${output}`]);
          
          // Also log to the actual console for debugging
          if (method === 'log') originalConsoleLog(...args);
          if (method === 'error') originalConsoleError(...args);
          if (method === 'warn') originalConsoleWarn(...args);
          if (method === 'info') originalConsoleInfo(...args);
        };
        
        // Override console methods
        console.log = (...args) => captureOutput('log', ...args);
        console.error = (...args) => captureOutput('error', ...args);
        console.warn = (...args) => captureOutput('warn', ...args);
        console.info = (...args) => captureOutput('info', ...args);
        
        // Add timestamp to track execution time
        const startTime = performance.now();
        setTerminalLines(prev => [...prev, `[system] Executing JavaScript...`]);
        
        // Execute the code in a new Function context
        // We use a self-invoking function wrapper to avoid scope issues
        new Function(`
          try {
            ${code}
          } catch (error) {
            console.error(error.message);
          }
        `)();
        
        const endTime = performance.now();
        const executionTime = Math.round((endTime - startTime) * 100) / 100;
        
        setTerminalLines(prev => [...prev, `[system] Execution completed in ${executionTime}ms`]);
        
        // Restore original console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
        console.info = originalConsoleInfo;
      } catch (error) {
        if (error instanceof Error) {
          setTerminalLines(prev => [...prev, `[error] ${error.message}`]);
        }
      }
    } else {
      // For non-JavaScript languages, just show a message
      setTerminalLines([
        `[system] Running ${language} code requires a server environment.`,
        `[system] This browser-based editor can only execute JavaScript.`
      ]);
    }
    
    // Expand terminal when running code
    setIsTerminalCollapsed(false);
  };

  const handleSaveCode = () => {
    // Save code to local storage
    localStorage.setItem('code', code);
    
    // Add to history if different from last entry
    if (code !== codeHistory[codeHistory.length - 1]) {
      const newHistory = [...codeHistory.slice(0, historyIndex + 1), code];
      setCodeHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    
    // Show toast notification
    setTerminalLines(prev => [...prev, `[system] Code saved successfully`]);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCode(codeHistory[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < codeHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCode(codeHistory[historyIndex + 1]);
    }
  };

  const handleClearTerminal = () => {
    setTerminalLines([]);
  };

  const handleNewFile = () => {
    const defaultCode = getDefaultCode(language);
    setCode(defaultCode);
    setTerminalLines([]);
    
    // Reset history with new default code
    setCodeHistory([defaultCode]);
    setHistoryIndex(0);
  };

  const handleShare = () => {
    // Create a shareable URL that includes encoded code
    try {
      const encodedCode = encodeURIComponent(code);
      const encodedLanguage = encodeURIComponent(language);
      const shareableUrl = `${window.location.origin}${window.location.pathname}?code=${encodedCode}&lang=${encodedLanguage}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareableUrl)
        .then(() => {
          setTerminalLines(prev => [...prev, `[system] Shareable link copied to clipboard`]);
        })
        .catch(err => {
          setTerminalLines(prev => [...prev, `[error] Failed to copy link: ${err.message}`]);
        });
    } catch (error) {
      if (error instanceof Error) {
        setTerminalLines(prev => [...prev, `[error] Failed to generate shareable link: ${error.message}`]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Header 
        onNewFile={handleNewFile}
        onSave={handleSaveCode}
        onShare={handleShare}
      />
      <main className="flex-1 pt-20 container mx-auto p-4 max-w-6xl">
        <div className="grid grid-cols-1 gap-4">
          <CodeEditor
            code={code}
            language={language}
            onChange={handleCodeChange}
            onRun={handleRunCode}
            onSave={handleSaveCode}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onChangeLanguage={setLanguage}
            className="w-full h-[60vh]"
          />
          <Terminal
            lines={terminalLines}
            onClear={handleClearTerminal}
            isCollapsed={isTerminalCollapsed}
            onToggleCollapse={() => setIsTerminalCollapsed(!isTerminalCollapsed)}
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
