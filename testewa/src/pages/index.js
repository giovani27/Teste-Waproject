import Head from "next/head";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { AuthContext } from "../Context/context";

export default function Home() {
  const [PerguntasQuant, setPerguntasQuant] = useState();
  const [Storage, setStorage] = useState();

  const { NumeroDaPergunta, setNumeroDaPergunta } = useContext(AuthContext);

  console.log(PerguntasQuant);

  useEffect(() => {
    var StorageQuerion = JSON.parse(localStorage.getItem("Quest"));
    setStorage(StorageQuerion);
  }, []);

  function Clicar() {
    setNumeroDaPergunta({ num: PerguntasQuant });
    localStorage.setItem("user", JSON.stringify(NumeroDaPergunta));
    console.log(NumeroDaPergunta);
  }
  console.log(NumeroDaPergunta);

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
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {Storage == null ? (
            <div>
              <p>Você não tem nenhum relatorio salvo</p>
            </div>
          ) : (
            <div>
              <p>
                Você tem relatorio salvo deseja ver?
                <strong>
                  <Link href="/Relatorio"> clique aqui </Link>
                </strong>
              </p>
            </div>
          )}

          <div className={styles.perguntas}>
            <p> Quantas perguntas deseja responder?</p>
            <TextField
              onChange={(e) => setPerguntasQuant(e.target.value)}
              id={PerguntasQuant}
              label="numero"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Link href={{ pathname: "/tela2" }}>
              <Button variant="contained" onClick={Clicar}>
                Avançar
              </Button>
            </Link>
          </div>
        </Box>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
