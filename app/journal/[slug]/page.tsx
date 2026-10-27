import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2, User } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Journal`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Ceramics & Beyond Journal`,
      description: article.excerpt,
      images: [{ url: article.heroImage, width: 1200, height: 630, alt: article.imageAlt }],
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      {/* Top Banner & Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-10">
        <Breadcrumbs
          items={[
            { label: "Journal", href: "/journal" },
            { label: article.title },
          ]}
        />

        <div className="mt-8">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#A76F55] uppercase tracking-wider mb-4">
            <span className="bg-[#A76F55]/10 px-2 py-0.5">{article.category}</span>
            <span>·</span>
            <span className="flex items-center text-[#77786B]">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {article.date}
            </span>
            <span>·</span>
            <span className="flex items-center text-[#77786B]">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#292824] leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#525049] font-light leading-relaxed italic border-l-2 border-[#A76F55] pl-4 py-1">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Hero Photograph */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-16 sm:mb-20">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
          <Image
            src={article.heroImage}
            alt={article.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Main Editorial Article Body */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="space-y-12">
          {article.content.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#292824]">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-[#525049] font-light leading-relaxed">
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 p-6 sm:p-8 bg-[#FAF9F6] border-l-4 border-[#A76F55] shadow-sm">
                  <p className="font-serif text-xl sm:text-2xl text-[#292824] font-light italic leading-snug">
                    “{section.quote}”
                  </p>
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Article Author & Atelier Sign-off */}
        <div className="mt-16 pt-8 border-t border-[#C9BDAA]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#292824] text-white flex items-center justify-center font-serif text-sm">
              CB
            </div>
            <div>
              <span className="text-xs font-medium text-[#292824] block">{article.author}</span>
              <span className="text-[11px] text-[#77786B]">Ceramics &amp; Beyond Atelier</span>
            </div>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#292824] hover:text-[#A76F55] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#C9BDAA]/40">
            <h3 className="font-serif text-2xl font-light text-[#292824] mb-6">
              Further Editorial Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/journal/${r.slug}`}
                  className="group block p-5 bg-[#FAF9F6] border border-[#C9BDAA]/40 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[10px] font-mono text-[#A76F55] uppercase block mb-1">
                    {r.category}
                  </span>
                  <h4 className="font-serif text-lg font-light text-[#292824] group-hover:text-[#A76F55] transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
