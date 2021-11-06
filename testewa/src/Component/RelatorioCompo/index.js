import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import stylesTela from "./TelaPerguntas.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";

function RelatorioCompo({ Question, QuantAcertos }) {
  return (
    <div>
      <TableContainer component={Paper} className={stylesTela.Table}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={stylesTela.HeaderTable}>
                Voce acertou {QuantAcertos} e errou{" "}
                {Question?.results?.length - QuantAcertos}
              </TableCell>
              <TableCell className={stylesTela.HeaderTable} align="left">
                Resposta Escolhida
              </TableCell>
              <TableCell className={stylesTela.HeaderTable} align="left">
                Resposta Correta
              </TableCell>
              <TableCell className={stylesTela.HeaderTable} align="left">
                Acertou?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Question?.results?.map((perg, k) => (
              <TableRow
                key={k}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={stylesTela.CorpoTable}
                >
                  {perg.question}
                </TableCell>
                <TableCell className={stylesTela.CorpoTable} align="right">
                  {perg.escolhido}
                </TableCell>
                <TableCell className={stylesTela.CorpoTable} align="right">
                  {perg.correct_answer}
                </TableCell>
                <TableCell className={stylesTela.CorpoTable} align="right">
                  {perg.Acerto === true ? " sim" : " não"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className={stylesTela.FooterTable} colSpan={3}>
                <p style={{ color: "red" }}> Total </p>
              </TableCell>
              <TableCell className={stylesTela.FooterTable} align="right">
                {QuantAcertos * 10}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Link href={{ pathname: "/" }}>
          <Button className={stylesTela.Table} variant="contained">
            Voltar
          </Button>
        </Link>
      </TableContainer>
    </div>
  );
}

export default RelatorioCompo;
