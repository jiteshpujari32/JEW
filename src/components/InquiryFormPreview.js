'use client';

import { useState } from 'react';
import { FiUpload, FiSend } from 'react-icons/fi';

const PER_FILE_LIMIT = 10 * 1024 * 1024; // 10MB per file

const FALLBACK_ERROR =
  'Something went wrong sending your inquiry. Please call +91 93233 97961 or message us on WhatsApp at +91 83083 83673.';

const EMPTY_FORM = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  website: '', // honeypot â€” must stay empty for human visitors
};

export default function InquiryFormPreview() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onFilesSelected = (e) => {
    const selected = Array.from(e.target.files);
    const tooBig = selected.filter((f) => f.size > PER_FILE_LIMIT);
    const kept = selected.filter((f) => f.size <= PER_FILE_LIMIT);

    setFiles(kept);
    setFileError(
      tooBig.length
        ? `${tooBig.map((f) => f.name).join(', ')} ${tooBig.length === 1 ? 'is' : 'are'} larger than 10MB and ${tooBig.length === 1 ? 'was' : 'were'} not attached.`
        : ''
    );

    // Clear the native file list so the same file can be re-selected after a fix.
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      files.forEach((file) => {
        data.append('files', file);
      });

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        body: data,
      });

      let body = null;
      try {
        body = await res.json();
      } catch {
        // non-JSON response (host error page, 413, etc.)
      }

      if (!res.ok) {
        setError(
          typeof body?.message === 'string' && body.message.trim()
            ? body.message
            : FALLBACK_ERROR
        );
        return;
      }

      setSuccess(true);
      setFormData(EMPTY_FORM);
      setFiles([]);
      setFileError('');
    } catch {
      setError(FALLBACK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-steel-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiSend className="text-green-600" size={28} />
        </div>
        <h3 className="text-2xl font-bold text-steel-800 mb-2">Thank You!</h3>
        <p className="text-steel-500">
          Your inquiry has been submitted successfully. We&apos;ll get back to you within 24 hours with a quote.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-primary mt-6"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-steel-100">
      <h3 className="text-2xl font-bold text-steel-800 mb-2">Request a Quote</h3>
      <p className="text-steel-500 text-sm mb-6">Fill the form below and get a response within 24 hours.</p>

      {error && (
        <div className="bg-red-50 text-red-600 rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-4">
        {/* Honeypot: hidden from sighted users and assistive tech, visible to naive bots. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value.replace(/[0-9]/g, '');
              setFormData({ ...formData, name: value });
            }}
            className="w-full px-4 py-3 border border-steel-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-steel-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-steel-200 rounded-l-lg bg-steel-50 text-steel-600 text-sm">
                +91
              </span>
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: value });
                }}
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
                className="w-full px-4 py-3 border border-steel-200 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            {formData.phone && formData.phone.length !== 10 && (
              <p className="text-red-500 text-xs mt-1">Enter 10 digit number</p>
            )}
          </div>
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-steel-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
          />
        </div>
        <select
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 border border-steel-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm text-steel-600"
        >
          <option value="">Select Service Required *</option>
          <option value="CNC Machining">CNC Machining</option>
          <option value="Lathe Machining">Lathe Machining</option>
          <option value="VMC Milling & Drilling">VMC Milling & Drilling</option>
          <option value="Metal Fabrication & Welding">Metal Fabrication & Welding</option>
          <option value="Custom Parts Manufacturing">Custom Parts Manufacturing</option>
          <option value="Prototype Development">Prototype Development</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Describe your requirements (material, quantity, dimensions, etc.)"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-steel-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm resize-none"
        />
        <div className="border-2 border-dashed border-steel-200 rounded-lg p-4 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <label className="cursor-pointer">
            <FiUpload className="mx-auto text-steel-400 mb-2" size={24} />
            <p className="text-sm text-steel-500">
              Upload technical drawings (PDF, DWG, STEP, IGES, images)
            </p>
            <p className="text-xs text-steel-400 mt-1">Max 10MB per file</p>
            <input
              type="file"
              multiple
              accept=".pdf,.dwg,.step,.stp,.iges,.igs,.png,.jpg,.jpeg"
              onChange={onFilesSelected}
              className="hidden"
            />
          </label>
          {files.length > 0 && (
            <div className="mt-3 text-left">
              {files.map((file, i) => (
                <p key={i} className="text-xs text-primary-600">{file.name}</p>
              ))}
            </div>
          )}
        </div>
        {fileError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg p-3 text-sm">
            {fileError}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry & Get Quote'}
        </button>
      </form>
    </div>
  );
}


