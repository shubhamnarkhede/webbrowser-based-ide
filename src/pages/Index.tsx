
import React, { useState, useEffect } from 'react';
import Header from '@/components/UI/Header';
import CodeEditor from '@/components/Editor/CodeEditor';
import Terminal from '@/components/Terminal/Terminal';
import useEditor from '@/hooks/useEditor';
import { toast } from 'sonner';
import { getDefaultCode } from '@/utils/themes';
import { ChevronsUpDown, Share2 } from 'lucide-react';
import Button from '@/components/UI/Button';
import { copyToClipboard } from '@/utils/helpers';

const Index = () => {
  const {
    code,
    language,
    fileName,
    updateCode,
    changeLanguage,
    saveCode,
    undo,
    redo,
    terminal,
    addToTerminal,
    clearTerminal,
    runCode
  } = useEditor('javascript');

  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after initial render for animations
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Handler for creating a new file
  const handleNewFile = () => {
    // Show a confirmation dialog if there are unsaved changes
    if (window.confirm('Create a new file? Any unsaved changes will be lost.')) {
      updateCode(getDefaultCode(language));
      toast.success('Created new file');
    }
  };

  // Handler for saving code
  const handleSave = () => {
    const saved = saveCode();
    if (saved) {
      toast.success('File saved successfully');
    }
  };

  // Handler for sharing code
  const handleShare = async () => {
    try {
      // In a real app, this would generate a shareable link
      // For demonstration, we'll just copy the code to clipboard
      const success = await copyToClipboard(code);
      if (success) {
        toast.success('Code copied to clipboard');
      } else {
        toast.error('Failed to copy code');
      }
    } catch (error) {
      toast.error('Error sharing code');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-0" />
      
      {/* Header */}
      <Header
        onNewFile={handleNewFile}
        onSave={handleSave}
        onShare={handleShare}
      />
      
      {/* Main content */}
      <main className={`flex-1 container mx-auto px-4 pt-24 pb-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Hero section */}
          <div className="text-center mb-8 animate-slide-in">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3">
              Beautiful Code Editor
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Script<span className="text-primary font-extrabold">Synthesizer</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A minimal, intuitive code editor with a beautiful design. Perfect for quick scripting, experimenting, and sharing code snippets.
            </p>
          </div>
          
          {/* Editor section */}
          <div className="grid gap-6">
            <CodeEditor
              code={code}
              language={language}
              onChange={updateCode}
              onRun={runCode}
              onSave={handleSave}
              onUndo={undo}
              onRedo={redo}
              onChangeLanguage={changeLanguage}
              className="shadow-lg animate-fade-in transition-all duration-300 ease-in-out"
            />
            
            {/* Terminal section */}
            <Terminal
              lines={terminal}
              onClear={clearTerminal}
              isCollapsed={isTerminalCollapsed}
              onToggleCollapse={() => setIsTerminalCollapsed(!isTerminalCollapsed)}
              className="shadow-lg animate-fade-in transition-all duration-300 ease-in-out"
            />
          </div>
          
          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ChevronsUpDown className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multiple Languages</h3>
              <p className="text-muted-foreground text-sm">
                Write and run code in various programming languages with syntax highlighting and auto-completion.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Share your code snippets with others with a simple click. Perfect for collaboration.
              </p>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Execution</h3>
              <p className="text-muted-foreground text-sm">
                Run your code in a safe environment with dedicated execution contexts and output capture.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ScriptSynthesizer. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
