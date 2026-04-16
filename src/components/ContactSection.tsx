'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

const services = [
  'Photography',
  'Videography',
  'Aerial',
  'Virtual Tour',
  'Floor Plans',
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  services: string[];
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  services?: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  suburb: '',
  services: [],
  message: '',
};

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputClass = `
  w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200
  border focus:ring-2
`.trim();

const inputStyle = {
  backgroundColor: '#ffffff',
  borderColor: '#e0e0e0',
  color: '#1f1e1f',
  fontFamily: 'Poppins, sans-serif',
};

const inputFocusStyle = {
  borderColor: '#bac6ff',
  ringColor: '#bac6ff',
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleServiceToggle(service: string) {
    setForm((prev) => {
      const already = prev.services.includes(service);
      return {
        ...prev,
        services: already
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
    setErrors((prev) => ({ ...prev, services: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.suburb.trim()) newErrors.suburb = 'Suburb / address is required.';
    if (form.services.length === 0)
      newErrors.services = 'Please select at least one service.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    console.log('Contact form submission:', form);
    setSubmitted(true);
    setForm(initialState);
  }

  return (
    <section
      id="contact"
      style={{ backgroundColor: '#f8f8f8' }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact info */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
            >
              Contact
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
            >
              Get In Touch
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: '#555555', fontFamily: 'Poppins, sans-serif' }}
            >
              Ready to make your listing stand out? Let&apos;s talk.
            </p>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <span style={{ color: '#bac6ff' }}>
                  <PhoneIcon />
                </span>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:0400000000"
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    0400 000 000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <span style={{ color: '#bac6ff' }}>
                  <EmailIcon />
                </span>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:hello@impactpropertymedia.com.au"
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    hello@impactpropertymedia.com.au
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span style={{ color: '#bac6ff' }}>
                  <LocationIcon />
                </span>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Location
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Melbourne, VIC
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-4">
                <span style={{ color: '#bac6ff' }}>
                  <InstagramIcon />
                </span>
                <div>
                  <p
                    className="text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/impactpropertymedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    @impactpropertymedia
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-2xl p-8 shadow-sm"
            style={{ backgroundColor: '#ffffff', border: '1px solid #ebebeb' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#bac6ff' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#1f1e1f" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                >
                  Message Sent!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: '#555555', fontFamily: 'Poppins, sans-serif' }}
                >
                  Thanks for reaching out. We&apos;ll be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm underline"
                  style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Name <span style={{ color: '#bac6ff' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                    style={{
                      ...inputStyle,
                      ...(errors.name ? { borderColor: '#e05555' } : {}),
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = inputFocusStyle.borderColor;
                      e.target.style.boxShadow = '0 0 0 3px rgba(186,198,255,0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? '#e05555' : '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.name && (
                    <p className="text-xs mt-1" style={{ color: '#e05555', fontFamily: 'Poppins, sans-serif' }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Email <span style={{ color: '#bac6ff' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={inputClass}
                      style={{
                        ...inputStyle,
                        ...(errors.email ? { borderColor: '#e05555' } : {}),
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = inputFocusStyle.borderColor;
                        e.target.style.boxShadow = '0 0 0 3px rgba(186,198,255,0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email ? '#e05555' : '#e0e0e0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: '#e05555', fontFamily: 'Poppins, sans-serif' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Phone <span style={{ color: '#bac6ff' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="04XX XXX XXX"
                      className={inputClass}
                      style={{
                        ...inputStyle,
                        ...(errors.phone ? { borderColor: '#e05555' } : {}),
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = inputFocusStyle.borderColor;
                        e.target.style.boxShadow = '0 0 0 3px rgba(186,198,255,0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.phone ? '#e05555' : '#e0e0e0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.phone && (
                      <p className="text-xs mt-1" style={{ color: '#e05555', fontFamily: 'Poppins, sans-serif' }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Suburb */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Suburb / Property Address <span style={{ color: '#bac6ff' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="suburb"
                    value={form.suburb}
                    onChange={handleChange}
                    placeholder="e.g. 12 Smith St, Richmond VIC 3121"
                    className={inputClass}
                    style={{
                      ...inputStyle,
                      ...(errors.suburb ? { borderColor: '#e05555' } : {}),
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = inputFocusStyle.borderColor;
                      e.target.style.boxShadow = '0 0 0 3px rgba(186,198,255,0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.suburb ? '#e05555' : '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {errors.suburb && (
                    <p className="text-xs mt-1" style={{ color: '#e05555', fontFamily: 'Poppins, sans-serif' }}>
                      {errors.suburb}
                    </p>
                  )}
                </div>

                {/* Services checkboxes */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Services <span style={{ color: '#bac6ff' }}>*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => {
                      const checked = form.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200"
                          style={{
                            backgroundColor: checked ? '#bac6ff' : '#f0f0f0',
                            color: checked ? '#1f1e1f' : '#555555',
                            border: checked ? '1px solid #bac6ff' : '1px solid #e0e0e0',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <p className="text-xs mt-1" style={{ color: '#e05555', fontFamily: 'Poppins, sans-serif' }}>
                      {errors.services}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your property and what you need..."
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = inputFocusStyle.borderColor;
                      e.target.style.boxShadow = '0 0 0 3px rgba(186,198,255,0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-[1.01] mt-1"
                  style={{
                    backgroundColor: '#1f1e1f',
                    color: '#f8f8f8',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
