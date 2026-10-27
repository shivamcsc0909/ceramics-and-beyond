import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import {
  Package,
  Layers,
  Mail,
  Image as ImageIcon,
  Home,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Globe,
  Building2,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await api.get('/api/admin/dashboard');
      setStats(data);
    } catch (e) {
      console.warn('Could not load dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/api/admin/enquiries/${id}/status`, { status });
      await fetchStats();
    } catch (e: any) {
      alert(e.message || 'Status update failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="w-8 h-8 border-2 border-[#292824] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const counts = stats?.counts || {
    products: 8,
    categories: 6,
    unread_enquiries: 0,
    media: 0,
  };

  const recentEnquiries = stats?.recent_enquiries || [];

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9BDAA]/40">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
            Furniture Manufacturer Administration
          </span>
          <h1 className="font-serif text-3xl font-light text-[#292824]">
            Client CMS Overview
          </h1>
          <p className="text-xs text-[#77786B] mt-1 font-light">
            Ceramics &amp; Beyond · New Delhi, India · Est. 1993
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-[#A76F55] transition-colors rounded-sm"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/homepage"
            className="inline-flex items-center space-x-2 border border-[#C9BDAA] text-[#292824] px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-[#F5F2EC] transition-colors rounded-sm"
          >
            <Home className="w-4 h-4" />
            <span>Homepage Editor</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-[#C9BDAA]/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#77786B] block mb-1">Furniture Creations</span>
            <span className="font-serif text-3xl font-normal text-[#292824]">{counts.products || counts.collections || 0}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#A76F55]">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-[#C9BDAA]/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#77786B] block mb-1">Product Categories</span>
            <span className="font-serif text-3xl font-normal text-[#292824]">{counts.categories || 6}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#A76F55]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-[#C9BDAA]/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#77786B] block mb-1">Pending Enquiries</span>
            <span className="font-serif text-3xl font-normal text-[#292824]">{counts.unread_enquiries || 0}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#A76F55]">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-[#C9BDAA]/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#77786B] block mb-1">Media Files</span>
            <span className="font-serif text-3xl font-normal text-[#292824]">{counts.media || 0}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#A76F55]">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent B2B Trade Enquiries */}
      <div className="bg-white border border-[#C9BDAA]/40 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C9BDAA]/30">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#292824]">Recent Trade &amp; B2B Enquiries</h2>
            <p className="text-xs text-[#77786B]">Commercial inquiries received from prospective distributors, architects, and importers.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs uppercase tracking-wider text-[#A76F55] hover:underline font-medium inline-flex items-center"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#77786B]">No enquiries received yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F2EC] text-[10px] uppercase tracking-wider text-[#77786B]">
                <tr>
                  <th className="py-2.5 px-3">Contact / Company</th>
                  <th className="py-2.5 px-3">Country</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9BDAA]/20">
                {recentEnquiries.map((enq: any) => (
                  <tr key={enq.id} className="hover:bg-[#FAF9F6]">
                    <td className="py-3 px-3">
                      <p className="font-medium text-[#292824]">{enq.full_name}</p>
                      {enq.company_name ? (
                        <p className="text-[11px] text-[#A76F55]">{enq.company_name}</p>
                      ) : null}
                      <p className="text-[10px] text-[#77786B] font-mono">{enq.email}</p>
                    </td>
                    <td className="py-3 px-3 text-[#292824]">{enq.country || 'India'}</td>
                    <td className="py-3 px-3 text-[#77786B]">{enq.enquiry_type || enq.project_type || 'General'}</td>
                    <td className="py-3 px-3 text-[#77786B]">{enq.product_category || '—'}</td>
                    <td className="py-3 px-3 text-[#77786B] font-mono">{enq.estimated_quantity || '—'}</td>
                    <td className="py-3 px-3 text-[#77786B] text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                        className={`text-[10px] uppercase font-mono px-2 py-1 rounded border outline-none ${
                          enq.status === 'new'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : enq.status === 'contacted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-gray-50 text-gray-800 border-gray-300'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
