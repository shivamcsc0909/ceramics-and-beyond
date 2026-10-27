import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Save, Check, RefreshCw, Settings, ShieldCheck } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchSettings = async () => {
    try {
      const data = await api.get('/api/admin/settings');
      setSettings(data);
    } catch (e) {
      console.warn('Could not load settings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/admin/settings', { settings });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="w-8 h-8 border-2 border-[#292824] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-[#FAF9F6] p-6 border border-[#C9BDAA]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
            Global Atelier Configuration
          </span>
          <h2 className="font-serif text-2xl font-light text-[#292824]">
            Brand, Contact &amp; SEO Settings
          </h2>
          <p className="text-xs text-[#77786B] mt-1">
            Configures footer contact details, legal placeholders, and search engine metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-5 py-2.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand Information */}
        <div className="bg-white border border-[#C9BDAA]/40 shadow-sm p-6 sm:p-8 space-y-5">
          <h3 className="font-serif text-lg text-[#292824] font-medium pb-2 border-b border-[#C9BDAA]/20">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Atelier Brand Name
              </label>
              <input
                type="text"
                value={settings.site_name || 'Ceramics & Beyond'}
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.site_tagline || 'Thoughtfully Made. Entirely Yours.'}
                onChange={(e) => handleChange('site_tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-[#C9BDAA]/40 shadow-sm p-6 sm:p-8 space-y-5">
          <h3 className="font-serif text-lg text-[#292824] font-medium pb-2 border-b border-[#C9BDAA]/20">
            Contact &amp; Manufacturer Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contact_email || 'hello@example.com'}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Telephone
              </label>
              <input
                type="text"
                value={settings.contact_phone || '+91 98765 43210'}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Manufacturer Base (New Delhi)
              </label>
              <input
                type="text"
                value={settings.contact_address || 'New Delhi, Delhi, India'}
                onChange={(e) => handleChange('contact_address', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={settings.atelier_hours || 'Monday – Saturday: 10:00 – 19:00 IST'}
                onChange={(e) => handleChange('atelier_hours', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>
          </div>
        </div>

        {/* SEO Default Metadata */}
        <div className="bg-white border border-[#C9BDAA]/40 shadow-sm p-6 sm:p-8 space-y-5">
          <h3 className="font-serif text-lg text-[#292824] font-medium pb-2 border-b border-[#C9BDAA]/20">
            Search Engine Optimization (SEO)
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.meta_title_default || 'Ceramics & Beyond | Thoughtfully Made Furniture · Factory & Experience Centre'}
                onChange={(e) => handleChange('meta_title_default', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={2}
                value={settings.meta_description_default || 'Thoughtfully made furniture, entirely yours. Modular kitchens, bespoke wardrobes, statement vanities, and custom furniture crafted with in-house manufacturing in New Delhi.'}
                onChange={(e) => handleChange('meta_description_default', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
