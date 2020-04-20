import React from "react";
import PaginationControls from "../PaginationControls/PaginationConrols";

import "./Table.css";

function Table({ title, pages, currentPage, onPageChange, children }) {
  return (
    <section className="Table">
      <h3>{title}</h3>
      <table>{children}</table>
      <PaginationControls
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}

Table.Head = ({ children }) => {
  return <thead>{children}</thead>;
};

Table.HeadCell = ({ style, children }) => {
  return <th style={style}>{children}</th>;
};

Table.Body = ({ children }) => {
  return <tbody>{children}</tbody>;
};

Table.Row = ({ children }) => {
  return <tr>{children}</tr>;
};

Table.Cell = ({ style, children }) => {
  return <td style={style}>{children}</td>;
};

export default Table;
