
import type { editor } from 'monaco-editor';

export const editorThemes: Record<string, editor.IStandaloneThemeData> = {
  light: {
    base: 'vs' as const,
    inherit: true,
    rules: [
      { background: 'F8F9FC' }
    ],
    colors: {
      'editor.background': '#F8F9FC',
      'editor.foreground': '#2D3748',
      'editorCursor.foreground': '#4A5568',
      'editor.lineHighlightBackground': '#EDF2F7',
      'editorLineNumber.foreground': '#A0AEC0',
      'editor.selectionBackground': '#E2E8F0',
      'editor.inactiveSelectionBackground': '#EDF2F7',
    }
  },
  dark: {
    base: 'vs-dark' as const,
    inherit: true,
    rules: [
      { background: '1A202C' }
    ],
    colors: {
      'editor.background': '#1A202C',
      'editor.foreground': '#E2E8F0',
      'editorCursor.foreground': '#A0AEC0',
      'editor.lineHighlightBackground': '#2D3748',
      'editorLineNumber.foreground': '#718096',
      'editor.selectionBackground': '#4A5568',
      'editor.inactiveSelectionBackground': '#2D3748',
    }
  }
};

export const languageOptions = [
  { id: 'javascript', name: 'JavaScript', extension: 'js', mime: 'text/javascript' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', mime: 'text/typescript' },
  { id: 'html', name: 'HTML', extension: 'html', mime: 'text/html' },
  { id: 'css', name: 'CSS', extension: 'css', mime: 'text/css' },
  { id: 'json', name: 'JSON', extension: 'json', mime: 'application/json' },
  { id: 'markdown', name: 'Markdown', extension: 'md', mime: 'text/markdown' },
  { id: 'python', name: 'Python', extension: 'py', mime: 'text/x-python' },
  { id: 'java', name: 'Java', extension: 'java', mime: 'text/x-java-source' },
  { id: 'c', name: 'C', extension: 'c', mime: 'text/x-csrc' },
  { id: 'cpp', name: 'C++', extension: 'cpp', mime: 'text/x-c++src' },
];

export const getDefaultCode = (language: string): string => {
  switch (language) {
    case 'javascript':
      return `// Welcome to ScriptSynthesizer!\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n`;
    case 'typescript':
      return `// Welcome to ScriptSynthesizer!\n\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n`;
    case 'html':
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>\n`;
    case 'css':
      return `body {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;\n  color: #333;\n  line-height: 1.5;\n}\n\nh1 {\n  color: #2c5282;\n}\n`;
    case 'json':
      return `{\n  "name": "ScriptSynthesizer",\n  "version": "1.0.0",\n  "description": "A beautiful, minimalist code editor",\n  "author": "You"\n}\n`;
    case 'markdown':
      return `# Welcome to ScriptSynthesizer\n\n## Features\n\n- Beautiful, minimal interface\n- Syntax highlighting\n- Multiple language support\n\n## Getting Started\n\nStart typing your markdown content here...\n`;
    case 'python':
      return `# Welcome to ScriptSynthesizer!\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n`;
    case 'java':
      return `// Welcome to ScriptSynthesizer!\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`;
    case 'c':
      return `// Welcome to ScriptSynthesizer!\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n`;
    case 'cpp':
      return `// Welcome to ScriptSynthesizer!\n\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n`;
    default:
      return `// Welcome to ScriptSynthesizer!\n\n// Start coding here...\n`;
  }
};
