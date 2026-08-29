import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AI_DEMO_CONVERSATIONS } from '../../data/mockData';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { Sparkles, Send, Bot, User, CheckCircle, ShieldAlert, Calendar } from 'lucide-react';

export interface AIChatPreviewProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const AIChatPreview: React.FC<AIChatPreviewProps> = ({ onSelectServiceToBook }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; recommendedService?: { id: string; title: string; duration: string } }>>([
    {
      sender: 'user',
      text: AI_DEMO_CONVERSATIONS[0].prompt,
    },
    {
      sender: 'ai',
      text: AI_DEMO_CONVERSATIONS[0].response,
      recommendedService: AI_DEMO_CONVERSATIONS[0].recommendedService,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectPrompt = (index: number) => {
    setActivePromptIndex(index);
    const selected = AI_DEMO_CONVERSATIONS[index];

    setIsTyping(true);
    setMessages([
      { sender: 'user', text: selected.prompt },
    ]);

    setTimeout(() => {
      setMessages([
        { sender: 'user', text: selected.prompt },
        { sender: 'ai', text: selected.response, recommendedService: selected.recommendedService },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput('');
    setIsTyping(true);

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on what you've described regarding "${userText.slice(0, 30)}...", this could be addressed during a gentle Veterinary Consultation or specialized Wellness assessment. Would you like to schedule an examination?`,
          recommendedService: {
            id: 'veterinary',
            title: 'General Health & Vitals Consultation',
            duration: '30 min',
          },
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section id="ai-assistant" className="py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="24/7 Intelligent Support"
          cursiveSubtitle="Intelligent Triage & Care"
          title="Meet Your AI Pet Care Assistant"
          description="Have questions at 2 AM or unsure which appointment type to select? Our AI assistant analyzes symptoms, breed traits, and age to give instant, trustworthy guidance."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Context & Feature Highlights */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-warm-md border border-cream-300 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-cream-200">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-sm shrink-0"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-chocolate-900 leading-tight">
                    Smart Breed-Aware Guidance
                  </h3>
                  <span className="text-xs text-terracotta-600 font-semibold flex items-center gap-1">
                    <SparkleIllustration size={10} color="#D97746" /> Instant advice calibrated to your pet’s profile
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-chocolate-700/90">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Symptom Triage:</strong> Uncovers whether an ear scratch is routine dirt or requires clinical attention.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Grooming Schedule Optimization:</strong> Recommends ideal deshedding intervals based on coat density.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vaccine Passport Reminders:</strong> Alerts you before booster windows expire so your pet is always protected.
                  </span>
                </div>
              </div>

              {/* Medical Notice Box */}
              <div className="bg-sand-100 rounded-2xl p-3.5 sm:p-4 border border-sand-300/80 flex items-start gap-2.5 sm:gap-3 text-xs text-chocolate-800">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Safety First:</strong> The AI Assistant offers initial triage. For emergencies, our licensed veterinarians are on standby.
                </p>
              </div>

              {/* Sample Prompts */}
              <div>
                <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block mb-2">
                  Try Sample Questions:
                </span>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {AI_DEMO_CONVERSATIONS.map((demo, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectPrompt(idx)}
                      className={`text-left text-xs p-2.5 sm:p-3 rounded-xl border transition-all text-balance ${
                        activePromptIndex === idx
                          ? 'bg-terracotta-50 border-terracotta-400 text-terracotta-900 font-semibold shadow-warm-xs'
                          : 'bg-cream-100/80 border-cream-300 text-chocolate-800 hover:bg-cream-200/70'
                      }`}
                      data-cursor="ask"
                      data-cursor-text="Ask ✨"
                    >
                      💬 "{demo.prompt}"
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mock AI Chat Interface */}
          <div className="lg:col-span-7">
            <div className="bg-chocolate-900 text-cream-50 rounded-3xl sm:rounded-5xl p-5 sm:p-8 shadow-warm-xl border border-chocolate-800 flex flex-col h-[480px] sm:h-[540px] lg:h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-chocolate-800">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-sm shrink-0"
                    >
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-chocolate-900 rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-white">PetCare AI Assistant</h4>
                      <Badge variant="terracotta" size="sm" className="text-[10px] py-0.5 px-2">Preview</Badge>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-cream-300/80">Trained on veterinary wellness protocols</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-mono hidden sm:inline-block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
                </span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto py-4 sm:py-5 space-y-3.5 sm:space-y-4 pr-1">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex gap-2.5 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-terracotta-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-warm-xs">
                          <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      )}

                      <div className={`max-w-[88%] sm:max-w-[80%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-terracotta-600 text-white rounded-tr-none shadow-warm-xs'
                              : 'bg-chocolate-800 text-cream-100 border border-chocolate-700 rounded-tl-none shadow-warm-xs'
                          }`}
                        >
                          {msg.text}
                        </div>

                        {/* AI Service Recommendation Embedded Card */}
                        {msg.recommendedService && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="bg-chocolate-950/90 rounded-2xl p-3.5 sm:p-4 border border-terracotta-500/40 shadow-warm-md text-left card-hover-glow"
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-terracotta-400 tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Recommended Match
                              </span>
                              <span className="text-[10px] sm:text-[11px] text-cream-300">
                                ~{msg.recommendedService.duration}
                              </span>
                            </div>

                            <h5 className="text-xs sm:text-sm font-bold text-white mb-2.5">
                              {msg.recommendedService.title}
                            </h5>

                            <Button
                              variant="terracotta"
                              size="sm"
                              onClick={() => onSelectServiceToBook(msg.recommendedService?.id || 'veterinary')}
                              className="w-full text-xs font-bold justify-center py-2 shadow-warm-xs hover:scale-102"
                              leftIcon={<Calendar className="w-3.5 h-3.5" />}
                              data-cursor="book"
                              data-cursor-text="Book"
                            >
                              Book Recommended Care
                            </Button>
                          </motion.div>
                        )}
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cream-200 text-chocolate-900 flex items-center justify-center shrink-0 mt-1 shadow-warm-xs">
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-cream-400 pl-9 sm:pl-11 py-1"
                  >
                    <PawIllustration size={14} color="#D97746" variant="float" />
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[11px] text-cream-400/90 font-medium ml-1">Analyzing pet symptoms...</span>
                  </motion.div>
                )}
              </div>

              {/* Chat Input Bar with Glow */}
              <form onSubmit={handleSendCustomMessage} className="pt-2.5 sm:pt-3 border-t border-chocolate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a pet care question..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 bg-chocolate-800 border border-chocolate-700 text-white placeholder:text-cream-400/60 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!customInput.trim()}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-terracotta-500 text-white hover:bg-terracotta-600 disabled:opacity-40 disabled:hover:bg-terracotta-500 transition-colors flex items-center justify-center shrink-0 shadow-warm-xs"
                  aria-label="Send message"
                  data-cursor="ask"
                  data-cursor-text="Send"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
