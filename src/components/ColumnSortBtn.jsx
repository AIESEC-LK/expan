import React from 'react'
import { TiArrowUnsorted } from "react-icons/ti";
const ColumnSortBtn = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' , width: '2px'}} // Added pointer cursor for clarity
    >
      <TiArrowUnsorted />
    </div>
  )
}

export default ColumnSortBtn