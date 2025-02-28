
import { useState, useEffect, useCallback } from 'react';
import { debounce } from '@/utils/helpers';
import { getDefaultCode } from '@/utils/themes';

interface EditorState {
  code: string;
  language: string;
  fileName: string;
  isSaved: boolean;
  lastSaved: Date | null;
}

export const useEditor = (initialLanguage = 'javascript') => {
  const [state, setState] = useState<EditorState>({
    code: getDefaultCode(initialLanguage),
    language: initialLanguage,
    fileName: `untitled.${getFileExtension(initialLanguage)}`,
    isSaved: false,
    lastSaved: null
  });

  const [history, setHistory] = useState<string[]>([state.code]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [terminal, setTerminal] = useState<string[]>([]);

  // Update code
  const updateCode = useCallback((newCode: string) => {
    setState(prev => ({ ...prev, code: newCode, isSaved: false }));
    
    // Add to history (debounced)
    debouncedUpdateHistory(newCode);
  }, []);

  // Debounced history update
  const debouncedUpdateHistory = useCallback(
    debounce((code: string) => {
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), code];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }, 1000),
    [historyIndex]
  );

  // Change language
  const changeLanguage = useCallback((newLanguage: string) => {
    setState(prev => ({
      ...prev,
      language: newLanguage,
      fileName: `${prev.fileName.split('.')[0]}.${getFileExtension(newLanguage)}`
    }));
  }, []);

  // Set file name
  const setFileName = useCallback((name: string) => {
    setState(prev => ({ ...prev, fileName: name }));
  }, []);

  // Save code
  const saveCode = useCallback(() => {
    setState(prev => ({ ...prev, isSaved: true, lastSaved: new Date() }));
    
    // Example - In a real app, you'd save to localStorage or backend
    localStorage.setItem('scriptSynthesizer_lastCode', state.code);
    localStorage.setItem('scriptSynthesizer_lastLanguage', state.language);
    
    addToTerminal(`File saved: ${state.fileName}`);
    
    return true;
  }, [state.code, state.language, state.fileName]);

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevCode = history[historyIndex - 1];
      setState(prev => ({ ...prev, code: prevCode, isSaved: false }));
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextCode = history[historyIndex + 1];
      setState(prev => ({ ...prev, code: nextCode, isSaved: false }));
    }
  }, [history, historyIndex]);

  // Add message to terminal
  const addToTerminal = useCallback((message: string) => {
    setTerminal(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  // Clear terminal
  const clearTerminal = useCallback(() => {
    setTerminal([]);
  }, []);

  // Run code
  const runCode = useCallback(() => {
    addToTerminal(`Running ${state.fileName}...`);
    
    try {
      // This is a simple example - in a real app, you would use a more secure approach
      // such as a web worker or iframe sandbox
      if (state.language === 'javascript') {
        const consoleLog = console.log;
        const consoleError = console.error;
        const consoleWarn = console.warn;
        const logs: string[] = [];
        
        // Override console methods to capture output
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
          consoleLog(...args);
        };
        console.error = (...args) => {
          logs.push(`Error: ${args.map(arg => String(arg)).join(' ')}`);
          consoleError(...args);
        };
        console.warn = (...args) => {
          logs.push(`Warning: ${args.map(arg => String(arg)).join(' ')}`);
          consoleWarn(...args);
        };
        
        // Execute the code
        try {
          // eslint-disable-next-line no-new-func
          const result = new Function(state.code)();
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          // Add logs to terminal
          logs.forEach(log => addToTerminal(log));
          addToTerminal('Execution completed successfully.');
        } catch (error) {
          addToTerminal(`Runtime error: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Restore console methods
        console.log = consoleLog;
        console.error = consoleError;
        console.warn = consoleWarn;
      } else {
        addToTerminal(`Execution of ${state.language} code is not supported in the browser.`);
      }
    } catch (error) {
      addToTerminal(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [state.code, state.language, state.fileName, addToTerminal]);

  // Load saved code on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('scriptSynthesizer_lastCode');
    const savedLanguage = localStorage.getItem('scriptSynthesizer_lastLanguage');
    
    if (savedCode && savedLanguage) {
      setState({
        code: savedCode,
        language: savedLanguage,
        fileName: `untitled.${getFileExtension(savedLanguage)}`,
        isSaved: true,
        lastSaved: null
      });
      setHistory([savedCode]);
    }
  }, []);

  return {
    code: state.code,
    language: state.language,
    fileName: state.fileName,
    isSaved: state.isSaved,
    lastSaved: state.lastSaved,
    terminal,
    updateCode,
    changeLanguage,
    setFileName,
    saveCode,
    undo,
    redo,
    addToTerminal,
    clearTerminal,
    runCode
  };
};

// Helper function to get file extension from language
function getFileExtension(language: string): string {
  switch (language.toLowerCase()) {
    case 'javascript': return 'js';
    case 'typescript': return 'ts';
    case 'html': return 'html';
    case 'css': return 'css';
    case 'json': return 'json';
    case 'markdown': return 'md';
    case 'python': return 'py';
    case 'java': return 'java';
    case 'c': return 'c';
    case 'cpp': return 'cpp';
    default: return 'txt';
  }
}

export default useEditor;
