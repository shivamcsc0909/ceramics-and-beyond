"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  consent?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    projectType: "Bespoke Kitchen & Live Experience",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[+0-9\s-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your project details or inquiry";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Please provide at least 15 characters describing your project";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to the handling of your contact details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      projectType: "Bespoke Kitchen & Live Experience",
      message: "",
      consent: false,
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/40 shadow-lg relative">
      {isSuccess ? (
        <div className="text-center py-12 space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-3xl font-light text-[#292824]">
            Inquiry Received
          </h3>

          <p className="text-sm text-[#525049] font-light max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="font-medium text-[#292824]">{formData.fullName}</strong>. An architectural consultant from Ceramics &amp; Beyond will contact you at <span className="font-mono text-xs">{formData.email}</span> within one business day.
          </p>

          <div className="p-4 bg-[#F5F2EC] border border-[#C9BDAA]/30 text-xs text-[#77786B] max-w-md mx-auto rounded-sm text-left">
            <span className="font-semibold uppercase text-[#A76F55] tracking-wider block mb-1">
              Development Integration Note
            </span>
            <p>
              This consultation request has been validated on the client side. Connect to your enterprise CRM or email endpoint (e.g., SendGrid, Resend, or AWS SES) in production via an API route.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center text-xs tracking-architectural uppercase text-[#292824] border-b border-[#292824] hover:text-[#A76F55] hover:border-[#A76F55] transition-colors pb-1 pt-4"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-2">
                Your Full Name <span className="text-[#A76F55]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full px-4 py-3 bg-[#F5F2EC] border text-sm text-[#292824] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                  errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#C9BDAA]/60 focus:border-[#292824]"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-2">
                Email Address <span className="text-[#A76F55]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 bg-[#F5F2EC] border text-sm text-[#292824] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-[#C9BDAA]/60 focus:border-[#292824]"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-2">
                Phone Number <span className="text-[#A76F55]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-3 bg-[#F5F2EC] border text-sm text-[#292824] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                  errors.phone ? "border-red-500 focus:border-red-500" : "border-[#C9BDAA]/60 focus:border-[#292824]"
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Subject / Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-2">
                Inquiry Topic
              </label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F2EC] border border-[#C9BDAA]/60 text-sm text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
              >
                <option value="Bespoke Kitchen & Live Experience">Bespoke Kitchen &amp; Live Experience</option>
                <option value="Continuous Porcelain Slabs">Continuous Porcelain Slabs (Large Format)</option>
                <option value="Natural Marble & Bookmatching">Natural Marble &amp; Bookmatching</option>
                <option value="Designer Wall Tiles & 3D Reliefs">Designer Wall Tiles &amp; 3D Reliefs</option>
                <option value="Architectural Flooring">Architectural Flooring Specification</option>
                <option value="General Architectural Inquiry">General Architectural Inquiry</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-architectural text-[#292824] font-medium mb-2">
              Project Details &amp; Requirements <span className="text-[#A76F55]">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your spatial dimensions, preferred surface palette, or if you wish to book a live factory walkthrough..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 bg-[#F5F2EC] border text-sm text-[#292824] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                errors.message ? "border-red-500 focus:border-red-500" : "border-[#C9BDAA]/60 focus:border-[#292824]"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#A76F55] border-[#C9BDAA] rounded-none focus:ring-0"
              />
              <span className="text-xs text-[#525049] leading-relaxed">
                I agree that Ceramics &amp; Beyond may process my information in accordance with its privacy policy to coordinate architectural consultations or factory floor tours.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#292824] text-[#FAF9F6] px-8 py-4 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors duration-300 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Processing Inquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Atelier Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
