
import { useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Copy, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../UI/Button';
import { copyToClipboard, highlightTerminalOutput } from '@/utils/helpers';
import { cn } from '@/lib/utils';

interface TerminalProps {
  lines: string[];
  onClear: () => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Terminal = ({ 
  lines, 
  onClear, 
  className,
  isCollapsed = false,
  onToggleCollapse
}: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current && !isCollapsed) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, isCollapsed]);

  const handleCopy = async () => {
    if (lines.length > 0) {
      const success = await copyToClipboard(lines.join('\n'));
      if (success) {
        toast.success('Terminal output copied to clipboard');
      } else {
        toast.error('Failed to copy terminal output');
      }
    }
  };

  return (
    <div className={cn('terminal-container flex flex-col', className)}>
      <div className="flex items-center justify-between p-2 bg-terminal border-b border-border">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-terminal-foreground" />
          <span className="text-sm font-medium text-terminal-foreground">Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-7 w-7 text-terminal-foreground hover:bg-white/10"
            aria-label="Copy terminal output"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-7 w-7 text-terminal-foreground hover:bg-white/10"
            aria-label="Clear terminal"
          >
            <Trash className="h-3.5 w-3.5" />
          </Button>
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-7 w-7 text-terminal-foreground hover:bg-white/10"
              aria-label={isCollapsed ? "Expand terminal" : "Collapse terminal"}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!isCollapsed && (
        <div
          ref={terminalRef}
          className="bg-terminal text-terminal-foreground p-3 overflow-y-auto font-mono text-sm flex-1"
          style={{ minHeight: '8rem', maxHeight: '12rem' }}
        >
          {lines.length === 0 ? (
            <div className="text-terminal-foreground/60 italic">
              Terminal output will appear here...
            </div>
          ) : (
            <div className="space-y-1">
              {lines.map((line, index) => (
                <div 
                  key={index} 
                  className="whitespace-pre-wrap break-all"
                  dangerouslySetInnerHTML={{ __html: highlightTerminalOutput(line) }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Terminal;
