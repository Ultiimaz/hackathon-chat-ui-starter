import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChatStore, useThemeStore } from '@/lib/store';
import { useState } from 'react';

interface ChatSidebarProps {
  onOpenClearModal: () => void;
}

export function ChatSidebar({ onOpenClearModal }: ChatSidebarProps) {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  const { chatHistory, currentChatId, createNewChat, loadChat } = useChatStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Handle theme change
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    setTheme(value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  };

  return (
    <div className="w-64 h-full bg-secondary flex flex-col p-4 dark:bg-slate-800 border-r border-border">
      <Button 
        onClick={createNewChat}
        className="w-full justify-start gap-2 mb-4"
        variant="outline"
      >
        <PlusIcon size={16} />
        {t('newChat')}
      </Button>
      
      {/* Theme Switcher */}
      <div className="mb-4">
        <label htmlFor="theme-select" className="text-sm text-muted-foreground mb-1 block">
          {t('theme')}
        </label>
        <Select value={selectedTheme} onValueChange={handleThemeChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('theme')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {chatHistory.map((chat) => (
          <div 
            key={chat.id}
            className={`p-2 text-sm rounded hover:bg-accent cursor-pointer truncate ${
              chat.id === currentChatId ? 'bg-muted' : ''
            }`}
            onClick={() => loadChat(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border">
        <Button 
          onClick={onOpenClearModal}
          variant="destructive"
          className="w-full flex items-center gap-2"
          size="sm"
        >
          <Trash2Icon size={16} />
          {t('clearAllData')}
        </Button>
      </div>
    </div>
  );
}