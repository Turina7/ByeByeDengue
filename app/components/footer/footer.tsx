"use client";

import React from "react";
import styles from "./footer.module.css"; 
import Image from "next/image"; 
import logo from "@/app/images/Logo-2.png";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; 

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Image
              src={logo}
              alt="Logo"
              className={styles.logo}
              layout="intrinsic"
              width={150}
              height={70}
        />
        <div className={styles.contact}>
          <h2>Contato</h2>
          <ul>
            <li><a href="https://wa.me/your_whatsapp_number">WhatsApp</a></li>
            <li><a href="https://www.instagram.com/your_instagram">Instagram</a></li>
            <li><a href="mailto:your_email@example.com">Email</a></li>
          </ul>
        </div>
        <div className={styles.faq}>
          <h2>Você é?</h2>
          <ul>
            <li>Sim</li>
            <li>Não</li>
            <li>Claro</li>
          </ul>
        </div>
        <div className={styles.faq}>
          <h2>Dúvidas Frequentes</h2>
          <ul>
            <li><a href="/objectives">Nossos Objetivos</a></li>
            <li><a href="/how-to-help">Como ajudar?</a></li>
            <li><a href="/feedback">Feedback de Denúncias</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://facebook.com/your_facebook"><FaFacebookF /></a>
        <a href="https://linkedin.com/in/your_linkedin"><FaLinkedin /></a>
        <a href="https://youtube.com/your_youtube"><FaYoutube /></a>
        <a href="https://instagram.com/your_instagram"><FaInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
