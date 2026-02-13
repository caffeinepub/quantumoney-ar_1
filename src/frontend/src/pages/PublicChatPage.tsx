import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PageShell from '@/components/PageShell';
import Container from '@/components/Container';
import { PageTitle } from '@/components/Typography';
import { usePublicChat } from '@/hooks/usePublicChat';
import { toast } from 'sonner';

export default function PublicChatPage() {
  const [message, setMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    isSending,
    sendMessage,
  } = usePublicChat();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !authorName.trim()) {
      toast.error('Please enter both your name and message');
      return;
    }

    if (message.length > 500) {
      toast.error('Message too long (max 500 characters)');
      return;
    }

    try {
      await sendMessage(authorName.trim(), message.trim());
      setMessage('');
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <PageShell>
      <Container>
        <div className="py-12 space-y-8">
          <div className="space-y-3">
            <PageTitle icon={<MessageSquare className="w-12 h-12" />}>
              Public Chat
            </PageTitle>
            <p className="text-muted-foreground text-lg">
              Connect with the Quantumoney community
            </p>
          </div>

          <Card className="glass-card border-blue-500/30 bg-blue-900/10">
            <CardContent className="p-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-blue-300 text-sm font-semibold">
                  Session-Only Chat (Simulated)
                </p>
                <p className="text-blue-200/80 text-xs leading-relaxed">
                  This chat is stored in memory for the current browser session only. Messages are not persisted, 
                  not synchronized across users or devices, and will be cleared when you reload the page. 
                  This is a demonstration feature for UI testing purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                Messages
                <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                  {messages.length} messages
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 border border-primary/20 rounded-xl bg-primary/5">
                    <MessageSquare className="w-12 h-12 text-primary/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No messages yet. Be the first to say hello!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 bg-background/50 border border-primary/20 rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-semibold text-sm">
                            {msg.authorName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm break-words">
                          {msg.content}
                        </p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    maxLength={50}
                    className="w-full px-4 py-2 bg-background/50 border border-primary/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isSending}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    rows={4}
                    className="bg-background/50 border-primary/30 resize-none"
                    disabled={isSending}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/500 characters
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isSending || !message.trim() || !authorName.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
