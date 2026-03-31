"use client";

import styles from "./FranchiseSection.module.css";
import { motion } from "framer-motion";

export default function FranchiseSection() {
  return (
    <section id="franchise" className={styles.franchise}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 31 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Partner for <br />
              <span className="stroke-text">Consistency & Innovation.</span>
            </motion.h2>
            <p className={styles.desc}>
              Join the official Avilpro heritage. Our Semi-FOCO model ensures 
              authentic taste and uncompromising quality across all premium outlets.
            </p>
          </div>
          
          <div className={styles.right}>
             <motion.div 
               className={styles.formCard}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
             >
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                   <div className={styles.row}>
                      <input type="text" placeholder="Full Name" />
                      <input type="email" placeholder="Email" />
                   </div>
                   <input type="tel" placeholder="Mobile Number" />
                   <textarea placeholder="Message" rows={3}></textarea>
                   <button className="btn-boutique" style={{ width: '100%', justifyContent: 'center' }}>Submit Interest</button>
                </form>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
