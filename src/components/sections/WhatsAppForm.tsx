"use client";

import { useState } from "react";
import styles from "./WhatsAppForm.module.css";
import { motion } from "framer-motion";

export default function WhatsAppForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit number.";
    if (!form.message.trim()) newErrors.message = "Please enter a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const whatsappUrl = `https://wa.me/919497711171?text=${encodeURIComponent(
        `Hello Avilpro! 👋\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="contact-form" className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.info}>
            <h2 className={styles.title}>Get in <br /><span className="stroke-text">Touch.</span></h2>
            <p className={styles.desc}>We're here to help you experience the legendary Avil Milk.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
               <input 
                 type="text" 
                 placeholder="Full Name" 
                 className={errors.name ? styles.errorInput : ""}
                 value={form.name}
                 onChange={(e) => setForm({ ...form, name: e.target.value })}
               />
               {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
               <input 
                 type="tel" 
                 placeholder="Phone Number (10 digits)" 
                 className={errors.phone ? styles.errorInput : ""}
                 value={form.phone}
                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
               />
               {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>

            <div className={styles.inputGroup}>
               <textarea 
                 placeholder="How can we help you?" 
                 rows={4}
                 className={errors.message ? styles.errorInput : ""}
                 value={form.message}
                 onChange={(e) => setForm({ ...form, message: e.target.value })}
               />
               {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>

            <motion.button 
              className="btn-boutique" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
               Contact Us
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
