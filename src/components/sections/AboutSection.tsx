"use client";

import styles from "./AboutSection.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.visuals}>
            <motion.div
              className={styles.imageCard}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src="/boutique-exterior.png"
                alt="Avilpro store exterior"
                fill
                sizes="(max-width: 992px) 100vw, 40vw"
                className={styles.storeImage}
              />
              <div className={styles.imageOverlay} />
              <div className={styles.badge}>SINCE 2011</div>
              <div className={styles.qualityCircle}>
                <span>100%</span>
                <p>Natural</p>
              </div>
            </motion.div>
          </div>

          <div className={styles.content}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Heritage of <br />
              <span className="stroke-text">Authentic Taste.</span>
            </motion.h2>

            <motion.p
              className={styles.desc}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              At Avilpro, we believe that true taste lies in the purity of
              ingredients. Our journey began with a mission to redefine
              Kerala&apos;s beloved Avil Milk into a premium, high-quality
              experience. Every cup we serve is a blend of crispy, tender poha
              and the creamiest milk.
            </motion.p>

            <div className={styles.values}>
              {[
                "Premium Ingredients",
                "Top-Notch Quality",
                "Heritage Taste",
              ].map((val, i) => (
                <motion.div
                  key={val}
                  className={styles.valueItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className={styles.dot}></span> {val}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
