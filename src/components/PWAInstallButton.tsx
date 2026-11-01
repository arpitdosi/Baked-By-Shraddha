import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Check, X, Share2, PlusSquare } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already installed, hide the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 4000);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        title="Install Mobile App / मोबाइल में ऐप इनस्टॉल करें"
      >
        {installSuccess ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Installed!</span>
          </>
        ) : (
          <>
            <Smartphone className="w-3.5 h-3.5 text-white animate-bounce" />
            <span className="hidden sm:inline">📱 Install App</span>
            <span className="sm:hidden">📱 App</span>
          </>
        )}
      </button>

      {/* Installation Instruction Modal for Android / iPhone */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="relative bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-[#F2DFD1] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#7B243B]/10 text-[#7B243B] flex items-center justify-center mb-3">
              <Download className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h3 className="font-display font-bold text-xl text-[#2C1810]">
              Install Mobile App (APK / PWA)
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              अपने मोबाइल पर "Baked by Sharaddha" की ऐप इंस्टॉल करें ताकि 1-क्लिक में दुकान खुले:
            </p>

            <div className="mt-4 space-y-3">
              {isIOS ? (
                <div className="p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#F0D8C0] space-y-2 text-xs text-stone-700">
                  <div className="font-bold text-[#7B243B] flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    <span>iPhone / iPad में कैसे इंस्टॉल करें:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-600 pl-1">
                    <li>Safari ब्राउज़र के नीचे <strong>Share</strong> बटन दबाएं।</li>
                    <li>नीचे स्क्रॉल करके <strong>'Add to Home Screen'</strong> पर क्लिक करें।</li>
                    <li>ऊपर <strong>'Add'</strong> दबाएं — ऐप तुरंत स्क्रीन पर आ जाएगी!</li>
                  </ol>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#F0D8C0] space-y-2 text-xs text-stone-700">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Android Phone में कैसे इंस्टॉल करें:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-stone-600 pl-1">
                    <li>Chrome ब्राउज़र में ऊपर दाईं ओर <strong>तीन डॉट्स (⋮)</strong> दबाएं।</li>
                    <li>सूची में <strong>'Install App'</strong> या <strong>'Add to Home Screen'</strong> चुनें।</li>
                    <li>'Install' पर क्लिक करें — यह बिना किसी झंझट के आपके फ़ोन में असली ऐप (APK) की तरह इंस्टॉल हो जाएगी!</li>
                  </ol>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setShowGuide(false)}
                  className="w-full py-2.5 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  समझ गया (Got it!)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
