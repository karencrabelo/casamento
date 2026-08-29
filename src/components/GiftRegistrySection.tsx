import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, ExternalLink, Heart, Sparkles, CreditCard } from 'lucide-react';
import { WeddingConfig } from '../types';
import { DelicateBlossom, ViolaBlossom, FloralDivider } from './FloralDecorations';

interface GiftRegistrySectionProps {
  config: WeddingConfig;
}

export const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(config.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const honeymoonQuotas = [
    { title: 'Brinde com Espumante 🥂', value: 'R$ 75', desc: 'Para brindar nosso amor' },
    { title: 'Jantar Romântico à Luz de Velas 🍝', value: 'R$ 150', desc: 'Na nossa primeira noite de casados' },
    { title: 'Passeio ao Pôr do Sol ⛵', value: 'R$ 250', desc: 'Explorando cenários na lua de mel' },
    { title: 'Massagem Relaxante para o Casal 💆‍♂️💆‍♀️', value: 'R$ 350', desc: 'Para relaxar após o grande dia' },
    { title: 'Diária dos Sonhos no Hotel 🏨', value: 'R$ 500', desc: 'Noite inesquecível em suíte' },
    { title: 'Cota de Amor Livre ✨', value: 'Qualquer valor', desc: 'Sua bênção e carinho' },
  ];

  return (
    <section id="presentes" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#5E693D]/15 relative text-[#4A4238]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/35 text-[#5E693D] text-xs font-montserrat font-medium uppercase tracking-[0.2em]">
            <DelicateBlossom size={16} />
            <span>Presentes & Carinho</span>
            <DelicateBlossom size={16} />
          </div>

          <h2 className="font-great-vibes text-5xl sm:text-6xl lg:text-7xl text-[#5E693D] font-normal py-1">
            Lista de Presentes & PIX
          </h2>

          <p className="font-serif-cormorant text-lg sm:text-xl text-[#6B5E4F] italic font-normal leading-relaxed">
            {config.giftMessage}
          </p>

          <FloralDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pix Key Card (6 cols) */}
          <div className="lg:col-span-6 bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#5E693D]/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5E693D]/15 text-[#5E693D] flex items-center justify-center border border-[#5E693D]/30">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-2xl font-semibold text-[#363D2B]">
                    Chave PIX dos Noivos
                  </h3>
                  <span className="text-xs text-[#7A7164] font-medium font-montserrat">
                    Contribuição direta para a Lua de Mel
                  </span>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#E89CAE]/20 text-[#5E693D] text-xs font-montserrat font-semibold uppercase tracking-wider">
                PIX
              </span>
            </div>

            {/* PIX Key copy box */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#5E693D]/20 space-y-2">
              <div className="flex justify-between items-center text-xs text-[#7A7164] font-medium font-montserrat">
                <span>Tipo: {config.pixKeyType}</span>
                <span>Favorecido: {config.pixReceiverName}</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={config.pixKey}
                  className="flex-1 bg-white border border-[#5E693D]/25 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#363D2B] focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyPix}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium font-montserrat text-xs sm:text-sm transition-all cursor-pointer ${
                    copied
                      ? 'bg-[#5E693D] text-white'
                      : 'bg-[#5E693D] hover:bg-[#4E5832] text-white shadow-xs'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-[#7A7164] pt-1 flex items-center gap-1.5 font-montserrat">
                <CreditCard className="w-3.5 h-3.5 text-[#5E693D]" />
                <span>{config.pixBankName} • {config.pixReceiverName}</span>
              </div>
            </div>

            {/* Quotas list */}
            <div className="space-y-3">
              <h4 className="text-xs font-montserrat font-semibold uppercase tracking-wider text-[#5E693D]">
                Sugestões de Cotas Simbólicas:
              </h4>

              <div className="grid grid-cols-2 gap-2.5">
                {honeymoonQuotas.map((quota, idx) => (
                  <div
                    key={idx}
                    onClick={handleCopyPix}
                    className="p-3 bg-[#FAF7F2] hover:bg-[#E89CAE]/15 rounded-2xl border border-[#5E693D]/20 hover:border-[#5E693D]/40 cursor-pointer transition-colors text-left group"
                  >
                    <span className="block font-medium text-xs text-[#363D2B] group-hover:text-[#5E693D]">
                      {quota.title}
                    </span>
                    <span className="text-xs font-bold text-[#5E693D] block mt-0.5 font-montserrat">
                      {quota.value}
                    </span>
                    <span className="text-[10px] text-[#7A7164] line-clamp-1 font-normal">
                      {quota.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* External Registry Stores (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] border border-[#5E693D]/20 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-[#5E693D]/15 pb-3">
                <div className="p-2.5 bg-[#5E693D]/15 rounded-xl text-[#5E693D]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-cormorant text-2xl font-semibold text-[#363D2B]">
                    Lista de Presentes do Casal
                  </h3>
                  <p className="text-xs text-[#7A7164] font-normal">
                    Prefere presentear com itens para a nossa casa? Acesse nossa lista oficial:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {config.giftRegistryLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#FAF7F2] hover:bg-[#E89CAE]/15 border border-[#5E693D]/20 hover:border-[#5E693D]/40 transition-all group shadow-2xs"
                  >
                    <div className="space-y-1">
                      <span className="font-medium text-sm sm:text-base text-[#363D2B] group-hover:text-[#5E693D] flex items-center gap-1.5 font-montserrat">
                        <Sparkles className="w-4 h-4 text-[#E89CAE] shrink-0" />
                        {link.name}
                      </span>
                      <span className="text-xs text-[#7A7164] block font-normal">
                        {link.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5E693D] text-white text-xs font-semibold font-montserrat group-hover:bg-[#4E5832] transition-colors shrink-0">
                      <span>Ver Lista</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Gratitude note */}
            <div className="p-6 rounded-[2.5rem] bg-[#E89CAE]/15 border border-[#E89CAE]/30 text-[#4A4238] text-center space-y-2">
              <ViolaBlossom size={28} className="mx-auto" />
              <p className="text-sm font-medium text-[#5E693D] font-montserrat">
                De coração, agradecemos todo o carinho e apoio em cada passo dessa jornada!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
