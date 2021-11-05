import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Box from "@mui/material/Box";

import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { AuthContext } from "../../Context/context";

export default function Home() {
  const { NumeroDaPergunta } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.ProjectWa}>Project-Wa</div>
      </header>
      <main className={styles.main}>
        <div className={styles.perguntas}>
          Deseja Responder {NumeroDaPergunta.num} Perguntas ?
        </div>
        <div className={styles.ButtonCancelStart}>
          <Link href="/">
            <Button variant="contained">Cancel</Button>
          </Link>
          <Link href={{ pathname: "/telaDePerguntas" }}>
            <Button variant="contained">Start</Button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
