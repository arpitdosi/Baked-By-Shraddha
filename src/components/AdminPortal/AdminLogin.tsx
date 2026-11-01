import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const { loginAdmin, storeSettings } = useBakery();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pin)) {
      setError('');
    } else {
      setError('Incorrect Admin PIN. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#F2DFD1] p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#7B243B] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#7B243B]/20">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-2xl text-[#2C1810]">
            Baker Shraddha's Portal
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Private management portal for menu, dynamic pricing, offers, and incoming orders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Enter Secret Admin PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="Enter Secret Passcode"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B243B]/30 focus:border-[#7B243B] tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 rounded-xl p-2.5">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Unlock Admin Portal
          </button>
        </form>
      </div>
    </div>
  );
};
