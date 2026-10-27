import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Save, Check, RefreshCw, Eye, EyeOff, Layout, Layers } from 'lucide-react';

export const AdminHomepageEditorPage: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<number | null>(null);

  const fetchSections = async () => {
    try {
      const data = await api.get('/api/admin/homepage/sections');
      if (Array.isArray(data)) setSections(data);
    } catch (e) {
      console.warn('Could not load homepage sections:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleUpdateContent = (sectionId: number, field: string, value: any) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            content: {
              ...s.content,
              [field]: value,
            },
          };
        }
        return s;
      })
    );
  };

  const handleToggleVisible = (sectionId: number) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            is_visible: !s.is_visible,
          };
        }
        return s;
      })
    );
  };

  const handleSaveSection = async (section: any) => {
    setSavingId(section.id);
    try {
      await api.put(`/api/admin/homepage/sections/${section.id}`, {
        is_visible: section.is_visible,
        section_order: section.section_order,
        content: section.content,
      });
      setSavedSuccess(section.id);
      setTimeout(() => setSavedSuccess(null), 3000);
    } catch (e: any) {
      alert(e.message || 'Failed to save section changes');
    } finally {
      setSavingId(null);
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
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9BDAA]/40">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
            Visual Section Builder
          </span>
          <h1 className="font-serif text-3xl font-light text-[#292824]">
            Homepage Content Editor
          </h1>
          <p className="text-xs text-[#77786B] mt-1 font-light">
            Edit live headlines, photography URLs, and B2B export statements across all homepage sections.
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {sections.map((section) => {
          const isSaving = savingId === section.id;
          const isSaved = savedSuccess === section.id;

          return (
            <div key={section.id} className="bg-white border border-[#C9BDAA]/40 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#C9BDAA]/20">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#292824] text-white flex items-center justify-center text-xs font-mono">
                    {section.section_order}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-[#292824] capitalize font-medium">
                      {section.section_type.replace('_', ' ')} Section
                    </h3>
                    <span className="text-[10px] text-[#77786B] font-mono">
                      ID #{section.id} · Type: {section.section_type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleToggleVisible(section.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                      section.is_visible
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-500 border border-stone-200'
                    }`}
                  >
                    {section.is_visible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleSaveSection(section)}
                    className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-1.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 1. Hero Section Fields */}
              {section.section_type === 'hero' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Eyebrow Text</label>
                    <input
                      type="text"
                      value={section.content?.eyebrow || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'eyebrow', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Main Headline</label>
                    <input
                      type="text"
                      value={section.content?.headline || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Accent Headline Text</label>
                    <input
                      type="text"
                      value={section.content?.headline_accent || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline_accent', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Primary CTA Label</label>
                    <input
                      type="text"
                      value={section.content?.cta_primary_label || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'cta_primary_label', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Supporting Copy</label>
                    <textarea
                      rows={2}
                      value={section.content?.supporting_text || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'supporting_text', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Hero Desktop Image URL</label>
                    <input
                      type="text"
                      value={section.content?.image_desktop || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'image_desktop', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>
              )}

              {/* 2. Brand Intro Section Fields */}
              {section.section_type === 'brand_intro' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Tag / Eyebrow</label>
                    <input
                      type="text"
                      value={section.content?.tag || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'tag', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Headline</label>
                    <input
                      type="text"
                      value={section.content?.headline || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Paragraph 1</label>
                    <textarea
                      rows={2}
                      value={section.content?.paragraph_1 || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'paragraph_1', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Paragraph 2</label>
                    <textarea
                      rows={2}
                      value={section.content?.paragraph_2 || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'paragraph_2', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Heritage &amp; Verification Note</label>
                    <input
                      type="text"
                      value={section.content?.heritage_note || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'heritage_note', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 3. Craftsmanship Section Fields */}
              {section.section_type === 'craftsmanship' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Headline</label>
                    <input
                      type="text"
                      value={section.content?.headline || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">CTA Label</label>
                    <input
                      type="text"
                      value={section.content?.cta_label || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'cta_label', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Supporting Text</label>
                    <textarea
                      rows={2}
                      value={section.content?.supporting_text || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'supporting_text', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Workshop Image URL</label>
                    <input
                      type="text"
                      value={section.content?.image_url || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'image_url', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>
              )}

              {/* 4. Export & B2B Enquiries Section Fields */}
              {section.section_type === 'export_enquiries' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Headline</label>
                    <input
                      type="text"
                      value={section.content?.headline || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">CTA Label</label>
                    <input
                      type="text"
                      value={section.content?.cta_label || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'cta_label', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Supporting Copy</label>
                    <textarea
                      rows={2}
                      value={section.content?.supporting_text || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'supporting_text', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 5. Final CTA Section Fields */}
              {section.section_type === 'final_cta' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Headline</label>
                    <input
                      type="text"
                      value={section.content?.headline || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'headline', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Primary CTA Label</label>
                    <input
                      type="text"
                      value={section.content?.cta_primary_label || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'cta_primary_label', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Supporting Text</label>
                    <textarea
                      rows={2}
                      value={section.content?.supporting_text || ''}
                      onChange={(e) => handleUpdateContent(section.id, 'supporting_text', e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#C9BDAA]/60 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
