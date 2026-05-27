import React from "react";

const Terms = () => {
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
        <h1 className="text-2xl font-medium text-gray-100 mb-2">Terms &amp; conditions</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          By accessing or using the Serendipity Yacht website, you agree to be bound by the
          terms outlined below. Please read them carefully.
        </p>
      </div>

      <hr className="border-white/10 my-8" />

      {[
        {
          title: "Use of website",
          body: "You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the site.",
          calloutIcon: "",
        },
        {
          title: "Bookings & inquiries",
          body: "All yacht availability, pricing, and services are subject to change without prior notice. Bookings are only confirmed upon receiving official confirmation from our team.",
          calloutIcon: "",
        },
        {
          icon: "©️",
          title: "Intellectual property",
          body: "All content, images, and branding on this site are owned by Serendipity Yacht and may not be copied, reproduced, or reused without prior written permission.",
          calloutIcon: "",
        },
        {
          title: "Limitation of liability",
          body: "Serendipity Yacht is not liable for any direct or indirect damages arising from the use of, or inability to use, this website or its content.",
          calloutIcon: "",
        },
      ].map(({ icon, title, body, calloutIcon }) => (
        <section key={title} className="mb-8">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-200 mb-3">
            <span className="text-gray-400">{icon}</span> {title}
          </h2>
          <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <span className="text-gray-400 text-lg mt-0.5">{calloutIcon}</span>
            <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
          </div>
        </section>
      ))}

    </div>
  );
};

export default Terms;