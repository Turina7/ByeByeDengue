"use client";

import React from "react";
import styles from "./footer.module.css"; 
import Image from "next/image"; 
import logo from "@/app/images/Logo-2.png";
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; 
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link href="/about">
        <Image
          src={logo}
          alt="Logo"
          className={styles.logo}
        />
        </Link>
        <div className={styles.contact}>
          <h2>Contato</h2>
          <ul>
            <li><a>Telefone: +55 11 3091-5583</a></li>
            <li><a href="mailto: pcs.secretaria.poli@usp.br">Email</a></li>
          </ul>
          <h5>Departamento de Computação da EPUSP</h5>
        </div>
        <div className={styles.faq}>
          <h2>Onde estamos?</h2>
          <ul>
            <li><a href="https://www.poli.usp.br/">Prédio de Engenharia Elétrica - EPUSP</a></li>
            <li><a href="https://www.google.com/maps/place/CEE+-+Centro+de+Engenharia+El%C3%A9trica+da+Poli-USP/@-23.5563143,-46.7325956,18z/data=!4m10!1m2!2m1!1spredio+de+engenharia+eletrica+poli+usp!3m6!1s0x94ce5615e6d6120f:0xc3a5e609459c3a6f!8m2!3d-23.5577092!4d-46.7296751!15sCiZwcmVkaW8gZGUgZW5nZW5oYXJpYSBlbGV0cmljYSBwb2xpIHVzcCIDiAEBkgEVdW5pdmVyc2l0eV9kZXBhcnRtZW504AEA!16s%2Fg%2F12hkc6f8k?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D">Av. Prof. Luciano Gualberto, 158 - Butantã, São Paulo - SP, 05508-010</a></li>
          </ul>
        </div>
        <div className={styles.faq}>
          <h2>Dúvidas Frequentes</h2>
          <ul>
            <li><a href="/about">Nossos Objetivos</a></li>
            <li><a href="/feedback">Como ajudar?</a></li>
            <li><a href="mailto:ssouza@usp.br?subject=Bye-Bye-Dengue&body=Bom%20dia%20professora,%20vi%20o%20projeto%20Bye-Bye-Dengue%20e%20acredito%20que%20tenho%20a%20contribuir%20como%20usuario%20verificado%20por%20motivo%20de...">Quero ser verificado</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://www.facebook.com/politecnicausp/?locale=pt_BR"><FaFacebookF /></a>
        <a href="https://www.linkedin.com/school/escola-polit%C3%A9cnica-da-usp/posts/?feedView=allhttps://linkedin.com/in/your_linkedin"><FaLinkedin /></a>
        <a href="https://www.youtube.com/@poliusp"><FaYoutube /></a>
        <a href="https://www.instagram.com/poliusp/"><FaInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
