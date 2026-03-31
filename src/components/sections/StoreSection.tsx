"use client";

import styles from "./StoreSection.module.css";
import { motion } from "framer-motion";

const STORES = [
  { name: "Chavakkad (HQ)", phone: "+91 94977 11171", address: "Opp Chavakkad Town Juma Masjid" },
  { name: "Guruvayoor", phone: "+91 94977 11171", address: "Opp Private Bus Stand" },
  { name: "Kochi (Thammanam)", phone: "+91 94977 11171", address: "Thammanam Road, Kochi" },
  { name: "Attupuram", phone: "+91 94977 11171", address: "St Antony Church Building" },
  { name: "Eramangalam", phone: "+91 94977 11171", address: "Eramangalam Centre, Thrissur" },
  { name: "Pavaratty", phone: "+91 94977 11171", address: "Pavaratty Town, Thrissur" }
];

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function StoreSection() {
  return (
    <section id="stores" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            VISIT OUR BOUTIQUES
          </motion.span>
          <h2 className={styles.title}>
            Find Your <br /><span className="stroke-text">Nearest Outlet.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {STORES.map((store, idx) => (
            <motion.div
              key={store.name}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.cardBody}>
                <div className={styles.iconBox}>
                  <MapPinIcon />
                </div>
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <div className={styles.phoneBox}>
                  <PhoneIcon />
                  <span>{store.phone}</span>
                </div>
              </div>
              <div className={styles.accentBar} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
