import { FormEvent, useRef } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useAppDispatch } from "store/hooks.ts";
import { search } from "store/github-api-controls.ts";
import styles from "./search.module.scss";

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (value) dispatch(search(value));
  };

  return (
    <Box className={styles.search} component="form" onSubmit={onSubmit}>
      <Box className={styles.container}>
        <OutlinedInput
          className={styles.input}
          inputRef={inputRef}
          placeholder="Введите поисковый запрос"
          fullWidth
        />
      </Box>
      <Button className={styles.button} variant="contained" type="submit">
        Искать
      </Button>
    </Box>
  );
};
