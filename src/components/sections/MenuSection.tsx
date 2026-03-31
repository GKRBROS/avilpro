"use client";

import styles from "./MenuSection.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const MENU_ITEMS = [
  { 
    name: "Lotus Biscoff Delight", 
    desc: "Speculoos cream blend with caramelized biscuit crunch.",
    image: "/menu-biscoff.png", 
    color: "#FBE106" 
  },
  { 
    name: "Signature Avil Special", 
    desc: "The original legendary blend with roasted golden rice flakes.",
    image: "/signature-drink.png", 
    color: "#97E33C" 
  },
  { 
    name: "Dry Nut Fusion", 
    desc: "A rich mix of premium cashews, almonds, and artisan milk.",
    image: "/artisan-ingredients.png", 
    color: "#FFFFFF" 
  },
  { 
    name: "Fruit Boutique", 
    desc: "Seasonal fresh fruits blended with our secret creamy heritage.",
    image: "/signature-drink.png", 
    color: "#FBE106" 
  },
  { 
    name: "Lebanese Kunafa", 
    desc: "Middle-eastern inspired blend with crunchy vermicelli.",
    image: "/menu-biscoff.png", 
    color: "#97E33C" 
  },
  { 
    name: "Classic Avil Pro", 
    desc: "The timeless taste that started it all.",
    image: "/artisan-ingredients.png", 
    color: "#FFFFFF" 
  }
];

export default function MenuSection() {
  return (
    <section id="menu" className={styles.menu}>
      <div className="container">
        <div className={styles.header}>
           <motion.span 
             className={styles.eyebrow}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              OUR PALETTE
           </motion.span>
           <h2 className={styles.title}>The Flavour Boutique</h2>
        </div>

        <div className={styles.grid}>
          {MENU_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.name + idx}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -15, transition: { duration: 0.3, ease: "easeOut" } }}
            >
               <div className={styles.imageBox}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className={styles.img}
                  />
                  <div className={styles.overlay} style={{ backgroundColor: item.color + "99" }}>
                     <p>{item.desc}</p>
                  </div>
               </div>
               <div className={styles.info}>
                  <h3>{item.name}</h3>
                  <div className={styles.accent} style={{ backgroundColor: item.color }}></div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
