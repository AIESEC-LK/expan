import React from "react";
import { Sheet, Table, Button } from "@mui/joy";

const MainTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const rows = props.tableContent.map((element) => (
    <tr key={element.id}>
      <th scope="row">{element.igName}</th>
      <td>{element.apl.GV}</td>
      <td>{element.apl.GTa}</td>
      <td>{element.apl.GTe}</td>
      <td>{element.apl.total}</td>
      <td>{element.apd.GV}</td>
      <td>{element.apd.GTa}</td>
      <td>{element.apd.GTe}</td>
      <td>{element.apd.total}</td>
      <td>{element.re.GV}</td>
      <td>{element.re.GTa}</td>
      <td>{element.re.GTe}</td>
      <td>{element.re.total}</td>
    </tr>
  ));

  const downloadCSV = () => {
    const headers = [
      "Entity",
      "Applications GV",
      "Applications GTa",
      "Applications GTe",
      "Applications Total",
      "Approvals GV",
      "Approvals GTa",
      "Approvals GTe",
      "Approvals Total",
      "Realizations GV",
      "Realizations GTa",
      "Realizations GTe",
      "Realizations Total",
    ];

    const csvRows = [
      headers.join(","), // Join headers with a comma
      ...props.tableContent.map((element) =>
        [
          element.igName,
          element.apl.GV,
          element.apl.GTa,
          element.apl.GTe,
          element.apl.total,
          element.apd.GV,
          element.apd.GTa,
          element.apd.GTe,
          element.apd.total,
          element.re.GV,
          element.re.GTa,
          element.re.GTe,
          element.re.total,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    // Create a blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Sheet
      variant="plain"
      invertedColors
      sx={{
        pt: 1,
        borderRadius: "sm",
        transition: "0.3s",
      }}
    >
      <Button onClick={downloadCSV} sx={{ mb: 2 }}>
        Download as CSV
      </Button>
      <Table borderAxis="both" variant="soft" size="md">
        <thead>
          <tr>
            <th style={{ width: "8%" }} rowSpan={2}>
              Entity
            </th>
            <th colSpan={4} style={{ textAlign: "center" }}>
              Applications
            </th>
            <th colSpan={4} style={{ textAlign: "center" }}>
              Approvals
            </th>
            <th colSpan={4} style={{ textAlign: "center" }}>
              Realizations
            </th>
          </tr>
          <tr>
            <th>GV</th>
            <th style={{ borderRightWidth: 0 }}>GTa</th>
            <th style={{ borderRightWidth: 0 }}>GTe</th>
            <th style={{ borderRightWidth: 0 }}>Total</th>
            <th>GV</th>
            <th style={{ borderRightWidth: 0 }}>GTa</th>
            <th style={{ borderRightWidth: 0 }}>GTe</th>
            <th style={{ borderRightWidth: 0 }}>Total</th>
            <th>GV</th>
            <th style={{ borderRightWidth: 0 }}>GTa</th>
            <th style={{ borderRightWidth: 0 }}>GTe</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Sheet>
  );
};

export default MainTable;
