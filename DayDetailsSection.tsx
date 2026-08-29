import React from 'react';
import { Sparkles, Sun, ShieldAlert, Check, HelpCircle } from 'lucide-react';
import { WeddingConfig } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface DayDetailsSectionProps {
  config: WeddingConfig;
}

export const DayDetailsSection: React.FC<DayDetailsSectionProps> = ({ config }) => {
  return (
    <section id="dia" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Guia para os Convidados</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Detalhes do Nosso Grande Dia
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal">
            Preparamos todas as orientações para que você aproveite cada minuto com muito estilo, conforto e alegria.
          </p>

          <FloralDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Dress Code Card (7 cols) */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-4">
              <div>
                <span className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#5E693D]">
                  Dress Code Oficial
                </span>
                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#363D2B] mt-1">
                  {config.dressCodeTitle}
                </h3>
              </div>
              <div className="p-3 bg-[#E89CAE]/15 rounded-full text-[#5E693D]">
                <DelicateBlossom size={28} />
              </div>
            </div>

            <p className="text-[#6B5E4F] text-base font-normal leading-relaxed">
              {config.dressCodeDescription}
            </p>

            {/* Advice Bullet Points */}
            <div className="space-y-3 pt-2">
              {config.dressCodeAdvice.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#5E693D]/15 shadow-xs">
                  <div className="p-1 bg-[#5E693D]/15 rounded-full text-[#5E693D] mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base text-[#4A4238] font-normal leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Crucial Note about White */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#E89CAE]/10 border border-[#E89CAE]/30 text-[#4A4238] text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-[#D98297] shrink-0" />
              <p>
                <strong className="text-[#5E693D]">Lembrete carinhoso:</strong> Tons de branco, off-white e marfim são de uso exclusivo da noiva. Agradecemos a compreensão com muito carinho! ❤️
              </p>
            </div>

          </div>

          {/* Color Palette & Weather Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Color Palette Card */}
            <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-[#5E693D]">
                  Paleta de Inspiração
                </span>
                <h4 className="font-serif-cormorant text-2xl font-semibold text-[#363D2B] mt-1">
                  Cores em Harmonia Floral
                </h4>
                <p className="text-xs text-[#7A7164] font-normal mt-1">
                  Não é obrigatório, mas aqui estão as tonalidades presentes na atmosfera do nosso casamento:
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-2">
                {config.colorPalette.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 group">
                    <div
                      className="w-12 h-12 rounded-full shadow-inner border-2 border-white group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} (${color.hex})`}
                    />
                    <span className="text-[11px] text-[#61574A] font-medium text-center leading-tight">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Climate & Atmosphere Card */}
            <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#5E693D]/15 rounded-full text-[#5E693D]">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-cormorant text-xl font-semibold text-[#363D2B]">
                    Clima & Recepção
                  </h4>
                  <span className="text-xs text-[#5E693D] font-semibold tracking-wider font-montserrat">
                    Almoço Elegante & Espaço Climatizado
                  </span>
                </div>
              </div>

              <p className="text-[#6B5E4F] text-sm font-normal leading-relaxed">
                {config.weatherAdvice}
              </p>

              <div className="pt-2 border-t border-[#5E693D]/15 text-xs text-[#7A7164] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#5E693D] shrink-0" />
                <span>O restaurante conta com ambiente climatizado e acessibilidade completa.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
