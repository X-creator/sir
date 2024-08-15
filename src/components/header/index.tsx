import { Search } from "components/search";
import styles from "./header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <Search />
  </header>
);
