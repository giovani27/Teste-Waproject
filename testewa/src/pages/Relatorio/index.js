import Head from "next/head";
import styles from "../../styles/Home.module.css";
import stylesTela from "./Relatorio.module.css";
import Link from "next/link";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import RelatorioCompo from "../../Component/RelatorioCompo";

export default function Home() {
  const [Storage, setStorage] = useState();
  const [QuantAcertos, setQuantAcertos] = useState();

  useEffect(() => {
    var StorageQuerion = JSON.parse(localStorage.getItem("Quest"));
    setStorage(StorageQuerion);
  }, []);

  useEffect(() => {
    const QuantAcertos = Storage?.results?.filter(
      (acertos) => acertos.Acerto === true
    );

    setQuantAcertos(QuantAcertos?.length);
  }, [Storage]);
  console.log(Storage);

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
        <RelatorioCompo Question={Storage} QuantAcertos={QuantAcertos} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
