import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./loader.module.scss";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => (
  <Backdrop className={styles.loader} open={isLoading}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
