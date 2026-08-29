import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Home, Calendar, X } from 'lucide-react';
import { WeddingConfig, StoryMilestone } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface StorySectionProps {
  config: WeddingConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ config }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const getMilestoneIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#5E693D]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#5E693D]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#5E693D]" />;
      default:
        return <Heart className="w-5 h-5 text-[#5E693D] fill-[#E89CAE]/30" />;
    }
  };

  return (
    <section id="historia" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#5E693D]/15 text-[#4A4238]">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E89CAE]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#5E693D]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Como Tudo Começou</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Nossa História de Amor
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal leading-relaxed">
            "{config.loveQuote}"
            {config.loveQuoteAuthor && (
              <span className="block font-montserrat text-xs uppercase tracking-[0.2em] text-[#E89CAE] font-semibold mt-1.5 not-italic">
                — {config.loveQuoteAuthor}
              </span>
            )}
          </p>

          <FloralDivider />
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {/* Central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#5E693D]/15 via-[#5E693D]/35 to-[#5E693D]/15" />

          <div className="space-y-12 sm:space-y-16">
            {config.story.map((milestone: StoryMilestone, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md border border-[#5E693D]/20 transition-all duration-300">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5E693D]/10 text-[#5E693D] text-xs font-montserrat font-semibold tracking-wider mb-3 border border-[#5E693D]/20 ${isEven ? 'md:ml-auto' : ''}`}>
                        <Calendar className="w-3.5 h-3.5 text-[#5E693D]" />
                        <span>{milestone.year}</span>
                      </div>

                      <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#363D2B] mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-[#6B5E4F] text-sm sm:text-base leading-relaxed font-normal">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#5E693D] shadow-sm items-center justify-center z-10">
                    {getMilestoneIcon(milestone.iconName)}
                  </div>

                  {/* Image Box */}
                  <div className="w-full md:w-1/2">
                    <div
                      onClick={() => setSelectedPhoto(milestone.image)}
                      className="group relative h-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-sm cursor-pointer border-4 border-white bg-[#EFECE4]"
                    >
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#363D2B]/20 group-hover:bg-[#363D2B]/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/95 text-[#363D2B] text-xs font-montserrat font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm tracking-wide">
                          🔍 Ampliar Foto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing love note */}
        <div className="mt-20 text-center bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-[#5E693D]/25 shadow-sm max-w-2xl mx-auto">
          <ViolaBlossom size={36} className="mx-auto mb-2" />
          <h4 className="font-great-vibes text-3xl sm:text-4xl text-[#5E693D] mb-2 font-normal">
            E o próximo capítulo escrevemos com você!
          </h4>
          <p className="text-[#6B5E4F] text-sm sm:text-base font-normal">
            Mal podemos esperar para celebrar cada segundo dessa história ao lado das pessoas que mais amamos.
          </p>
        </div>

      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-[#2D2821]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-[#FAF7F2] rounded-[2rem] overflow-hidden border border-[#5E693D]/30 shadow-2xl p-2"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10 cursor-pointer"
              aria-label="Fechar foto ampliada"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto}
              alt="Momento ampliado"
              className="max-h-[85vh] w-auto object-contain mx-auto rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
