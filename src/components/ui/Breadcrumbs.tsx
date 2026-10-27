import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-[#77786B] font-mono">
      <Link to="/" className="hover:text-[#292824] transition-colors flex items-center">
        <Home className="w-3.5 h-3.5 mr-1 text-[#A76F55]" />
        <span>HOME</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-[#C9BDAA]" />
            {isLast || !item.href ? (
              <span className="text-[#292824] uppercase font-semibold line-clamp-1">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-[#292824] transition-colors uppercase line-clamp-1">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
