import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../../data/journal';

export const JournalPreview: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EC] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Editorial Journal
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Inspiration &amp; Dialogue
            </h2>
          </div>
          <Link
            to="/journal"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors self-start md:self-end pb-1 border-b border-[#292824]/30 hover:border-[#A76F55]"
          >
            <span>Read All Articles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* 3-Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <article key={article.slug} className="group flex flex-col justify-between">
              <Link to={`/journal/${article.slug}`} className="block overflow-hidden bg-[#ECE7DE] shadow-sm mb-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] tracking-widest uppercase">
                    {article.category}
                  </div>
                </div>
              </Link>

              <div>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-[#77786B] uppercase tracking-wider mb-2">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#292824] mb-3 group-hover:text-[#A76F55] transition-colors leading-snug">
                  <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#525049] font-light leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <Link
                  to={`/journal/${article.slug}`}
                  className="inline-flex items-center space-x-1 text-xs tracking-architectural uppercase text-[#292824] font-medium group-hover:text-[#A76F55] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
