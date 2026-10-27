import React, { useState, useEffect } from 'react';
import { Hero } from '../components/ui/Hero';
import { BrandIntro } from '../components/ui/BrandIntro';
import { FeaturedCategories } from '../components/ui/FeaturedCategories';
import { ProductShowcase } from '../components/ui/ProductShowcase';
import { CraftsmanshipSection } from '../components/ui/CraftsmanshipSection';
import { ExportEnquirySection } from '../components/ui/ExportEnquirySection';
import { FinalCTA } from '../components/ui/FinalCTA';
import { api } from '../api/client';

const isLegacySectionContent = (content?: any) => {
  if (!content) return false;
  const str = JSON.stringify(content).toLowerCase();
  return (
    str.includes('ceramic biscuit') ||
    str.includes('crafted in ceramic') ||
    str.includes('bansal') ||
    str.includes('1993') ||
    str.includes('russia') ||
    str.includes('st. petersburg') ||
    str.includes('every pattern tells a story') ||
    str.includes('looking for the right ceramic') ||
    str.includes('find your next ceramic collection') ||
    str.includes('hand-printed precision') ||
    str.includes('export-enquiries')
  );
};

export const HomePage: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await api.get('/api/public/homepage');
        if (data && Array.isArray(data.sections)) {
          setSections(data.sections);
        }
      } catch (e) {
        console.warn('Could not load dynamic sections, using defaults:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const getSectionContent = (type: string) => {
    const sec = sections.find((s) => s.section_type === type);
    if (!sec || !sec.content || isLegacySectionContent(sec.content)) {
      return undefined;
    }
    return sec.content;
  };

  return (
    <>
      {/* 1. Hero Section with Full-Size Auto-Appearing Background Slider */}
      <Hero content={getSectionContent('hero')} />

      {/* 2. Brand Introduction */}
      <BrandIntro content={getSectionContent('brand_intro')} />

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. Product Showcase */}
      <ProductShowcase />

      {/* 5. Manufacturing & Craftsmanship */}
      <CraftsmanshipSection content={getSectionContent('craftsmanship')} />

      {/* 6. Consultation & Factory Visit */}
      <ExportEnquirySection content={getSectionContent('export_enquiries')} />

      {/* 7. Final Call to Action */}
      <FinalCTA content={getSectionContent('final_cta')} />
    </>
  );
};
