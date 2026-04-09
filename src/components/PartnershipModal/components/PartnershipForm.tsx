import { useState } from "react";
import { useModal } from "@/App";

export const PartnershipForm = () => {
  const { closePartnership, openSuccess } = useModal();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.mobile.trim()) nextErrors.mobile = "Mobile is required";
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.mobile))
      nextErrors.mobile = "Enter a valid mobile number";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (!form.city.trim()) nextErrors.city = "City is required";
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closePartnership();
      openSuccess();
    }, 1200);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [key]: event.target.value })),
  });

  return (
    <div className="bg-black p-[21.12px] text-[7.04px] leading-[10.56px] md:p-[30px] md:text-[10px] md:leading-[15px]">
      <h2 className="mb-[14.08px] bg-[linear-gradient(242.22deg,rgb(150,192,255)_39.74%,rgb(215,149,255)_104.92%)] bg-clip-text text-[22.528px] font-bold leading-9 text-transparent md:mb-5 md:text-[32px]">
        Let&#39;s have a Partnership
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="-mx-[5.28px] flex flex-wrap md:-mx-[7.5px]">
          <div className="w-full px-[5.28px] md:w-6/12 md:px-[7.5px]">
            <div className="mt-[7.04px] flex flex-col md:mt-2.5">
              <label className="mb-[7.04px] text-[12.672px] font-medium leading-[19.008px] text-white/80 md:mb-2.5 md:text-[15px] md:leading-[22.5px]">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                {...field("name")}
                className="w-full border-x-0 border-b border-t-0 border-b-stone-300 bg-transparent px-[5.28px] py-[3.52px] text-[12.672px] leading-[15.84px] text-white transition-colors duration-200 focus:border-b-yellow-400 focus:outline-none md:px-[7.5px] md:py-[5px] md:text-base md:leading-5"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="w-full px-[5.28px] md:w-6/12 md:px-[7.5px]">
            <div className="mt-[7.04px] flex flex-col md:mt-2.5">
              <label className="mb-[7.04px] text-[12.672px] font-medium leading-[19.008px] text-white/80 md:mb-2.5 md:text-[15px] md:leading-[22.5px]">
                Mobile
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                {...field("mobile")}
                className="w-full border-x-0 border-b border-t-0 border-b-stone-300 bg-transparent px-[5.28px] py-[3.52px] text-[12.672px] leading-[15.84px] text-white transition-colors duration-200 focus:border-b-yellow-400 focus:outline-none md:px-[7.5px] md:py-[5px] md:text-base md:leading-5"
              />
              {errors.mobile && (
                <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[7.04px] flex flex-col md:mt-2.5">
          <label className="mb-[7.04px] text-[12.672px] font-medium leading-[19.008px] text-white/80 md:mb-2.5 md:text-[15px] md:leading-[22.5px]">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            {...field("email")}
            className="w-full border-x-0 border-b border-t-0 border-b-stone-300 bg-transparent px-[5.28px] py-[3.52px] text-[12.672px] leading-[15.84px] text-white transition-colors duration-200 focus:border-b-yellow-400 focus:outline-none md:px-[7.5px] md:py-[5px] md:text-base md:leading-5"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="mt-[7.04px] flex flex-col md:mt-2.5">
          <label className="mb-[7.04px] text-[12.672px] font-medium leading-[19.008px] text-white/80 md:mb-2.5 md:text-[15px] md:leading-[22.5px]">
            Interested Cities
          </label>
          <input
            type="text"
            placeholder="e.g. Calicut, Dubai"
            {...field("city")}
            className="w-full border-x-0 border-b border-t-0 border-b-stone-300 bg-transparent px-[5.28px] py-[3.52px] text-[12.672px] leading-[15.84px] text-white transition-colors duration-200 focus:border-b-yellow-400 focus:outline-none md:px-[7.5px] md:py-[5px] md:text-base md:leading-5"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-400">{errors.city}</p>
          )}
        </div>

        <div className="mt-[7.04px] flex flex-col md:mt-2.5">
          <label className="mb-[7.04px] text-[12.672px] font-medium leading-[19.008px] text-white/80 md:mb-2.5 md:text-[15px] md:leading-[22.5px]">
            Message
          </label>
          <textarea
            placeholder="Your message"
            {...field("message")}
            className="h-[70.4px] w-full resize-y border-x-0 border-b-2 border-t-0 border-b-stone-300 bg-transparent p-0 text-[11.616px] leading-[17.424px] text-white transition-colors duration-200 focus:border-b-yellow-400 focus:outline-none md:mt-2.5 md:h-[100px] md:text-[16.5px] md:leading-[24.75px]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-[24.64px] rounded-[21.12px] bg-orange-300 px-[17.6px] pb-[2.816px] pt-[7.744px] text-[12.672px] font-medium leading-[19.008px] text-white transition-all duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 md:mt-[35px] md:rounded-[30px] md:px-[25px] md:pb-1 md:pt-[11px] md:text-base md:leading-6"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};
