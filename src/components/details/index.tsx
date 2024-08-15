import styles from "./details.module.scss";

interface DetailsProps {
  title?: string;
  description?: string;
  licenseInfo?: string;
}

export const Details = ({ title, description, licenseInfo }: DetailsProps) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}
    {description && <p className={styles.description}>{description}</p>}
    {licenseInfo && <p className={styles.licenseInfo}>{licenseInfo}</p>}
  </>
);
