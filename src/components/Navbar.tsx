"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          <Link href="/#menu">Our Menu</Link>
          <Link href="/about">Story</Link>
          <Link href="/#gallery">Gallery</Link>
        </div>

        <Link href="/" className={styles.logoWrapper}>
          <Image 
            src="/avil-pro-removebg-preview.png" 
            alt="Avilpro Logo" 
            width={120} 
            height={60} 
            className={styles.logo}
            priority
          />
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/contact" className={styles.cta}>Contact Us</Link>
          <div className={styles.socials}>
             <a href="https://instagram.com/avilpro_official" target="_blank" rel="noopener noreferrer" aria-label="Avilpro on Instagram">
               <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
               </svg>
             </a>
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Avilpro on Facebook">
               <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
               </svg>
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
