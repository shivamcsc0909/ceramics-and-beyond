import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { api } from '../api/client';
import { Check, Building2, ShieldCheck, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

const ENQUIRY_TYPES = [
  'Modular Kitchen Consultation',
  'Wardrobe & Walk-In Closet Planning',
  'Bespoke Furniture Design',
  'Full Home Interior Cabinetry',
  'Commercial / Architect Collaboration',
  'Factory & Experience Centre Visit',
];

const CATEGORIES = [
  'Modular Kitchens',
  'Modular Wardrobes & Walk-In Closets',
  'Functional TV Units & Paneling',
  'Designer Bathroom Vanities',
  'Mandirs & Prayer Shrines',
  'Bar Units & Dining Tables',
  'Bespoke Beds & Consoles',
  'Specialty PU Paint & Custom Finishes',
];

export const ExportEnquiriesPage: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    enquiryType: 'Modular Kitchen Consultation',
    productCategory: 'Modular Kitchens',
    estimatedQuantity: '',
    message: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | number>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      alert('Please check the consent box to proceed.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/api/public/enquiry', {
        fullName: form.fullName,
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        enquiryType: form.enquiryType,
        productCategory: form.productCategory,
        estimatedQuantity: form.estimatedQuantity,
        message: form.message,
      });

      setSuccess(true);
      if (res && res.enquiry_id) {
        setReferenceId(res.enquiry_id);
      }
    } catch (err: any) {
      alert(err.message || 'Error submitting enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Header */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Bespoke Consultation', href: '/export-enquiries' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
            Bespoke Furniture &amp; Modular Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide max-w-4xl leading-tight">
            Design Your Space With Us.
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            From first sketch to final installation, our founder and design engineering team are personally involved in every detail. Tell us about your project or schedule a visit to our Experience Centre.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2 font-mono">
                Why Partner With Us
              </span>
              <h2 className="font-serif text-3xl font-light leading-snug">
                Complete Customisation, In-House Precision
              </h2>
              <p className="text-xs sm:text-sm text-[#77786B] font-light leading-relaxed mt-4">
                We craft bespoke modular kitchens, wardrobes, and living furniture with zero templates and zero compromises.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#C9BDAA]/40 text-xs text-[#292824]">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">Factory &amp; Experience Centre Under One Roof</strong>
                  <span className="text-[#77786B] font-light">See live manufacturing in action; walk the production floor.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">Specialty PU Paint &amp; Custom Finishes</strong>
                  <span className="text-[#77786B] font-light">Unlimited RAL/Pantone colour matching, natural veneer, duco, glass, rattan.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">German Blum / Hettich Hardware</strong>
                  <span className="text-[#77786B] font-light">Fitted exclusively with lifetime-tested German soft-close runners and hinges.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">Personal Involvement</strong>
                  <span className="text-[#77786B] font-light">NIFT founder guidance on design, proportions, material pairing, and installation.</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F5F2EC] border border-[#C9BDAA]/40 space-y-3 text-xs">
              <span className="text-[10px] tracking-wider uppercase text-[#A76F55] block font-mono font-semibold">
                Direct Contact
              </span>
              <p className="flex items-center text-[#292824]">
                <Mail className="w-4 h-4 text-[#A76F55] mr-2" />
                <span>hello@example.com</span>
              </p>
              <p className="flex items-center text-[#292824]">
                <Phone className="w-4 h-4 text-[#A76F55] mr-2" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center text-[#292824]">
                <MapPin className="w-4 h-4 text-[#A76F55] mr-2" />
                <span>Experience Centre &amp; Factory, New Delhi, India</span>
              </p>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/50 shadow-sm">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#A76F55]/20 text-[#A76F55] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-3xl font-light mb-2">Consultation Request Received</h3>
                  <p className="text-xs sm:text-sm text-[#77786B] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong>{form.fullName}</strong>. Your inquiry has been registered{referenceId ? ` (Ref: #${referenceId})` : ''}. Our design lead will connect with you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setForm({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        country: 'India',
                        enquiryType: 'Modular Kitchen Consultation',
                        productCategory: 'Modular Kitchens',
                        estimatedQuantity: '',
                        message: '',
                        consent: false,
                      });
                    }}
                    className="bg-[#292824] text-[#FAF9F6] text-xs uppercase tracking-wider px-8 py-3.5 hover:bg-[#A76F55] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#A76F55] block mb-1 font-mono">
                      Step 1 of 1
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#292824]">
                      Tell Us About Your Space
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="e.g. Radhika Sharma"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Architectural Firm / Role
                      </label>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="Homeowner, Architect, or Studio"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="radhika@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={form.enquiryType}
                        onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                      >
                        {ENQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                        Primary Space / Category
                      </label>
                      <select
                        value={form.productCategory}
                        onChange={(e) => setForm({ ...form, productCategory: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                      Project Location / City
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                      placeholder="e.g. New Delhi, Gurugram, Noida, Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1.5">
                      Tell Us About Your Space &amp; Finishes *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                      placeholder="Share dimensions, preferred finishes (PU paint, veneer, duco, glass), layout requirements, or schedule an Experience Centre visit..."
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 text-[#A76F55] focus:ring-0"
                    />
                    <label htmlFor="consent" className="text-xs text-[#77786B] font-light leading-normal">
                      I agree to allow Ceramics &amp; Beyond to contact me regarding my bespoke furniture and modular design consultation.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#292824] text-[#FAF9F6] py-4 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting Consultation Request...' : 'Send Consultation Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
