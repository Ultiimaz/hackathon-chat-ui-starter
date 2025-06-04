import { useEffect, useRef } from 'react';
import { UserIcon } from 'lucide-react';
import { Message } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ChatMessagesProps {
  messages: Message[];
  isGenerating: boolean;
}

export function ChatMessages({ messages, isGenerating }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Skip first message if it's a system message
  const displayMessages = messages.length > 0 && messages[0].role === 'system'
    ? messages.slice(1)
    : messages;

  // Render each message
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {displayMessages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      
      {/* Typing indicator */}
      {isGenerating && (
        <div className={cn(
          "flex gap-3 p-4 border-b border-border",
          "bg-card"
        )}>
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-white">
            <div className="h-5 w-5">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-1 items-center">
              <span className="text-sm font-medium text-muted-foreground">Thinking</span>
              <div className="flex typing-dots">
                <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-typing-dot"></div>
                <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-typing-dot"></div>
                <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-typing-dot"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 border-b border-border",
      isUser ? "bg-background" : "bg-card"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md",
        isUser ? "bg-primary text-white" : "bg-primary text-white"
      )}>
        {isUser ? (
          <UserIcon className="h-5 w-5" />
        ) : (
          <div className="h-5 w-5">
            <svg stroke="currentColor\" fill="none\" strokeWidth="2\" viewBox="0 0 24 24\" strokeLinecap="round\" strokeLinejoin="round\" height="100%\" width="100%\" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
            </svg>
          </div>
        )}
      </div>
      <div 
        className="message-content markdown flex-1"
        dangerouslySetInnerHTML={{ 
          __html: message.content
        }}
      />
    </div>
  );
}