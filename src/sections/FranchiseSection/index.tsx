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
    <section className="relative overflow-hidden bg-gradient-to-b from-green-800 to-green-900 leading-[10.56px] py-[30px] md:py-[60px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,235,59,0.15),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)] opacity-70" />
      <div className="relative max-w-none w-full z-[3] mx-auto px-4 md:max-w-[1400px] lg:px-8">
        <div className="flex flex-col justify-center items-center gap-y-12">
          
          <div
            ref={titleRef}
            className={`max-w-3xl text-center transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          >
            <h1 className="text-yellow-400 text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 drop-shadow-md">
              Contact Avilpro
            </h1>
            <p className="text-green-50 text-base md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
              Thrissur&apos;s favourite premium Avil Milk brand — get in touch for franchise and customer enquiries.
            </p>
          </div>

          <div
            ref={cardsRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 w-full transition-all duration-700 delay-200 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
          >
            {/* Contact Details Card */}
            <div className="relative backdrop-blur-xl bg-white/5 shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-white/10 overflow-hidden p-8 rounded-[32px] flex flex-col justify-between">
              <div>
                <h3 className="text-yellow-400 text-xl font-bold tracking-wider uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-yellow-400/50"></span>
                  Contact Info
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Phone", value: "+91 9497711171", full: false },
                    { label: "Email", value: "avilpro.official@gmail.com", full: false },
                    { label: "Location", value: "Avilpro Premium Avil Milk Shope, Chavakkad PO, Thrissur, Kerala", full: true },
                    { label: "Opening Hours", value: "Chavakkad: 10am–1am  •  Guruvayoor: 10am–1am  •  Attupurram: 10am–11pm", full: true },
                  ].map((item) => (
                    <div key={item.label} className={`text-white text-sm leading-relaxed flex flex-col items-start bg-black/10 p-4 rounded-2xl border border-white/5 ${item.full ? 'sm:col-span-2' : ''}`}>
                      <strong className="text-yellow-400 font-bold uppercase text-xs tracking-wider mb-1">{item.label}</strong>
                      <span className="opacity-90">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Avilpro%20Premium%20Avil%20Milk%20Shope%20Chavakkad"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 px-6 py-4 text-[15px] font-bold uppercase tracking-widest text-yellow-400 transition-all duration-300 hover:bg-yellow-400 hover:text-green-900"
                >
                  View on Map
                </a>
              </div>
            </div>

            {/* Send Enquiry Form */}
            <div className="relative backdrop-blur-xl bg-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden p-8 md:p-10 rounded-[32px]">
              <h4 className="text-yellow-400 text-xl font-bold tracking-wider uppercase mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-yellow-400/50"></span>
                Send an Enquiry
              </h4>
              <form className="space-y-5 text-white" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full rounded-2xl border-2 border-white/10 bg-black/20 px-5 py-4 text-sm md:text-base outline-none placeholder:text-white/40 focus:border-yellow-400 focus:bg-black/40 transition-all"
                    required
                  />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="Phone Number"
                    className="w-full rounded-2xl border-2 border-white/10 bg-black/20 px-5 py-4 text-sm md:text-base outline-none placeholder:text-white/40 focus:border-yellow-400 focus:bg-black/40 transition-all"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Email Address"
                    type="email"
                    className="w-full rounded-2xl border-2 border-white/10 bg-black/20 px-5 py-4 text-sm md:text-base outline-none placeholder:text-white/40 focus:border-yellow-400 focus:bg-black/40 transition-all"
                    required
                  />
                  <select
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    className="w-full rounded-2xl border-2 border-white/10 bg-black/20 px-5 py-4 text-sm md:text-base outline-none focus:border-yellow-400 focus:bg-black/40 transition-all text-white appearance-none"
                  >
                    <option className="text-black">Chavakkad</option>
                    <option className="text-black">Guruvayoor</option>
                    <option className="text-black">Attupurram</option>
                  </select>
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help you?"
                  rows={3}
                  className="w-full rounded-2xl border-2 border-white/10 bg-black/20 px-5 py-4 text-sm md:text-base outline-none placeholder:text-white/40 focus:border-yellow-400 focus:bg-black/40 transition-all resize-none"
                  required
                />
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-yellow-400 px-8 py-4 text-[15px] font-black uppercase tracking-widest text-green-900 shadow-[0_8px_20px_rgba(251,255,0,0.3)] transition-all duration-300 hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(251,255,0,0.4)]"
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
