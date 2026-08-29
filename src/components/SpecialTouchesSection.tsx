import React from 'react';
import { Wine, Smile, Salad, Radio, Camera, Footprints, Sparkles, Heart, Gift } from 'lucide-react';
import { WeddingConfig, SpecialTouch } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface SpecialTouchesSectionProps {
  config: WeddingConfig;
}

export const SpecialTouchesSection: React.FC<SpecialTouchesSectionProps> = ({ config }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-6 h-6 text-[#5E693D]" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-[#5E693D]" />;
      case 'Salad':
        return <Salad className="w-6 h-6 text-[#5E693D]" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-[#5E693D]" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-[#5E693D]" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6 text-[#5E693D]" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-[#5E693D]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#5E693D]" />;
    }
  };

  return (
    <section id="detalhes" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Feito com Todo Carinho</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Detalhes que Pensamos para Vocês
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Cada cantinho, sabor e momento do nosso casamento foi pensado nos mínimos detalhes para que todos se sintam acolhidos e celebrem ao máximo.
          </p>

          <FloralDivider />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.specialTouches.map((touch: SpecialTouch) => (
            <div
              key={touch.id}
              className="bg-white/85 backdrop-blur-md p-7 rounded-[2.5rem] border border-[#5E693D]/20 hover:border-[#5E693D]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FAF7F2] rounded-2xl shadow-xs border border-[#5E693D]/20 group-hover:scale-105 transition-all">
                    {getIcon(touch.iconName)}
                  </div>
                  <span className="text-[11px] font-montserrat font-semibold uppercase tracking-wider text-[#5E693D] bg-[#5E693D]/10 px-3 py-1 rounded-full border border-[#5E693D]/20">
                    {touch.subtitle}
                  </span>
                </div>

                <h3 className="font-serif-cormorant text-2xl font-semibold text-[#363D2B] mb-2">
                  {touch.title}
                </h3>

                <p className="text-[#6B5E4F] text-sm font-normal leading-relaxed mb-4">
                  {touch.description}
                </p>
              </div>

              {touch.highlight && (
                <div className="pt-3 border-t border-[#5E693D]/15 flex items-center gap-2 text-xs text-[#5E693D] font-medium font-montserrat">
                  <Sparkles className="w-3.5 h-3.5 text-[#E89CAE] shrink-0" />
                  <span>{touch.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Media & Photo Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-[2.5rem] bg-[#363D2B] text-white shadow-xl text-center max-w-3xl mx-auto space-y-4 border border-[#5E693D]/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E89CAE] text-xs font-montserrat font-semibold uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Compartilhe Seus Momentos</span>
          </div>

          <h3 className="font-great-vibes text-3xl sm:text-4xl text-[#FAF7F2] font-normal">
            Use nossa Hashtag Oficial no Instagram e TikTok
          </h3>

          <div className="inline-block bg-[#5E693D]/30 border border-[#FAF7F2]/30 text-[#FAF7F2] font-mono text-lg sm:text-xl font-bold px-6 py-2.5 rounded-full shadow-inner">
            {config.hashtag}
          </div>

          <p className="text-[#D3CFC6] text-xs sm:text-sm font-normal max-w-lg mx-auto font-montserrat">
            Marque os noivos nos stories e posts para guardarmos todas as fotos tiradas pelos nossos convidados!
          </p>
        </div>

      </div>
    </section>
  );
};
