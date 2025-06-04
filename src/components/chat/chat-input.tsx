import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '@/lib/store';
import { formatMarkdown } from '@/lib/utils';

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  isGenerating: boolean;
}

export function ChatInput({ onSubmit, isGenerating }: ChatInputProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  
  // Handle form submit
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isGenerating) return;
    
    setMessage('');
    await onSubmit(trimmedMessage);
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="p-4 border-t border-border bg-background">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="relative flex items-center">
          <TextareaAutosize
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('typeMessage')}
            minRows={1}
            maxRows={5}
            disabled={isGenerating}
            className="flex-1 resize-none border rounded-md px-3 py-2 min-h-[44px] pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={message.trim() === '' || isGenerating}
            variant="ghost"
          >
            <Send size={18} className="text-primary" />
          </Button>
        </div>
      </form>
    </div>
  );
}