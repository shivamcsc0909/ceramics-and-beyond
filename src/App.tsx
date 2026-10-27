import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ClientAuthProvider } from './context/ClientAuthContext';
import { DeveloperAuthProvider } from './context/DeveloperAuthContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { DeveloperLayout } from './components/layout/DeveloperLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CraftsmanshipPage } from './pages/CraftsmanshipPage';
import { ExportEnquiriesPage } from './pages/ExportEnquiriesPage';
import { CataloguePage } from './pages/CataloguePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Landing Page Variations
import { LandingOne } from './pages/landings/LandingOne';
import { LandingTwo } from './pages/landings/LandingTwo';
import { LandingThree } from './pages/landings/LandingThree';

// Client CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminHomepageEditorPage } from './pages/admin/AdminHomepageEditorPage';
import { AdminCollectionsPage } from './pages/admin/AdminCollectionsPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminJournalPage } from './pages/admin/AdminJournalPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Private Developer Portal Pages
import { DeveloperLoginPage } from './pages/developer/DeveloperLoginPage';
import { DeveloperDashboardPage } from './pages/developer/DeveloperDashboardPage';
import { DeveloperAdminsPage } from './pages/developer/DeveloperAdminsPage';
import { DeveloperBackupsPage } from './pages/developer/DeveloperBackupsPage';
import { DeveloperMaintenancePage } from './pages/developer/DeveloperMaintenancePage';
import { DeveloperLogsPage } from './pages/developer/DeveloperLogsPage';

export const App: React.FC = () => {
  return (
    <ClientAuthProvider>
      <DeveloperAuthProvider>
        <Routes>
          {/* ========================================================= */}
          {/* 1. PUBLIC ATELIER APPLICATION ROUTES                      */}
          {/* ========================================================= */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/category/:slug" element={<CategoryDetailPage />} />
            <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />

            {/* Redirect pages without content to authentic pages */}
            <Route path="/export-enquiries" element={<Navigate to="/contact" replace />} />
            <Route path="/catalogue" element={<Navigate to="/products" replace />} />
            <Route path="/collections" element={<Navigate to="/products" replace />} />
            <Route path="/collections/:slug" element={<CategoryDetailPage />} />
            <Route path="/experience" element={<Navigate to="/craftsmanship" replace />} />
            <Route path="/services" element={<Navigate to="/craftsmanship" replace />} />
            <Route path="/applications" element={<Navigate to="/products" replace />} />
            <Route path="/projects" element={<Navigate to="/products" replace />} />
            <Route path="/projects/:slug" element={<Navigate to="/products" replace />} />
            <Route path="/journal" element={<Navigate to="/about" replace />} />
            {/* Dedicated Landing Page Variations */}
            <Route path="/landing-1" element={<LandingOne />} />
            <Route path="/landing-2" element={<LandingTwo />} />
            <Route path="/landing-3" element={<LandingThree />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ========================================================= */}
          {/* 2. CLIENT CONTENT CMS REALM                               */}
          {/* ========================================================= */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="homepage" element={<AdminHomepageEditorPage />} />
            <Route path="collections" element={<AdminCategoriesPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="journal" element={<AdminJournalPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* ========================================================= */}
          {/* 3. PRIVATE DEVELOPER PORTAL REALM (NON-DISCOVERABLE)      */}
          {/* ========================================================= */}
          <Route path="/developer-portal/login" element={<DeveloperLoginPage />} />
          <Route path="/developer-portal" element={<DeveloperLayout />}>
            <Route index element={<Navigate to="/developer-portal/dashboard" replace />} />
            <Route path="dashboard" element={<DeveloperDashboardPage />} />
            <Route path="admins" element={<DeveloperAdminsPage />} />
            <Route path="backups" element={<DeveloperBackupsPage />} />
            <Route path="maintenance" element={<DeveloperMaintenancePage />} />
            <Route path="logs" element={<DeveloperLogsPage />} />
          </Route>
        </Routes>
      </DeveloperAuthProvider>
    </ClientAuthProvider>
  );
};
