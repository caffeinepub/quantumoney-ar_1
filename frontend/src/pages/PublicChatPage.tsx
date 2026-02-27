import React, { useState, useRef, useEffect } from 'react';
import { usePublicChat } from '../hooks/usePublicChat';
import { Send, MessageCircle } from 'lucide-react';

export default function PublicChatPage() {
  const { messages, sendMessage } = usePublicChat();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setIsSending(true);
    try {
      await sendMessage(name.trim(), content.trim());
      setContent('');
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-yellow-400 font-cinzel tracking-wide flex items-center gap-3">
            <MessageCircle className="w-7 h-7" />
            Chat Público
          </h1>
          <p className="text-yellow-300/50 text-xs font-rajdhani mt-1">
            ⚠️ Chat em memória — as mensagens não são persistidas entre sessões
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 glass-card p-4 overflow-y-auto mb-4 space-y-3 min-h-0">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-yellow-300/30 font-rajdhani text-sm">Sem mensagens ainda. Sê o primeiro a escrever!</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="border border-yellow-400/20 p-3 bg-black/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-yellow-400 font-bold text-sm font-rajdhani">{msg.authorName}</span>
                  <span className="text-yellow-300/30 text-xs font-rajdhani">
                    {new Date(msg.timestamp).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-yellow-300/80 text-sm font-rajdhani">{msg.content}</p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="glass-card p-4 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="O teu nome..."
                maxLength={30}
                className="w-full bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400 placeholder:text-yellow-400/30"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Escreve uma mensagem..."
              maxLength={500}
              rows={2}
              className="flex-1 bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400 resize-none placeholder:text-yellow-400/30"
            />
            <button
              type="submit"
              disabled={isSending || !name.trim() || !content.trim()}
              className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed self-end"
            >
              {isSending ? (
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
