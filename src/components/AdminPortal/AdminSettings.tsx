import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { StoreSettings } from '../../types/bakery';
import { 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  Phone, 
  CreditCard, 
  MapPin, 
  Lock, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { 
    storeSettings, 
    updateStoreSettings, 
    resetToDefaults, 
    exportDataJson, 
    importDataJson 
  } = useBakery();

  const [formData, setFormData] = useState<StoreSettings>({ ...storeSettings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const handleChange = (field: keyof StoreSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baked_by_shraddha_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError('');
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError('Invalid JSON backup file. Please verify format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-5 rounded-2xl border border-[#EEDDCE] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h4 className="font-display font-bold text-base text-[#2C1810]">
              Bakery Shop & Contact Configuration
            </h4>
            <p className="text-stone-500 text-xs">
              All WhatsApp orders and UPI payments will be linked to these details.
            </p>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saveSuccess ? 'Saved Successfully!' : 'Save Settings'}</span>
          </button>
        </div>

        {/* Official Bakery Brand Logo Preview */}
        <div className="p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#F0D8C0] flex items-center gap-4">
          <img 
            src="/logo.png" 
            alt="Bakery Brand Logo" 
            className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-[#E9C3A0] shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-xs text-[#3A141D]">Official Bakery Brand Logo & Mobile App Icon</h5>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Active</span>
            </div>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Yeh logo website ke header, footer, share link card aur customer ke mobile me download hone par app icon ki tarah dikhai dega.
            </p>
          </div>
        </div>

        {/* Brand & Owner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Bakery Shop Name</label>
            <input
              type="text"
              required
              value={formData.shopName}
              onChange={(e) => handleChange('shopName', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-bold text-stone-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Baker Owner Name</label>
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block font-semibold text-stone-700 mb-1">Shop Tagline / Bio</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
          />
        </div>

        {/* WhatsApp & Calling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Shraddha's WhatsApp Number (with Country Code) *</span>
            </label>
            <input
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              placeholder="e.g. 919974787033"
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-mono font-bold"
            />
            <p className="text-[10px] text-stone-500 mt-0.5">
              Customers will send their orders directly to this WhatsApp number.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-[#7B243B]" />
              <span>UPI ID for Payment (GPay / PhonePe / Paytm)</span>
            </label>
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) => handleChange('upiId', e.target.value)}
              placeholder="e.g. bakedbyshraddha@okaxis"
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-mono font-bold"
            />
            <p className="text-[10px] text-stone-500 mt-0.5">
              Provided to customers during checkout for easy direct payment.
            </p>
          </div>
        </div>

        {/* Pickup Address & Delivery Charges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block font-semibold text-stone-700 mb-1">Standard Delivery Fee (₹)</label>
            <input
              type="number"
              min={0}
              value={formData.standardDeliveryFee}
              onChange={(e) => handleChange('standardDeliveryFee', Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block font-semibold text-stone-700 mb-1">Free Delivery Above (₹)</label>
            <input
              type="number"
              min={0}
              value={formData.freeDeliveryAbove}
              onChange={(e) => handleChange('freeDeliveryAbove', Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Admin Secret Passcode</span>
            </label>
            <input
              type="password"
              required
              value={formData.adminPin}
              onChange={(e) => handleChange('adminPin', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-mono font-bold tracking-widest"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#7B243B]" />
              <span>Kitchen Pickup Location Address</span>
            </label>
            <input
              type="text"
              value={formData.pickupAddress}
              onChange={(e) => handleChange('pickupAddress', e.target.value)}
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Maps Location Link (for Direct Navigation)</span>
            </label>
            <input
              type="url"
              value={formData.googleMapsUrl || ''}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              placeholder="e.g. https://maps.app.goo.gl/... or Google Maps Link"
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-mono text-xs"
            />
            <p className="text-[10px] text-stone-500 mt-0.5">
              Customers can click this link to directly navigate to your shop on Google Maps.
            </p>
          </div>
        </div>

        {/* Shop Open / Closed Status Toggle */}
        <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E9D9CB] flex items-center justify-between">
          <div>
            <div className="font-bold text-stone-800">Shop Open Status</div>
            <div className="text-[11px] text-stone-500">
              {formData.isShopOpen ? 'Accepting customer orders online' : 'Currently closed / taking a break'}
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isShopOpen}
              onChange={(e) => handleChange('isShopOpen', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </form>

      {/* Backup, Restore & Reset Section */}
      <div className="bg-white p-5 rounded-2xl border border-[#EEDDCE] space-y-4">
        <h4 className="font-display font-bold text-base text-[#2C1810]">
          Data Backup & Cloud Portability
        </h4>
        <p className="text-stone-500 text-xs">
          Export your entire bakery catalog, categories, pricing, and orders as a JSON backup file. You can restore it on any phone or computer.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup (JSON)</span>
          </button>

          <label className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Restore from File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to reset all bakery items and banners to the default delicious menu?')) {
                resetToDefaults();
                alert('Menu reset to fresh defaults!');
              }
            }}
            className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Sample Menu</span>
          </button>
        </div>

        {importSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
            ✅ Backup file successfully restored!
          </div>
        )}

        {importError && (
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-200">
            ⚠️ {importError}
          </div>
        )}
      </div>
    </div>
  );
};
