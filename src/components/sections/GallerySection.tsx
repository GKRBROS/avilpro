"use client";

import styles from "./GallerySection.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const GALLERY_IMAGES = [
  { src: "/boutique-exterior.png", alt: "Avilpro Flagship Boutique", size: "large" },
  { src: "/artisan-ingredients.png", alt: "Signature Ingredients", size: "tall" },
  { src: "/signature-drink.png", alt: "Original Avil Special", size: "small" },
  { src: "/hero-drink.png", alt: "Creamy Heritage Blend", size: "wide" }
];

export default function GallerySection() {
  const { scrollYProgress } = useScroll();
  const xLeft = useTransform(scrollYProgress, [0.3, 0.6], [0, -100]);
  const xRight = useTransform(scrollYProgress, [0.3, 0.6], [0, 100]);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <div className={styles.header}>
           <motion.h2 
             className={styles.title}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              A Visual <br />
              <span className="stroke-text">Palette.</span>
           </motion.h2>
           <p className={styles.subtitle}>Every blend is a masterpiece of taste and texture.</p>
        </div>

        <div className={styles.mosaic}>
           {GALLERY_IMAGES.map((img, i) => (
             <motion.div 
               key={img.src}
               className={`${styles.imageWrapper} ${styles[img.size]}`}
               style={{ 
                 x: i % 2 === 0 ? xLeft : xRight,
               }}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: i * 0.1 }}
             >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  width={800} 
                  height={1000} 
                  className={styles.img}
                />
                <div className={styles.overlay}>
                   <span>{img.alt}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
