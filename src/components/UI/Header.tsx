
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import {Button} from './Button';
import { FileText, Code, Share2, Save, Coffee } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/utils/helpers';

interface HeaderProps {
  onNewFile: () => void;
  onSave: () => void;
  onShare: () => void;
}

const Header = ({ onNewFile, onSave, onShare }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        'backdrop-blur-md border-b',
        isScrolled 
          ? 'bg-background/80 border-border shadow-sm' 
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium tracking-tight">
            Script<span className="font-bold">Synthesizer</span>
          </h1>
          <div className="hidden md:flex items-center ml-6 space-x-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onNewFile}
              className="text-sm"
            >
              <FileText className="mr-1 h-4 w-4" />
              New
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSave}
              className="text-sm"
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onShare}
              className="text-sm"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast.success("Thanks for your support!")}
            className="text-sm hidden md:flex"
          >
            <Coffee className="mr-1 h-4 w-4" />
            Buy me a coffee
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
