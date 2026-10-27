import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowUpRight, MapPin, Calendar, Layers, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Ceramics & Beyond`,
      description: project.description,
      images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      {/* Top Banner & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <div className="flex items-center space-x-3 text-xs text-[#77786B] font-mono uppercase tracking-wider mb-3">
            <span>{project.category}</span>
            <span>·</span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#A76F55]" />
              {project.location}
            </span>
            <span>·</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#A76F55]" />
              {project.year}
            </span>
          </div>

          <h1 className="font-serif text-display-section font-light text-[#292824] leading-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#525049] font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="relative aspect-[21/10] min-h-[320px] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
          <Image
            src={project.heroImage}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Brief & Materials Specified Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Design Brief */}
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-2">
              Architectural Commission
            </span>
            <h2 className="font-serif text-3xl font-light text-[#292824] mb-4">
              The Design Brief &amp; Solution
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
              <p>{project.brief}</p>
              <p>
                From coordinating stone block reservations to pre-assembling custom joinery carcasses on our live factory floor, this commission highlights our holistic capability as both material curator and precision manufacturer.
              </p>
            </div>
          </div>

          {/* Right: Materials Specified Card */}
          <div className="lg:col-span-5 bg-[#FAF9F6] p-8 border border-[#C9BDAA]/40 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-4 h-4 text-[#A76F55]" />
              <h3 className="font-serif text-xl font-light text-[#292824]">
                Materials Specified
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[#525049] font-light">
              {project.materialsUsed.map((mat, i) => (
                <li key={i} className="flex items-start space-x-3 pb-3 border-b border-[#C9BDAA]/30 last:border-0">
                  <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-[#292824]">{mat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#292824] text-[#FAF9F6] px-6 py-3 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
              >
                <span>Inquire About This Palette</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
          <div className="mb-8">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
              Visual Documentation
            </span>
            <h2 className="font-serif text-3xl font-light text-[#292824]">Installation Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((g, i) => (
              <figure key={i} className="overflow-hidden bg-[#ECE7DE]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={g.url}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="p-4 bg-[#FAF9F6] text-xs text-[#525049] border-b border-x border-[#C9BDAA]/40 font-light">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* More Projects */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-[#C9BDAA]/30 pt-16">
        <h3 className="font-serif text-2xl font-light text-[#292824] mb-8">
          Other Built Case Studies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group block bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE7DE]">
                <Image
                  src={p.heroImage}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] tracking-wider uppercase text-[#A76F55] block mb-1">
                  {p.category} · {p.location}
                </span>
                <h4 className="font-serif text-xl font-light text-[#292824] group-hover:text-[#A76F55] transition-colors">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
