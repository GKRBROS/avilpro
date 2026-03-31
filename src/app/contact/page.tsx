"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppForm from "@/components/sections/WhatsAppForm";
import StoreSection from "@/components/sections/StoreSection";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.contactPage}>
        <section className={styles.hero}>
          <div className="container">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.title}
            >
              Contact <span className="stroke-text">Us.</span>
            </motion.h1>
            <p className={styles.subtitle}>Our doors are open, and our milk is creamy. Visit or reach out.</p>
          </div>
        </section>

        <StoreSection />
        <WhatsAppForm />

        <section className={styles.mapSection}>
          <div className="container">
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.84!2d76.0243!3d10.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795!2sAvil%20Pro!5e0!3m2!1sen!2sin!4v1711900000000!5m2!1sen!2sin"
                title="Avilpro store location map"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "30px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
