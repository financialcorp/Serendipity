import React from "react";

const Privacy = () => {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem" }}>

      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 border border-white/10 rounded-lg px-3.5 py-1.5 mb-10 hover:bg-white/5 transition-colors"
      >
        ← Back to home
      </button>

      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1 mb-4">
           Legal
        </span>
        <h1 className="text-2xl font-medium text-gray-100 mb-2">Privacy policy</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          At Serendipity Yacht, your privacy matters. Here's a clear picture of how we collect,
          use, and protect your personal information when you visit our site.
        </p>
      </div>

      <hr className="border-white/10 my-8" />

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-base font-medium text-gray-200 mb-3">
          <span className="text-gray-400"></span> Information we collect
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          We may collect personal details such as your name, email address, and phone number —
          typically when you reach out via our contact forms or submit a booking inquiry.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-base font-medium text-gray-200 mb-3">
          <span className="text-gray-400"></span> How we use your information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {[
            { icon: "", label: "Respond to inquiries and booking requests" },
            { icon: "", label: "Improve your website experience" },
            { icon: "", label: "Send updates or promos (if opted in)" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-3">
              <span>{icon}</span>
              <span className="text-sm text-gray-400 leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-base font-medium text-gray-200 mb-3">
          <span className="text-gray-400"></span> Data protection
        </h2>
        <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-gray-400 text-lg mt-0.5"></span>
          <p className="text-sm text-gray-400 leading-relaxed">
            We implement appropriate security measures to protect your data from unauthorized
            access, alteration, or disclosure. Your information is handled with care and never
            sold to third parties.
          </p>
        </div>
      </section>

      <hr className="border-white/10 my-8" />

      <section>
        <h2 className="flex items-center gap-2 text-base font-medium text-gray-200 mb-3">
          <span className="text-gray-400"></span> Questions?
        </h2>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-gray-400 text-lg"></span>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Reach us at</p>
            <p className="text-sm font-medium text-gray-200">info@serendipityyacht.net</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Privacy;