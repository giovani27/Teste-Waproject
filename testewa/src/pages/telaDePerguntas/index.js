import Head from "next/head";
import styles from "../../styles/Home.module.css";
import stylesTela from "./TelaPerguntas.module.css";

import axios from "axios";

import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { AuthContext } from "../../Context/context";
import RelatorioCompo from "../../Component/RelatorioCompo/index";

export default function Home() {
  const { NumeroDaPergunta } = useContext(AuthContext);

  const [Question, setQuestion] = useState();
  const [AparecerRelatorio, setAparecerRelatorio] = useState(false);
  const [QuantAcertos, setQuantAcertos] = useState();
  const [AlertaErro, setAlertaErro] = useState(false);

  function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=${NumeroDaPergunta.num}`)
      .then((response) => {
        let res = response.data;
        res.results.map((result) => {
          result.escolhido = "";
          result.Acerto = false;
          result.incorrect_answers.push(result.correct_answer);

          shuffleArray(result.incorrect_answers);
        });
        setQuestion(res);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [NumeroDaPergunta]);

  function VerResultado() {
    const QuantEscolhidos = Question?.results.filter(
      (acertos) => acertos.escolhido !== ""
    );
    Question?.results?.map((quest) => {
      if (QuantEscolhidos.length === Question?.results.length) {
        if (quest.escolhido === quest.correct_answer) {
          quest.Acerto = true;
        }
        const QuantAcertos = Question?.results.filter(
          (acertos) => acertos.Acerto === true
        );

        setQuantAcertos(QuantAcertos.length);
        setAparecerRelatorio(true);
        console.log(Question);
        localStorage.setItem("Quest", JSON.stringify(Question));
      } else {
        setAlertaErro(true);
      }
    });
  }
  function Escolha(e) {}

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
        <div>
          {Question?.results?.map((perg, k) => (
            <div className={stylesTela.perguntas} key={k}>
              <h3 style={{ fontWeight: "bold" }}>{k + 1} Pergunta</h3>
              <p className={stylesTela.pergunta}>{perg.question}</p>
              {perg?.incorrect_answers.map((quest) => (
                <div>
                  <input
                    type="radio"
                    name={k + 1}
                    value={quest}
                    onChange={(e) => (perg.escolhido = e.target.value)}
                  />
                  {quest}
                  <br />
                </div>
              ))}
            </div>
          ))}
          <Button
            className={stylesTela.Table}
            onClick={VerResultado}
            variant="contained"
          >
            Ver Resultato
          </Button>
          {AlertaErro && (
            <div>
              <p style={{ color: "red" }}>Responda Todas Perguntas</p>
            </div>
          )}
        </div>
        <div className={stylesTela.Title}>
          <p>A cada Resposta Correta você ganha 10 pontos</p>
        </div>
        {AparecerRelatorio && (
          <RelatorioCompo Question={Question} QuantAcertos={QuantAcertos} />
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
