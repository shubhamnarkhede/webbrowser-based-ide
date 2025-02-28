
import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { editorThemes, languageOptions } from '@/utils/themes';
import {Button} from '../UI/Button';
import { Play, ChevronDown, ChevronsUpDown, Undo, Redo, Save, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onChangeLanguage: (lang: string) => void;
  className?: string;
}

const CodeEditor = ({ 
  code, 
  language, 
  onChange, 
  onRun, 
  onSave, 
  onUndo, 
  onRedo,
  onChangeLanguage,
  className 
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if dark mode is enabled
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      
      // Apply theme to existing editor
      if (monacoRef.current) {
        monaco.editor.setTheme(isDark ? 'dark' : 'light');
      }
    };
    
    checkDarkMode();
    
    // Create observer to detect theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Initialize Monaco editor
  useEffect(() => {
    if (editorRef.current) {
      // Define the themes
      monaco.editor.defineTheme('light', editorThemes.light);
      monaco.editor.defineTheme('dark', editorThemes.dark);
      
      // Create editor
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: code,
        language,
        theme: isDarkMode ? 'dark' : 'light',
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        tabSize: 2,
        scrollbar: {
          useShadows: false,
          verticalHasArrows: false,
          horizontalHasArrows: false,
          vertical: 'visible',
          horizontal: 'visible',
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        }
      });
      
      // Update code on change
      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current?.getValue() || '');
      });
      
      // Add keyboard shortcuts
      monacoRef.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        () => onSave()
      );
      
      monacoRef.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ,
        () => onUndo()
      );
      
      monacoRef.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY,
        () => onRedo()
      );
      
      monacoRef.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        () => onRun()
      );
      
      return () => {
        monacoRef.current?.dispose();
      };
    }
  }, [code, language, onChange, onSave, onUndo, onRedo, onRun, isDarkMode]);
  
  // Update language when it changes
  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);
  
  // Handle language change
  const handleLanguageChange = (lang: string) => {
    onChangeLanguage(lang);
    setIsLanguageMenuOpen(false);
    toast.success(`Language changed to ${lang}`);
  };
  
  // Get current language display name
  const getCurrentLanguage = () => {
    const lang = languageOptions.find(l => l.id === language);
    return lang ? lang.name : 'Text';
  };
  
  return (
    <div className={cn('editor-container flex flex-col', className)}>
      <div className="editor-header">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Editor</span>
          
          <div className="relative ml-4">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              {getCurrentLanguage()}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
            
            {isLanguageMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-40 z-10 bg-popover border border-border rounded-md shadow-md py-1 animate-fade-in">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.id}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                    onClick={() => handleLanguageChange(lang.id)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            className="h-7 w-7"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            className="h-7 w-7"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="h-7 w-7"
            title="Save (Ctrl+S)"
          >
            <Save className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onRun}
            className="h-7 text-xs"
            title="Run (Ctrl+Enter)"
          >
            <Play className="mr-1 h-3 w-3" />
            Run
          </Button>
        </div>
      </div>
      
      <div 
        ref={editorRef} 
        className="flex-1"
        style={{ height: 'calc(100% - 40px)', minHeight: '300px' }}
      />
    </div>
  );
};

export default CodeEditor;
