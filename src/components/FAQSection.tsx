import React, { useState, useMemo } from 'react';
import { Circle as HelpCircle, ChevronDown, Search, MessageCircle, Sparkles } from 'lucide-react';
import { WeddingConfig, FAQItem } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface FAQSectionProps {
  config: WeddingConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ config }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '1': true, '3': true });

  const categories = [
    { id: 'todas', label: 'Todas as Dúvidas' },
    { id: 'presenca', label: 'Presença (RSVP)' },
    { id: 'traje', label: 'Traje & Vestimenta' },
    { id: 'local', label: 'Local & Estacionamento' },
    { id: 'presentes', label: 'Presentes & Pix' },
    { id: 'geral', label: 'Geral & Crianças' }
  ];

  const filteredFAQs = useMemo(() => {
    return config.faqs.filter((faq: FAQItem) => {
      const matchesCategory = selectedCategory === 'todas' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [config.faqs, selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const whatsappAssessoriaUrl = `https://wa.me/${config.rsvpWhatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Olá! Estou com uma dúvida sobre o casamento de ${config.brideName} & ${config.groomName}: `
  )}`;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Tire Suas Dúvidas</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Perguntas Frequentes
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Reunimos as principais informações e respostas para você se preparar com tranquilidade.
          </p>

          <FloralDivider />
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-[#5E693D]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por uma dúvida (ex: traje, crianças, clima, estacionamento)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/90 border border-[#5E693D]/25 focus:outline-none focus:ring-2 focus:ring-[#5E693D] text-sm text-[#363D2B] shadow-xs font-montserrat"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center font-montserrat">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#5E693D] text-white shadow-xs'
                  : 'bg-white/80 text-[#6B5E4F] border border-[#5E693D]/25 hover:border-[#5E693D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq: FAQItem) => {
              const isOpen = !!openItems[faq.id];

              return (
                <div
                  key={faq.id}
                  className="bg-white/85 backdrop-blur-md rounded-[1.75rem] border border-[#5E693D]/20 overflow-hidden transition-all duration-200 shadow-xs hover:border-[#5E693D]/40"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-medium text-[#363D2B] gap-4 cursor-pointer"
                  >
                    <span className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-[#363D2B]">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full bg-[#FAF7F2] border border-[#5E693D]/20 text-[#6B5E4F] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#E89CAE]/20 text-[#5E693D]' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-[#6B5E4F] text-sm sm:text-base font-normal leading-relaxed border-t border-[#5E693D]/15 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white/80 rounded-[1.75rem] border border-[#5E693D]/20 p-6 text-[#7A7164] font-montserrat">
              <p className="text-sm">Nenhuma pergunta encontrada com o termo pesquisado.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('todas');
                }}
                className="mt-2 text-xs font-semibold text-[#5E693D] hover:underline cursor-pointer"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-12 p-6 rounded-[2.5rem] bg-[#E89CAE]/15 border border-[#E89CAE]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 font-montserrat">
          <div className="text-left space-y-1">
            <h4 className="font-semibold text-[#363D2B] text-sm sm:text-base flex items-center gap-1.5">
              <ViolaBlossom size={20} />
              <span>Ainda ficou alguma dúvida?</span>
            </h4>
            <p className="text-xs text-[#6B5E4F] font-normal">
              Nossa equipe de assessoria e os noivos estão à disposição para te ajudar.
            </p>
          </div>

          <a
            href={whatsappAssessoriaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5E693D] hover:bg-[#4E5832] text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
