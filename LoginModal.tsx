import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { DelicateBlossom } from './FloralDecorations';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const ADMIN_USERNAME = 'noivinhos';
const ADMIN_PASSWORD = 'casamentokarenejho';

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('');
      setUsername('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#2C3224]/70 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
      <div className="bg-[#FAF7F2] rounded-[2.5rem] border border-[#5E693D]/25 shadow-2xl max-w-sm w-full overflow-hidden text-[#4A4238] animate-fadeIn">

        {/* Header */}
        <div className="p-6 border-b border-[#5E693D]/15 flex items-center justify-between bg-white/85">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E89CAE]/20 text-[#5E693D] flex items-center justify-center border border-[#E89CAE]/40">
              <Lock className="w-4 h-4 text-[#5E693D]" />
            </div>
            <div>
              <h3 className="font-great-vibes text-3xl font-normal text-[#5E693D] leading-none">
                Área dos Noivos
              </h3>
              <p className="text-xs text-[#7A7164] font-normal mt-1">
                Acesso restrito para edição do site
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-[#5E693D]/10 text-[#6B5E4F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex justify-center mb-2">
            <DelicateBlossom size={28} className="opacity-60" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E693D] mb-1.5">
              Usuário
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#5E693D]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="username"
                placeholder="Digite o usuário"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#5E693D]/20 text-sm focus:ring-2 focus:ring-[#5E693D] focus:outline-none text-[#363D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E693D] mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5E693D]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Digite a senha"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-[#5E693D]/20 text-sm focus:ring-2 focus:ring-[#5E693D] focus:outline-none text-[#363D2B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E693D]/60 hover:text-[#5E693D] cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#5E693D] hover:bg-[#4E5833] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
