import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { JOURNAL_ARTICLES } from '../data/journal';

export const JournalPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: 'Journal' }]} />

        <div className="mt-8 mb-16 sm:mb-20 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Inspiration &amp; Dialogue
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            The Architectural<br />
            <span className="italic font-normal">Journal.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            Essays, technical guides, and design reflections crafted by our material specialists and master joiners.
          </p>
        </div>

        {/* Featured Article Hero Card */}
        <div className="mb-16 sm:mb-24">
          <Link
            to={`/journal/${JOURNAL_ARTICLES[0].slug}`}
            className="group block bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:h-full min-h-[340px] overflow-hidden bg-[#ECE7DE]">
                <img
                  src={JOURNAL_ARTICLES[0].heroImage}
                  alt={JOURNAL_ARTICLES[0].imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  loading="eager"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#A76F55] uppercase tracking-wider mb-3">
                    <span className="bg-[#A76F55]/10 px-2 py-0.5 rounded-sm">Featured</span>
                    <span>·</span>
                    <span>{JOURNAL_ARTICLES[0].category}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#292824] mb-4 group-hover:text-[#A76F55] transition-colors leading-snug">
                    {JOURNAL_ARTICLES[0].title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#525049] font-light leading-relaxed mb-6">
                    {JOURNAL_ARTICLES[0].excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#C9BDAA]/30 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#77786B]">
                    {JOURNAL_ARTICLES[0].date} · {JOURNAL_ARTICLES[0].readTime}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs tracking-architectural uppercase text-[#292824] font-medium group-hover:text-[#A76F55] transition-colors">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <article
              key={article.slug}
              className="group bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <Link to={`/journal/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-[#ECE7DE]">
                  <img
                    src={article.heroImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] tracking-widest uppercase">
                    {article.category}
                  </div>
                </Link>

                <div className="p-6">
                  <span className="text-[10px] font-mono text-[#77786B] uppercase tracking-wider block mb-2">
                    {article.date} · {article.readTime}
                  </span>

                  <h3 className="font-serif text-xl font-light text-[#292824] mb-3 group-hover:text-[#A76F55] transition-colors line-clamp-2">
                    <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-[#525049] font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/journal/${article.slug}`}
                  className="w-full inline-flex items-center justify-between text-xs tracking-architectural uppercase text-[#292824] font-medium py-3 border-t border-[#C9BDAA]/30 group-hover:text-[#A76F55] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
