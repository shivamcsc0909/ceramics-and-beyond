import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, Download, Filter, Building2, Globe, Package, X } from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  const fetchEnquiries = async () => {
    try {
      const endpoint =
        filterStatus === 'all'
          ? '/api/admin/enquiries'
          : `/api/admin/enquiries?status=${filterStatus}`;
      const data = await api.get(endpoint);
      if (Array.isArray(data)) setEnquiries(data);
    } catch (e) {
      console.warn('Could not load enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/api/admin/enquiries/${id}/status`, { status });
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
      await fetchEnquiries();
    } catch (e: any) {
      alert(e.message || 'Update failed');
    }
  };

  const exportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID', 'Full Name', 'Company Name', 'Email', 'Phone', 'Country', 'Enquiry Type', 'Category', 'Quantity', 'Status', 'Date', 'Message'];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.full_name || ''}"`,
      `"${e.company_name || ''}"`,
      `"${e.email || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.country || 'India'}"`,
      `"${e.enquiry_type || e.project_type || 'General'}"`,
      `"${e.product_category || ''}"`,
      `"${e.estimated_quantity || ''}"`,
      `"${e.status || 'new'}"`,
      `"${e.created_at || ''}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ceramics-trade-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#C9BDAA]/40">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
            Commercial Lead Queue
          </span>
          <h1 className="font-serif text-3xl font-light text-[#292824]">
            Trade &amp; B2B Enquiries ({enquiries.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          disabled={enquiries.length === 0}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#A76F55] transition-colors rounded-sm disabled:opacity-40"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-4 h-4 text-[#77786B]" />
        <span className="text-xs uppercase tracking-wider text-[#77786B]">Filter Status:</span>
        {['all', 'new', 'in_review', 'contacted', 'archived'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 rounded text-xs uppercase font-mono tracking-wider transition-colors ${
              filterStatus === st
                ? 'bg-[#292824] text-white'
                : 'bg-[#F5F2EC] text-[#292824] hover:bg-[#C9BDAA]/40'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#C9BDAA]/40 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-16 text-xs text-[#77786B]">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#77786B]">No enquiries match this filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292824]">
              <thead className="bg-[#F5F2EC] border-b border-[#C9BDAA]/40 uppercase tracking-wider text-[10px] text-[#77786B]">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9BDAA]/20">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-[#292824]">{enq.full_name}</p>
                      <p className="text-[11px] text-[#77786B] font-mono">{enq.email}</p>
                      <p className="text-[10px] text-[#77786B] font-mono">{enq.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-[#A76F55] font-medium">
                      {enq.company_name || '—'}
                    </td>
                    <td className="py-3 px-4 text-[#292824]">{enq.country || 'India'}</td>
                    <td className="py-3 px-4 text-[#77786B]">{enq.enquiry_type || enq.project_type || 'General'}</td>
                    <td className="py-3 px-4 text-[#77786B] max-w-xs truncate">{enq.product_category || '—'}</td>
                    <td className="py-3 px-4 font-mono text-[#77786B]">{enq.estimated_quantity || '—'}</td>
                    <td className="py-3 px-4 text-[#77786B] text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(enq)}
                        className="text-xs uppercase tracking-wider text-[#A76F55] hover:underline font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 border border-[#C9BDAA] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-[#77786B] hover:text-[#292824]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-widest uppercase text-[#A76F55] block mb-1">
              Enquiry Reference #{selectedEnquiry.id}
            </span>
            <h3 className="font-serif text-2xl font-light text-[#292824] mb-4">
              {selectedEnquiry.full_name}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs py-4 border-t border-b border-[#C9BDAA]/30 mb-4">
              <div>
                <span className="text-[#77786B] block">Company</span>
                <span className="font-medium text-[#292824]">{selectedEnquiry.company_name || 'Individual Buyer'}</span>
              </div>
              <div>
                <span className="text-[#77786B] block">Country</span>
                <span className="font-medium text-[#292824]">{selectedEnquiry.country || 'India'}</span>
              </div>
              <div>
                <span className="text-[#77786B] block">Email</span>
                <span className="font-mono text-[#292824]">{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="text-[#77786B] block">Phone / WhatsApp</span>
                <span className="font-mono text-[#292824]">{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="text-[#77786B] block">Type</span>
                <span className="text-[#292824]">{selectedEnquiry.enquiry_type || selectedEnquiry.project_type}</span>
              </div>
              <div>
                <span className="text-[#77786B] block">Estimated Quantity</span>
                <span className="font-mono text-[#292824]">{selectedEnquiry.estimated_quantity || 'Not specified'}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-wider text-[#77786B] block mb-1">Commercial Requirement / Message</span>
              <div className="p-4 bg-[#F5F2EC] text-xs text-[#292824] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-light">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#C9BDAA]/30 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-[#77786B]">Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                  className="p-1 border border-[#C9BDAA]/60 outline-none uppercase font-mono text-[11px]"
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="bg-[#292824] text-white px-4 py-2 uppercase tracking-wider text-[11px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
