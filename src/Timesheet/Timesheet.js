import React from "react";
import Table from "../Table/Table";
import database from "../database";

function Timesheet() {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [timecards, setTimecards] = React.useState([]);

  React.useEffect(() => {
    const { hours, pages } = database.hours.getAll(page);
    setTimecards(hours);
    setPages(pages);
  }, [page]);

  return (
    <div>
      <Table
        title="Timesheet"
        pages={pages}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      >
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Employee</Table.HeadCell>
            <Table.HeadCell>Clock In</Table.HeadCell>
            <Table.HeadCell>Clock Out</Table.HeadCell>
            <Table.HeadCell>Hours</Table.HeadCell>
            <Table.HeadCell />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {timecards.map((card) => (
            <Table.Row key={card.id}>
              <Table.Cell>{card.employeeName}</Table.Cell>
              <Table.Cell>
                <DateTimeDisplay date={card.clockInAdj} />
              </Table.Cell>
              <Table.Cell>
                <DateTimeDisplay date={card.clockOutAdj} />
              </Table.Cell>
              <Table.Cell>{card.hours.toFixed(2)}</Table.Cell>
              <Table.Cell style={{ width: "0.1%" }}>
                <button>E</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function DateTimeDisplay({ date }) {
  return (
    <React.Fragment>
      <div
        style={{
          fontSize: ".8rem",
          fontWeight: "bold",
          marginBottom: "2px",
        }}
      >
        {date.toLocaleDateString()}
      </div>
      <div>{formatTime(date)}</div>
    </React.Fragment>
  );
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let timeOfDay = "AM";

  if (hours >= 12) {
    timeOfDay = "PM";
    hours -= 12;
  }

  return `${hours}:${minutes} ${timeOfDay}`;
}

export default Timesheet;
