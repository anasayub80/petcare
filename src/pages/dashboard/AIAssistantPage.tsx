import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { usePetCare, calculatePetAge } from '../../context/PetCareContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PawIllustration, SparkleIllustration } from '../../components/common/PetIllustrations';
import {
  Bot,
  User,
  Send,
  Sparkles,
  ShieldAlert,
  Calendar,
  RefreshCw,
  Dog,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    link: string;
    icon?: React.ReactNode;
  }[];
}

export const AIAssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPetId = searchParams.get('petId') || '';

  const { pets } = usePetCare();
  const navigate = useNavigate();

  const [selectedPetId, setSelectedPetId] = useState(initialPetId || (pets[0]?.id || ''));
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const selectedPet = pets.find((p) => p.id === selectedPetId);

  const initialGreeting: Message = {
    id: 'msg-0',
    sender: 'ai',
    text: selectedPet
      ? `Hello! I'm your AI Pet Care Assistant. I have ${selectedPet.name}'s profile loaded (${selectedPet.breed}, ${calculatePetAge(selectedPet.dateOfBirth)}, ${selectedPet.weight} ${selectedPet.weightUnit}). How can I assist you with ${selectedPet.name}'s wellness, grooming, or health questions today?`
      : `Hello! I'm your AI Pet Care Assistant. I can help recommend grooming schedules, triage common symptoms, and suggest the right appointment type. How can I help you today?`,
    timestamp: 'Just now',
    actionButtons: selectedPet
      ? [
        {
          label: `Book Grooming for ${selectedPet.name}`,
          link: `/dashboard/book?petId=${selectedPet.id}&serviceId=grooming`,
        },
        {
          label: `View ${selectedPet.name}'s Passport`,
          link: `/dashboard/pets/${selectedPet.id}`,
        },
      ]
      : undefined,
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  // Suggested prompts
  const suggestedPrompts = [
    `How often should I groom ${selectedPet?.name || 'my pet'}?`,
    `Does ${selectedPet?.name || 'my pet'} need any booster shots soon?`,
    `My pet has been scratching ears and shaking their head.`,
    `What are signs of seasonal allergies in double-coated dogs?`,
  ];

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate intelligent AI triage based on pet context
    setTimeout(() => {
      let aiResponseText = '';
      let actionButtons: Message['actionButtons'] = undefined;

      const lower = messageText.toLowerCase();

      if (lower.includes('groom') || lower.includes('bath') || lower.includes('matting')) {
        aiResponseText = `For ${selectedPet?.name ? `${selectedPet.name} (${selectedPet.breed})` : 'your companion'}, we recommend a full grooming session every 4 to 6 weeks. Regular deshedding hydrobaths and blueberry facial cleanses keep the undercoat breathable and prevent painful pelted matting.`;
        actionButtons = [
          {
            label: `Book Luxury Spa Grooming`,
            link: `/dashboard/book?petId=${selectedPet?.id || ''}&serviceId=grooming`,
            icon: <Calendar className="w-3.5 h-3.5" />,
          },
        ];
      } else if (lower.includes('scratch') || lower.includes('ear') || lower.includes('itch') || lower.includes('allerg')) {
        aiResponseText = `Frequent scratching or head shaking often indicates ear moisture buildup, yeast irritation, or environmental allergies${selectedPet?.allergies?.length ? ` (note: ${selectedPet.name} has recorded allergies to ${selectedPet.allergies.join(', ')})` : ''}. I recommend scheduling an Otoscopic Veterinary Consultation so our clinician can examine the ear canal gently.`;
        actionButtons = [
          {
            label: `Book Veterinary Consultation`,
            link: `/dashboard/book?petId=${selectedPet?.id || ''}&serviceId=veterinary`,
            icon: <Calendar className="w-3.5 h-3.5" />,
          },
        ];
      } else if (lower.includes('vaccin') || lower.includes('shot') || lower.includes('booster')) {
        aiResponseText = `According to ${selectedPet?.name || 'your pet'}’s digital records, core vaccines provide continuous protection. If you are planning boarding or public dog park visits, keeping Bordetella and Rabies boosters current is strongly advised.`;
        actionButtons = [
          {
            label: `Book Vaccine Booster`,
            link: `/dashboard/book?petId=${selectedPet?.id || ''}&serviceId=vaccination`,
            icon: <Calendar className="w-3.5 h-3.5" />,
          },
        ];
      } else {
        aiResponseText = `Thank you for sharing that question regarding ${selectedPet?.name || 'your pet'}. For optimal wellness, combining routine prevention, wholesome nutrition, and stress-free care is key. Would you like to schedule an examination or ask about our specific care services?`;
        actionButtons = [
          {
            label: `Book an Appointment`,
            link: `/dashboard/book?petId=${selectedPet?.id || ''}`,
            icon: <Calendar className="w-3.5 h-3.5" />,
          },
        ];
      }

      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="terracotta" size="sm" withPaw className="mb-2">
            24/7 AI Triage Assistant
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Pet Care & Wellness Assistant
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Personalized guidance calibrated to your pet’s species, breed traits, and medical passport.
          </p>
        </div>

        {/* Pet Context Selector */}
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-2xl p-2 px-3 border border-cream-300 shadow-warm-xs flex items-center gap-2 text-xs">
            <Dog className="w-4 h-4 text-terracotta-500 shrink-0" />
            <span className="font-bold text-chocolate-900 hidden sm:inline">Active Context:</span>
            <select
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="bg-transparent font-bold text-chocolate-900 focus:outline-none cursor-pointer"
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.species} • {p.breed})
                </option>
              ))}
              <option value="">General Pet Question</option>
            </select>
          </div>

          <button
            onClick={handleResetChat}
            className="p-2.5 rounded-2xl bg-white border border-cream-300 text-chocolate-600 hover:text-chocolate-900 hover:bg-cream-100 transition-colors shadow-warm-xs hover:rotate-180 duration-300"
            title="Start New Conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Notice Bar */}
      <div className="p-3.5 px-5 bg-sand-100 rounded-2xl border border-sand-300 flex items-center justify-between gap-3 text-xs text-chocolate-800">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Medical Notice:</strong> The AI Assistant provides general guidance and service triage. For emergencies, please call our 24/7 urgent care hotline at <strong>(800) 555-9911</strong>.
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Ready
        </span>
      </div>

      {/* Chat Window Container */}
      <div className="bg-chocolate-900 text-cream-50 rounded-3xl sm:rounded-5xl p-6 sm:p-8 shadow-warm-xl border border-chocolate-800 flex flex-col h-[580px] sm:h-[620px] card-hover-glow">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-9 h-9 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs mt-1"
                  >
                    <Bot className="w-5 h-5" />
                  </motion.div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-warm-xs ${msg.sender === 'user'
                        ? 'bg-terracotta-600 text-white rounded-tr-none'
                        : 'bg-chocolate-800 text-cream-100 border border-chocolate-700 rounded-tl-none'
                      }`}
                  >
                    {msg.text}
                  </div>

                  {/* AI Actionable Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actionButtons.map((btn, idx) => (
                        <Link key={idx} to={btn.link}>
                          <Button
                            variant="terracotta"
                            size="sm"
                            leftIcon={btn.icon}
                            className="text-xs font-bold shadow-warm-xs hover:scale-105 transition-transform"
                            data-cursor="book"
                            data-cursor-text="Book"
                          >
                            {btn.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-cream-400/60 block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-cream-200 text-chocolate-900 flex items-center justify-center shrink-0 shadow-warm-xs mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-cream-400 pl-12 py-2"
            >
              <PawIllustration size={14} color="#D97746" variant="float" />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[11px] text-cream-300 font-medium ml-1">
                Analyzing {selectedPet?.name || 'pet'} wellness records...
              </span>
            </motion.div>
          )}
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-cream-400 uppercase font-bold shrink-0 flex items-center gap-1">
            <SparkleIllustration size={10} color="#FAF6F0" /> Suggested:
          </span>
          {suggestedPrompts.map((prompt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-chocolate-800 hover:bg-chocolate-700 border border-chocolate-700 text-cream-200 whitespace-nowrap transition-all shadow-warm-xs"
              data-cursor="ask"
              data-cursor-text="Ask ✨"
            >
              💬 {prompt}
            </motion.button>
          ))}
        </div>

        {/* Input Form with Glow */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-3 border-t border-chocolate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={`Ask a question about ${selectedPet?.name || 'your pet'}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-chocolate-800 border border-chocolate-700 text-white placeholder:text-cream-400/60 rounded-2xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white hover:bg-terracotta-600 disabled:opacity-40 disabled:hover:bg-terracotta-500 transition-colors flex items-center justify-center shrink-0 shadow-warm-xs"
            aria-label="Send"
            data-cursor="ask"
            data-cursor-text="Send"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};
