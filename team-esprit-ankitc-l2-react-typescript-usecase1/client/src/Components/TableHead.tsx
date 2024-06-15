import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

import DateRangeFilter from "@/Components/AtomComponents/DateRangeFilter";
import Dropdown from "@/Components/AtomComponents/Dropdown/Dropdown";
import { TableHeadProps } from "@/utils/type";
import { Order } from "@/utils/type";


const TableHeader: React.FC<TableHeadProps> = ({
  payment,
  fulfilment,
  onPaymentStatusChange,
  onFulfilmentChange,
  onDateRangeChange,
  onRequestSort,
  orderBy,
  order,
}) => {
  const createSortHandler = (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof Order
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Order ID</TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "order_date"}
            direction={order}
            onClick={(event) => createSortHandler(event, "order_date")}
          >
            Order Date
          </TableSortLabel>
          <DateRangeFilter onChange={onDateRangeChange} />
        </TableCell>
        <TableCell>Customer Name</TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "payment_status"}
            direction={order}
            onClick={(event) => createSortHandler(event, "payment_status")}
          >
            Payment Status
          </TableSortLabel>
          <Dropdown
            options={["Success", "Pending"]}
            selectedOption={payment}
            onSelect={onPaymentStatusChange}
          />
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "total"}
            direction={order}
            onClick={(event) => createSortHandler(event, "total")}
          >
            Total
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "delivery"}
            direction={order}
            onClick={(event) => createSortHandler(event, "delivery")}
          >
            Delivery
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "items"}
            direction={order}
            onClick={(event) => createSortHandler(event, "items")}
          >
            Items
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "fulfilment"}
            direction={order}
            onClick={(event) => createSortHandler(event, "fulfilment")}
          >
            Fulfilment
          </TableSortLabel>
          <Dropdown
            options={["Fulfilled", "Unfulfilled"]}
            selectedOption={fulfilment}
            onSelect={onFulfilmentChange}
          />
        </TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
