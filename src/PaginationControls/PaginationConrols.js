import React from "react";
import "./PaginationControls.css";

function PaginationControls({
  pages = 1,
  numOfButtons = 5,
  currentPage = 1,
  onPageChange = () => {},
  style,
}) {
  if (pages <= 1) {
    return null;
  }

  const buttons = [];

  const { startingIdx, endingIdx } = getStartAndEndIndex(
    numOfButtons,
    currentPage,
    pages
  );

  for (let i = startingIdx; i <= endingIdx; i++) {
    buttons.push(
      <button
        className={currentPage === i ? "active" : ""}
        onClick={() => onPageChange(i)}
        key={`Page-Btn-${i}`}
        disabled={currentPage === i}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={style} className="PaginationControls">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {buttons}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages}
      >
        {">"}
      </button>
    </div>
  );
}

function getStartAndEndIndex(numOfButtons, currentPage, pages) {
  numOfButtons--;

  let toLeft = Math.floor(numOfButtons / 2);
  let startingIdx = Math.max(currentPage - toLeft, 1);
  let endingIdx = Math.min(pages, startingIdx + numOfButtons);

  startingIdx = Math.min(startingIdx, endingIdx - numOfButtons);
  startingIdx = Math.max(startingIdx, 1);

  return { startingIdx, endingIdx };
}

export default PaginationControls;
