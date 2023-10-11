import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.socialMedia}>
        <hr className={styles.line} />
        <div className={styles.socialIcon}>
          <img src="/img/instagram.svg" alt="instagram" />
        </div>
        <div className={styles.socialIcon}>
          <img src="/img/github.svg" alt="github" />
        </div>
        <div className={styles.socialIcon}>
          <img src="/img/linkedIn.svg" alt="linkedIn" />
        </div>
        <div className={styles.socialIcon}>
          <img src="/img/gmail.svg" alt="gmail" />
        </div>
        <hr className={styles.line} />
      </div>
      <div className={styles.footerContent}>
        <p className={styles.text}>
          Riveros Diego®. Todos los derechos reservados 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
