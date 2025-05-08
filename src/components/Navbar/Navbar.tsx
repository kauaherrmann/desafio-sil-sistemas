import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo-sil-sistemas.svg';

const Navbar: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <button className={styles.menuButton} onClick={() => alert('Abrir menu lateral')}>
        <div className={styles.menuLine} />
        <div className={styles.menuLine} />
        <div className={styles.menuLine} />
      </button>

      <img src={logo} alt="Logo" className={styles.logoSvg} />
    </header>
  );
};

export default Navbar;