"use client";

import styles from "./StoreSection.module.css";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const STORES = [
  { name: "Chavakkad (HQ)", phone: "+91 94977 11171", address: "Opp Chavakkad Town Juma Masjid" },
  { name: "Guruvayoor", phone: "+91 94977 11171", address: "Opp Private Bus Stand" },
  { name: "Kochi (Thammanam)", phone: "+91 94977 11171", address: "Thammanam Road" },
  { name: "Attupuram", phone: "+91 94977 11171", address: "St Antony Church Building" },
  { name: "Eramangalam", phone: "+91 94977 11171", address: "Eramangalam Centre" },
  { name: "Pavaratty", phone: "+91 94977 11171", address: "Pavaratty Town" }
];

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
           <h2 className={styles.title}>Locate <br /><span className="stroke-text">Experience.</span></h2>
        </div>

        <div className={styles.grid}>
          {STORES.map((store, idx) => (
            <motion.div 
              key={store.name}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
               <div className={styles.cardBody}>
                  <div className={styles.iconBox}>
                     <MapPin size={24} color="var(--brand-yellow)" />
                  </div>
                  <h3>{store.name}</h3>
                  <p>{store.address}</p>
                  <div className={styles.phoneBox}>
                     <Phone size={14} />
                     <span>{store.phone}</span>
                  </div>
               </div>
               <div className={styles.accentBar}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
