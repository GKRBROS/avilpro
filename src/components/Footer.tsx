"use client";

import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image 
              src="/avil-pro-removebg-preview.png" 
              alt="Avilpro" 
              width={180} 
              height={90} 
              className={styles.logo}
            />
            <p className={styles.tagline}>Redefining heritage through the art of the blend. AVILPRO — boutique milk, reimagined.</p>
          </div>

          <div className={styles.column}>
            <h3>EXPLORE</h3>
            <div className={styles.linksList}>
              <Link href="/#menu" className={styles.link}>The Palette</Link>
              <Link href="/#about" className={styles.link}>Our Story</Link>
              <Link href="/#gallery" className={styles.link}>Boutique Gallery</Link>
              <Link href="/#contact-form" className={styles.link}>Franchise Enquiry</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h3>VISIT US</h3>
            <div className={styles.contactInfo}>
              <p>Chavakkad, Thrissur</p>
              <p>Kerala, 680506</p>
              <p className={styles.highlight}>+91 94977 11171</p>
            </div>
          </div>

          <div className={styles.column}>
            <h3>SOCIALS</h3>
            <div className={styles.socials}>
               <a href="https://instagram.com/avilpro_official" target="_blank" className={styles.socialIcon}>
                 <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                 </svg>
               </a>
               <a href="https://facebook.com" target="_blank" className={styles.socialIcon}>
                 <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                 </svg>
               </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Avilpro Boutique. Designed by AVILPRO Team.</p>
        </div>
      </div>
    </footer>
  );
}
