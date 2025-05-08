import React from 'react';
import styles from './ContainerCard.module.css';

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const ContainerCard: React.FC<Props> = ({ title, description, children }) => (
  <div className={styles.card}>
    {title && <h2>{title}</h2>}
    {description && <p>{description}</p>}
    {children}
  </div>
);

export default ContainerCard;