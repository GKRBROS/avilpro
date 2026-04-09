import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

export const FranchiseSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "Chavakkad",
    message: "",
  });

  const whatsappNumber = "919497711171";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = [
      "Avilpro Contact Form",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Preferred Location: ${form.location}`,
      `Message: ${form.message}`,
    ].join("%0A");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );

    // Clear form after submitting
    setForm({
      name: "",
      phone: "",
      email: "",
      location: "Chavakkad",
      message: "",
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-850 to-green-950 leading-[10.56px] py-16 md:py-24">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-green-400/10 blur-[100px]" />
      </div>

      <div className="relative max-w-none w-full z-[3] mx-auto px-6 md:max-w-[1300px] lg:px-12">
        <div className="flex flex-col justify-center items-center gap-y-14">

          {/* Heading */}
          <div
            ref={titleRef}
            className={`text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          >
            <p className="text-yellow-400/70 text-sm font-semibold uppercase tracking-[0.25em] mb-3">Get In Touch</p>
            <h1 className="text-yellow-400 text-5xl md:text-7xl font-black uppercase tracking-tight mb-5 drop-shadow-md">
              Contact Avilpro
            </h1>
            <p className="text-green-100/80 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto">
              Thrissur&apos;s favourite premium Avil Milk brand — reach out for franchise opportunities or customer enquiries.
            </p>
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 w-full transition-all duration-700 delay-200 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          >
            {/* Contact Details Card */}
            <div className="relative backdrop-blur-xl bg-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.3)] border border-white/10 p-10 rounded-[40px] flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <h3 className="text-yellow-400 text-2xl font-black tracking-wider uppercase flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-yellow-400/50 rounded-full"></span>
                  Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Phone", value: "+91 9497711171", full: false },
                    { label: "Email", value: "avilpro.official@gmail.com", full: false },
                    { label: "Location", value: "Avilpro Premium Avil Milk Shope, Chavakkad PO, Thrissur, Kerala", full: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`text-white text-[15px] leading-relaxed flex flex-col gap-2 bg-white/10 hover:bg-white/15 transition-colors duration-200 p-5 rounded-3xl border border-white/10 ${item.full ? 'sm:col-span-2' : ''}`}
                    >
                      <strong className="text-yellow-400 font-bold text-xs tracking-[0.18em] uppercase">{item.label}</strong>
                      <span className="text-white/85 text-sm md:text-[15px] leading-relaxed">{item.value}</span>
                    </div>
                  ))}

                  {/* Opening Hours — vertical list */}
                  <div className="sm:col-span-2 flex flex-col gap-2 bg-white/10 hover:bg-white/15 transition-colors duration-200 p-5 rounded-3xl border border-white/10">
                    <strong className="text-yellow-400 font-bold text-xs tracking-[0.18em] uppercase">Opening Hours</strong>
                    <ul className="space-y-1.5 mt-1">
                      {[
                        ["Chavakkad", "10am – 1am"],
                        ["Guruvayoor", "10am – 1am"],
                        ["Attupurram", "10am – 11pm"],
                      ].map(([place, time]) => (
                        <li key={place} className="flex items-center gap-2 text-sm text-white/85">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                          <span className="font-medium text-white">{place}:</span>
                          <span>{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Avilpro%20Premium%20Avil%20Milk%20Shope%20Chavakkad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full justify-center items-center gap-2 rounded-full border-2 border-yellow-400/40 bg-yellow-400/10 px-6 py-4 text-[15px] font-bold uppercase tracking-widest text-yellow-400 transition-all duration-300 hover:bg-yellow-400 hover:text-green-900 hover:border-yellow-400"
              >
                View on Google Maps
              </a>
            </div>

            {/* Send Enquiry Form */}
            <div className="relative backdrop-blur-xl bg-white/5 shadow-[0_32px_64px_rgba(0,0,0,0.3)] border border-white/10 p-10 rounded-[40px]">
              <h4 className="text-yellow-400 text-2xl font-black tracking-wider uppercase mb-8 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-yellow-400/50 rounded-full"></span>
                Send an Enquiry
              </h4>
              <form className="space-y-4 text-white" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider">Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-2xl border-2 border-white/10 px-5 py-4 text-sm md:text-base text-white outline-none placeholder:text-white/30 focus:border-yellow-400 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider">Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-2xl border-2 border-white/10 px-5 py-4 text-sm md:text-base text-white outline-none placeholder:text-white/30 focus:border-yellow-400 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider">Email Address</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="e.g. hello@email.com"
                      type="email"
                      className="w-full rounded-2xl border-2 border-white/10 px-5 py-4 text-sm md:text-base text-white outline-none placeholder:text-white/30 focus:border-yellow-400 transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider">Preferred Location</label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                      className="w-full rounded-2xl border-2 border-white/10 px-5 py-4 text-sm md:text-base outline-none focus:border-yellow-400 transition-all text-white appearance-none"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <option className="text-black">Chavakkad</option>
                      <option className="text-black">Guruvayoor</option>
                      <option className="text-black">Attupurram</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider">Your Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full rounded-2xl border-2 border-white/10 px-5 py-4 text-sm md:text-base text-white outline-none placeholder:text-white/30 focus:border-yellow-400 transition-all resize-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-yellow-400 px-8 py-5 text-[15px] font-black uppercase tracking-widest text-green-900 shadow-[0_8px_20px_rgba(251,255,0,0.3)] transition-all duration-300 hover:bg-yellow-300 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(251,255,0,0.45)] mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
