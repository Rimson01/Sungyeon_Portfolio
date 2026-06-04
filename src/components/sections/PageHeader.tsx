import styles from './PageHeader.module.css';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
