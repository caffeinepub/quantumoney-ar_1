import { useState, useEffect, useRef } from 'react';
import { usePublicChat } from '@/hooks/usePublicChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Info } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';

export default function PublicChatPage() {
  const { messages, sendMessage } = usePublicChat();
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('Anonymous');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(username, inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-6">
          <PageTitle icon={<MessageSquare className="w-12 h-12" />}>
            Public Chat
          </PageTitle>

          <Card className="glass-card border-amber-900/30 bg-amber-900/10">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 text-sm leading-relaxed">
                  <strong>Session-Only Chat:</strong> This chat is simulated in your browser. 
                  Messages are not saved and will disappear when you reload the page. 
                  No backend storage or synchronization across devices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card-elevated border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Chat Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name"
                  className="bg-background/50 border-primary/30 text-primary placeholder:text-muted-foreground"
                />
              </div>

              <div className="h-96 overflow-y-auto space-y-3 p-4 glass-card rounded-lg scrollbar-thin">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex flex-col gap-1 animate-fade-in"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-primary font-semibold text-sm">{msg.sender}</span>
                        <span className="text-muted-foreground text-xs">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="glass-card-elevated p-3 rounded-lg border border-primary/30 max-w-[80%] shadow-lg">
                        <p className="text-primary text-sm break-words leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50 border-primary/30 text-primary placeholder:text-muted-foreground"
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputMessage.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
