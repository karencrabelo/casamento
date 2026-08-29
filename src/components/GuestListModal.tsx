import React, { useState } from 'react';
import { X, Search, Download, Copy, Check, Users, UserX, Utensils, Music, Trash2, CalendarCheck } from 'lucide-react';
import { RSVPResponse } from '../types';
import { DelicateBlossom, ViolaBlossom } from './FloralDecorations';

interface GuestListModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RSVPResponse[];
  onDeleteRSVP: (id: string) => void;
  onClearAll: () => void;
}

export const GuestListModal: React.FC<GuestListModalProps> = ({
  isOpen,
  onClose,
  rsvps,
  onDeleteRSVP,
  onClearAll
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'declined'>('all');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalConfirmedGuests = rsvps
    .filter((r) => r.isAttending)
    .reduce((acc, r) => acc + (r.adultsCount || 0) + (r.childrenCount || 0), 0);

  const totalAdults = rsvps
    .filter((r) => r.isAttending)
    .reduce((acc, r) => acc + (r.adultsCount || 0), 0);

  const totalChildren = rsvps
    .filter((r) => r.isAttending)
    .reduce((acc, r) => acc + (r.childrenCount || 0), 0);

  const totalDeclined = rsvps.filter((r) => !r.isAttending).length;

  const filteredRSVPs = rsvps.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(search.toLowerCase()) ||
      (r.phone && r.phone.includes(search)) ||
      (r.companionNames && r.companionNames.some((c) => c.toLowerCase().includes(search.toLowerCase())));

    if (filterStatus === 'confirmed') return matchesSearch && r.isAttending;
    if (filterStatus === 'declined') return matchesSearch && !r.isAttending;
    return matchesSearch;
  });

  const handleExportCSV = () => {
    if (rsvps.length === 0) return;

    const headers = ['Nome', 'Status', 'Telefone', 'Email', 'Adultos', 'Criancas', 'Acompanhantes', 'Restricoes', 'Musica', 'Recado', 'Data'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.isAttending ? 'Confirmado' : 'Recusado',
      `"${r.phone}"`,
      `"${r.email || ''}"`,
      r.adultsCount || 0,
      r.childrenCount || 0,
      `"${(r.companionNames || []).join(', ').replace(/"/g, '""')}"`,
      `"${(r.dietaryRestrictions || '').replace(/"/g, '""')}"`,
      `"${(r.favoriteSong || '').replace(/"/g, '""')}"`,
      `"${(r.messageToCouple || '').replace(/"/g, '""')}"`,
      `"${new Date(r.submittedAt).toLocaleString('pt-BR')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lista-de-convidados-casamento-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const confirmed = rsvps.filter((r) => r.isAttending);
    let summary = `📋 *LISTA DE PRESENÇA CONFIRMADA - JHONATHAN & KAREN*\n`;
    summary += `Total de Pessoas Confirmadas: ${totalConfirmedGuests} (${totalAdults} adultos, ${totalChildren} crianças)\n\n`;

    confirmed.forEach((r, idx) => {
      summary += `${idx + 1}. *${r.guestName}* (${r.phone}) - ${r.adultsCount + r.childrenCount} pess.\n`;
      if (r.companionNames && r.companionNames.length > 0) {
        summary += `   Acomp: ${r.companionNames.join(', ')}\n`;
      }
      if (r.dietaryRestrictions) {
        summary += `   Restrição: ${r.dietaryRestrictions}\n`;
      }
    });

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C3224]/70 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-[#FAF7F2] rounded-[2.5rem] border border-[#5E693D]/25 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#4A4238] animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-[#5E693D]/15 flex items-center justify-between bg-white/85">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E89CAE]/20 text-[#5E693D] flex items-center justify-center border border-[#E89CAE]/40">
              <CalendarCheck className="w-5 h-5 text-[#5E693D]" />
            </div>
            <div>
              <h3 className="font-great-vibes text-3xl font-normal text-[#5E693D]">
                Lista de Confirmações (RSVP)
              </h3>
              <p className="text-xs text-[#7A7164] font-normal">
                Painel dos noivos para conferência de convidados e restrições
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#5E693D]/10 text-[#6B5E4F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 bg-[#FAF7F2] border-b border-[#5E693D]/15">
          <div className="bg-white p-3.5 rounded-2xl border border-[#5E693D]/20 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#5E693D] font-medium">
              <Users className="w-3.5 h-3.5 text-[#5E693D]" />
              <span>Total Confirmados</span>
            </div>
            <span className="block font-bold text-2xl text-[#5E693D] mt-1">
              {totalConfirmedGuests}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#5E693D]/20 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#7A7164] font-medium">
              <Users className="w-3.5 h-3.5 text-[#7A7164]" />
              <span>Adultos</span>
            </div>
            <span className="block font-bold text-2xl text-[#363D2B] mt-1">
              {totalAdults}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#5E693D]/20 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#D98297] font-medium">
              <Users className="w-3.5 h-3.5 text-[#D98297]" />
              <span>Crianças</span>
            </div>
            <span className="block font-bold text-2xl text-[#D98297] mt-1">
              {totalChildren}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#5E693D]/20 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#7A7164] font-medium">
              <UserX className="w-3.5 h-3.5 text-stone-400" />
              <span>Não Comparecerão</span>
            </div>
            <span className="block font-bold text-2xl text-[#7A7164] mt-1">
              {totalDeclined}
            </span>
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="p-4 border-b border-[#5E693D]/15 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#5E693D]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, telefone ou acompanhante..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#5E693D]/20 text-xs focus:ring-2 focus:ring-[#5E693D] focus:outline-none text-[#363D2B]"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl w-full sm:w-auto border border-[#5E693D]/15">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === 'all' ? 'bg-white shadow-xs text-[#363D2B] font-bold' : 'text-[#6B5E4F]'
              }`}
            >
              Todos ({rsvps.length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === 'confirmed' ? 'bg-[#5E693D]/15 text-[#5E693D] font-bold' : 'text-[#6B5E4F]'
              }`}
            >
              Confirmados
            </button>
            <button
              onClick={() => setFilterStatus('declined')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === 'declined' ? 'bg-stone-200 text-stone-800 font-bold' : 'text-[#6B5E4F]'
              }`}
            >
              Recusados
            </button>
          </div>

          {/* Export & Copy buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopySummary}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#5E693D] border border-[#5E693D]/25 text-xs font-medium transition-colors cursor-pointer"
              title="Copiar lista formatada para o WhatsApp"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#5E693D]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5E693D] hover:bg-[#4E5832] text-white text-xs font-medium transition-colors cursor-pointer"
              title="Baixar lista em formato Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Guest List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#5E693D]/10 space-y-4">
          {filteredRSVPs.length > 0 ? (
            filteredRSVPs.map((rsvp) => (
              <div key={rsvp.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#363D2B] text-base">
                      {rsvp.guestName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        rsvp.isAttending
                          ? 'bg-[#5E693D]/15 text-[#5E693D]'
                          : 'bg-stone-200 text-[#7A7164]'
                      }`}
                    >
                      {rsvp.isAttending ? 'Confirmado' : 'Não Comparecerá'}
                    </span>
                  </div>

                  <div className="text-xs text-[#7A7164] flex flex-wrap gap-x-4 gap-y-1">
                    <span>📱 {rsvp.phone}</span>
                    {rsvp.email && <span>✉️ {rsvp.email}</span>}
                    <span>🗓️ {new Date(rsvp.submittedAt).toLocaleDateString('pt-BR')}</span>
                  </div>

                  {rsvp.isAttending && (
                    <div className="text-xs text-[#4A4238] pt-1 space-y-1">
                      <p>
                        <strong>Pessoas:</strong> {rsvp.adultsCount} adultos {rsvp.childrenCount > 0 ? `+ ${rsvp.childrenCount} crianças` : ''}
                        {rsvp.companionNames && rsvp.companionNames.length > 0 && (
                          <span className="text-[#7A7164]"> ({rsvp.companionNames.join(', ')})</span>
                        )}
                      </p>

                      {rsvp.dietaryRestrictions && (
                        <p className="flex items-center gap-1 text-[#5E693D] font-medium">
                          <Utensils className="w-3 h-3 text-[#5E693D]" />
                          <span>Restrições: {rsvp.dietaryRestrictions}</span>
                        </p>
                      )}

                      {rsvp.favoriteSong && (
                        <p className="flex items-center gap-1 text-[#5E693D] font-medium">
                          <Music className="w-3 h-3 text-[#E89CAE]" />
                          <span>Música pedida: {rsvp.favoriteSong}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {rsvp.messageToCouple && (
                    <p className="text-xs italic text-[#6B5E4F] bg-[#E89CAE]/10 p-2.5 rounded-xl border border-[#E89CAE]/25 mt-1">
                      "{rsvp.messageToCouple}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onDeleteRSVP(rsvp.id)}
                  className="p-2 text-[#E89CAE] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Excluir confirmação"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-[#7A7164]">
              <DelicateBlossom size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Nenhuma confirmação de presença encontrada.</p>
              <p className="text-xs text-[#7A7164]">
                Os convidados confirmados pelo formulário aparecerão aqui automaticamente.
              </p>
            </div>
          )}
        </div>

        {/* Footer info & Clear option */}
        <div className="p-4 border-t border-[#5E693D]/15 bg-white/80 flex items-center justify-between text-xs text-[#7A7164]">
          <span>Total de registros: {rsvps.length}</span>
          {rsvps.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar todos os registros de presença salvos?')) {
                  onClearAll();
                }
              }}
              className="text-[#E89CAE] hover:text-rose-700 hover:underline font-medium cursor-pointer"
            >
              Limpar todos os registros
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
