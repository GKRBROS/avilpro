"use client";

import styles from "./GallerySection.module.css";
import { motion } from "framer-motion";
import CircularGallery from "./CircularGallery";

const GALLERY_ITEMS = [
  {
    image: "/boutique-exterior.png",
    text: "Flagship Boutique",
  },
  {
    image: "/artisan-ingredients.png",
    text: "Signature Ingredients",
  },
  {
    image: "/signature-drink.png",
    text: "Original Avil Special",
  },
  {
    image: "/hero-drink.png",
    text: "Creamy Heritage Blend",
  },
  {
    image: "/boutique-exterior.png",
    text: "Evening Ambience",
  },
  {
    image: "/signature-drink.png",
    text: "Craft Heritage",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className={styles.gallery}>
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
        <p className={styles.subtitle}>
          Every blend is a masterpiece of taste and texture.
        </p>
      </div>

      <div className={styles.circularWrap}>
        <div className={styles.galleryViewport}>
          <CircularGallery
            items={GALLERY_ITEMS}
            textColor="#ffffff"
            bend={-4}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </section>
  );
}
