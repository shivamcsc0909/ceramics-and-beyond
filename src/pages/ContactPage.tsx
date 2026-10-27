import React, { useState } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MapPin, Mail, Phone, Clock, Check, ArrowUpRight } from 'lucide-react';
import { api } from '../api/client';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    enquiryType: 'Product Information',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/public/enquiry', {
        fullName: form.fullName,
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        enquiryType: form.enquiryType,
        message: form.message,
      });
      setSuccess(true);
    } catch (err: any) {
      alert(err.message || 'Error submitting enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Header */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Workshop &amp; Experience Centre · New Delhi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
            Contact Ceramics &amp; Beyond
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            Visit our New Delhi workshop or send us a message about custom sofas, wooden furniture, modular kitchens, wardrobes, or designer tiles for your home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2">
                Atelier Location
              </span>
              <h2 className="font-serif text-3xl font-light text-[#292824]">
                New Delhi, India
              </h2>
              <p className="text-xs sm:text-sm text-[#77786B] font-light leading-relaxed mt-2">
                Factory and Experience Centre located under one roof in New Delhi. Come visit us to touch the finishes, see the modular hardware in action, and experience custom furniture tailored to the last inch.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#C9BDAA]/40 text-xs text-[#292824]">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#292824]">Address</h4>
                  <p className="text-[#77786B] mt-0.5">New Delhi, Delhi, India</p>
                  <span className="text-[10px] text-[#A76F55] block mt-0.5 font-mono">[Dummy address for development — replace on client deployment]</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#292824]">Commercial Email</h4>
                  <p className="font-mono text-[#77786B] mt-0.5">hello@example.com</p>
                  <span className="text-[10px] text-[#A76F55] block mt-0.5 font-mono">[Dummy email for development]</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#292824]">Telephone &amp; WhatsApp</h4>
                  <p className="font-mono text-[#77786B] mt-0.5">+91 98765 43210</p>
                  <span className="text-[10px] text-[#A76F55] block mt-0.5 font-mono">[Dummy phone for development]</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-4 h-4 text-[#A76F55] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#292824]">Business Hours</h4>
                  <p className="text-[#77786B] mt-0.5">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#F5F2EC] border border-[#C9BDAA]/40 text-xs text-[#77786B]">
              <span className="font-medium text-[#292824] block mb-1">Architects &amp; Interior Designers</span>
              <p className="leading-relaxed">
                We collaborate closely with architects, specifiers, and interior designers for residential and boutique commercial fit-outs. Inquire about trade consultations, finish swatches, and technical shop drawings.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#F5F2EC] border border-[#C9BDAA]/50 p-8 sm:p-10">
            {success ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-[#A76F55]/20 text-[#A76F55] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-2">Message Dispatched</h3>
                <p className="text-xs text-[#77786B] max-w-sm mx-auto mb-6">
                  Thank you for reaching out to Ceramics &amp; Beyond. Our team will review your message and reply promptly.
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
                      enquiryType: 'Product Information',
                      message: '',
                    });
                  }}
                  className="bg-[#292824] text-white text-xs uppercase tracking-wider px-6 py-2.5 font-medium hover:bg-[#A76F55]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
                    Direct Inquiry Form
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#292824]">
                    Send Us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Company / Firm</label>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Country</label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                        placeholder="India"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Enquiry Type</label>
                      <select
                        value={form.enquiryType}
                        onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                      >
                        <option value="Custom Sofa & Living Furniture">Custom Sofa &amp; Living Furniture</option>
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="Wardrobes & Closets">Wardrobes &amp; Closets</option>
                        <option value="Solid Wood Furniture & Dining">Solid Wood Furniture &amp; Dining</option>
                        <option value="Tiles & Surface Finishes">Tiles &amp; Surface Finishes</option>
                        <option value="Workshop & Experience Centre Visit">Workshop &amp; Experience Centre Visit</option>
                        <option value="Architect / Interior Designer Collaboration">Architect / Interior Designer Collaboration</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/70 focus:border-[#292824] outline-none"
                      placeholder="Describe your inquiry, project scope, or questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#292824] text-[#FAF9F6] py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
