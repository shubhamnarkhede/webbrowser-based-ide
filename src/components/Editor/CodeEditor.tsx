
import React, { useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import Button from '../UI/Button';
import { getLanguageOptions } from '../../utils/themes';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onChangeLanguage: (language: string) => void;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  onRun,
  onSave,
  onUndo,
  onRedo,
  onChangeLanguage,
  className = '',
}) => {
  const editorRef = useRef<any>(null);
  const languageOptions = getLanguageOptions();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  // Get Monaco language ID
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      javascript: 'javascript',
      typescript: 'typescript',
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      csharp: 'csharp',
      ruby: 'ruby',
      go: 'go',
      php: 'php',
      rust: 'rust',
      swift: 'swift',
      kotlin: 'kotlin'
    };
    
    return languageMap[lang.toLowerCase()] || 'plaintext';
  };

  return (
    <div className={`flex flex-col border rounded-md overflow-hidden ${className}`}>
      <div className="bg-gray-100 p-2 border-b flex items-center justify-between">
        <div className="flex space-x-2">
          <Button 
            onClick={onRun} 
            variant="primary"
            className="flex items-center"
          >
            <span className="mr-1">▶</span> Run
          </Button>
          <Button 
            onClick={onSave}
            variant="outline"
          >
            Save
          </Button>
          <Button 
            onClick={onUndo}
            variant="ghost"
          >
            Undo
          </Button>
          <Button 
            onClick={onRedo}
            variant="ghost"
          >
            Redo
          </Button>
        </div>
        <div>
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm bg-white"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={getMonacoLanguage(language)}
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
