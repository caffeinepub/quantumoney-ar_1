import React, { useState, useRef, useEffect } from 'react';
import { usePublicChat } from '../hooks/usePublicChat';
import { useAuth } from '../contexts/AuthContext';
import PageShell from '../components/PageShell';
import Container from '../components/Container';
import { PageTitle } from '../components/Typography';
import { Send, MessageCircle, AlertCircle } from 'lucide-react';

export default function PublicChatPage() {
  const { identity } = useAuth();
  const { messages, isLoading, sendMessage, isSending } = usePublicChat();
  const [content, setContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || !identity) return;
    await sendMessage(content.trim());
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageShell>
      <Container size="md">
        <div className="py-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
            <PageTitle>Chat Público</PageTitle>
          </div>

          {!identity && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-4 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Faça login para enviar mensagens.</span>
            </div>
          )}

          {/* Messages */}
          <div className="luxury-glass-card rounded-lg border border-primary/20 h-96 overflow-y-auto p-4 space-y-3 mb-4">
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">A carregar mensagens...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhuma mensagem ainda. Seja o primeiro a escrever!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{msg.authorName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(Number(msg.timestamp) / 1_000_000).toLocaleTimeString('pt-PT')}
                    </span>
                  </div>
                  <p className="text-sm text-foreground bg-muted/20 rounded px-3 py-2">{msg.content}</p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={identity ? 'Escreva uma mensagem...' : 'Faça login para escrever...'}
              disabled={!identity || isSending}
              rows={2}
              className="flex-1 bg-background border border-primary/30 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!content.trim() || !identity || isSending}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isSending ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
