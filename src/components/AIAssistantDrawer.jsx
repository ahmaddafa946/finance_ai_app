import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, RefreshCw, Key, ArrowUpRight, AlertCircle, Bot, User } from 'lucide-react';
import { askGeminiFinancialAdvisor } from '../services/gemini.js';
import { marked } from 'marked';

export default function AIAssistantDrawer({ isOpen, onClose, apiKey, onOpenKeyModal, financialContext }) {
  const [messages, setMessages] = useState([
    {
      sender: 'model',
      text: 'Halo! Saya **FinPulse AI**, penasihat keuangan & bisnis Anda. Saya dapat membantu menganalisis arus kas perusahaan, menghitung margin produk, hingga merancang strategi penghematan operasional. Apa yang ingin Anda diskusikan hari ini?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const promptSuggestions = [
    'Analisis rasio efisiensi beban operasional kami',
    'Bagaimana cara mengoptimalkan cash runway 6 bulan ke depan?',
    'Buat ringkasan kesehatan finansial berdasarkan data transaksi',
    'Strategi meningkatkan Gross Profit Margin 5%'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim() || loading) return;

    if (!apiKey) {
      setError('Harap masukkan Gemini API Key terlebih dahulu.');
      onOpenKeyModal();
      return;
    }

    setError('');
    const newMessages = [...messages, { sender: 'user', text: promptToSend }];
    setMessages(newMessages);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const responseText = await askGeminiFinancialAdvisor({
        apiKey,
        prompt: promptToSend,
        conversationHistory: newMessages.slice(1, -1),
        systemContext: financialContext
      });

      setMessages((prev) => [...prev, { sender: 'model', text: responseText }]);
    } catch (err) {
      setError(err.message || 'Gagal menghubungi Gemini API.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900/95 border-l border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">FinPulse AI Advisor</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Gemini 2.5</span>
            </div>
            <p className="text-[11px] text-slate-400">CFO & Business Intelligence Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenKeyModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Pengaturan API Key"
          >
            <Key size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'model' && (
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} />
              </div>
            )}
            <div
              className={`max-w-[85%] text-xs leading-relaxed p-3.5 rounded-xl ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-slate-950 border border-slate-800/90 text-slate-200 rounded-bl-none prose prose-invert prose-xs max-w-none'
              }`}
            >
              {msg.sender === 'user' ? (
                msg.text
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(msg.text)
                  }}
                />
              )}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-xs text-slate-400 pl-9">
            <RefreshCw size={14} className="animate-spin text-emerald-400" />
            <span>FinPulse AI sedang menganalisis data keuangan...</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-2">
          Pilihan Pertanyaan Cepat:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {promptSuggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSend(suggestion)}
              disabled={loading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1 transition-colors text-left"
            >
              <span>{suggestion}</span>
              <ArrowUpRight size={10} className="text-emerald-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan analisis keuangan atau strategi bisnis..."
            className="flex-1 bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
