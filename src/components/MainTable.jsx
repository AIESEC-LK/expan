import React, {useState} from 'react'
import { Sheet, Table } from "@mui/joy";
import { TiArrowUnsorted } from "react-icons/ti";
import ColumnSortBtn from './ColumnSortBtn'

const TotalRow = (props) => {
  return (
    <tr>
      <th >Total </th>
      {Object.keys(props.totals).map((key) => (
        <td key={key}>{props.totals[key]}</td>
      ))}
    </tr>
  );
};

const MainTable = (props) => {
  const {totals} = props
  const [data, setData] = useState(props.tableContent)
  const [order, setOrder] = useState("ASC");


  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };


  const sorting = (col) => {
    
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => getNestedValue(a, col) - getNestedValue(b, col));
      setData(sorted)
      setOrder("DSC")
      console.log("Sorted ASC:", sorted);
    } 
     if (order === "DSC") {
      const sorted = [...data].sort((a, b) => getNestedValue(b, col) - getNestedValue(a, col));
      setData(sorted)
      setOrder("ASC")
      console.log("Sorted DSC:", sorted);
    }
  };
  
 
  // eslint-disable-next-line react/prop-types
  const rows = data.map((element) => (
    <tr key={element.id}>
      <th scope="row">{element.igName}</th>
      <td>{element.apl.GV} 

      </td>
      <td>{element.apl.GTa} </td>
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
      
      <td>{element.totalByIG}</td>
    </tr>

  ));

 

  // const GVtotals = props.tableContent.reduce(
  //   (acc, element) => {
  //     acc.apdGV += element.apd.GV || 0;
  //     acc.aplGV += element.apl.GV || 0;
  //     acc.reGV += element.re.GV || 0;
  //     return acc;
  //   },
  //   { apdGV: 0, aplGV: 0, reGV: 0 }
  // );
  

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
            <th rowSpan={2} style={{ textAlign: "center" }}>
              Total
             
              <ColumnSortBtn onClick={()=>sorting('totalByIG')} />
            </th>
          </tr>
          <tr>
            <th >GV  <ColumnSortBtn onClick={() => sorting('apl.GV')} /> </th>
            <th style={{ borderRightWidth: 0 }}>GTa <ColumnSortBtn onClick={()=>sorting('apl.GTa')} /></th>
            <th style={{ borderRightWidth: 0 }}>GTe <ColumnSortBtn onClick={()=>sorting('apl.GTe')} /></th>
            <th style={{ borderRightWidth: 0 }}>Total <ColumnSortBtn onClick={()=>sorting('apl.total')} /></th>
            <th>GV <ColumnSortBtn onClick={()=>sorting('apd.GV')} /></th>
            <th style={{ borderRightWidth: 0 }}>GTa <ColumnSortBtn onClick={()=>sorting('apd.GTa')} /></th>
            <th style={{ borderRightWidth: 0 }}>GTe <ColumnSortBtn onClick={()=>sorting('apd.GTe')}/></th>
            <th style={{ borderRightWidth: 0 }}>Total <ColumnSortBtn onClick={()=>sorting('apd.total')}/></th>
            <th>GV <ColumnSortBtn onClick={()=>sorting('re.GV')}/></th>
            <th style={{ borderRightWidth: 0 }}>GTa <ColumnSortBtn onClick={()=>sorting('re.GTa')}/></th>
            <th style={{ borderRightWidth: 0 }}>GTe <ColumnSortBtn onClick={()=>sorting('re.GTe')}/></th>
            <th>Total <ColumnSortBtn onClick={()=>sorting('re.total')}/></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        
        <TotalRow totals={totals} />
       
      </Table>
    </Sheet>
  );
};

export default MainTable;
