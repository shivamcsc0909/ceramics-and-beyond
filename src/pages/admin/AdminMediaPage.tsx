import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Upload, Trash2, Image as ImageIcon, Copy, Check, Search } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchMedia = async () => {
    try {
      const data = await api.get('/api/admin/media');
      setMedia(data);
    } catch (e) {
      console.warn('Could not load media:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('alt_text', altText);

    setUploading(true);
    try {
      await api.post('/api/admin/media/upload', formData);
      setAltText('');
      await fetchMedia();
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this media file?')) return;
    try {
      await api.delete(`/api/admin/media/${id}`);
      await fetchMedia();
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleCopyUrl = (id: number, path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = media.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      (m.alt_text && m.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="bg-[#FAF9F6] p-6 border border-[#C9BDAA]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
            Digital Asset Management
          </span>
          <h2 className="font-serif text-2xl font-light text-[#292824]">
            Media Library ({media.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1">
            Upload high-resolution photography. Executable scripts are strictly blocked by .htaccess security.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-[#77786B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#C9BDAA]/60 text-xs"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-16">
          <div className="w-8 h-8 border-2 border-[#292824] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white border border-[#C9BDAA]/30 p-12 text-center text-xs text-[#77786B]">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 text-[#C9BDAA]" />
          <p>No media files uploaded yet. Supported formats: JPEG, PNG, WebP, AVIF up to 10MB.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-[#C9BDAA]/30 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-[#ECE7DE] overflow-hidden">
                <img
                  src={item.file_path}
                  alt={item.alt_text || item.filename}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 text-[11px]">
                <p className="font-mono text-[#292824] truncate" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-[10px] text-[#77786B] font-mono mt-0.5">
                  {(item.file_size / 1024).toFixed(1)} KB · {item.width}×{item.height}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#C9BDAA]/20">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.id, item.file_path)}
                    className="inline-flex items-center space-x-1 text-[#77786B] hover:text-[#292824]"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span className="text-[9px] font-mono">
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
