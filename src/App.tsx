import { useEffect } from 'react';
import { ChatContainer } from '@/components/chat-container';
import { useThemeStore } from '@/lib/store';

function App() {
  const { theme } = useThemeStore();
  
  // Apply theme on component mount and when theme changes
  useEffect(() => {
    // Apply theme class to root html element
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <div className="app-wrapper">
      <ChatContainer />
    </div>
  );
}

export default App;