import { Paper, Table, TableContainer } from "@mui/material";
import React, { useState } from "react";

import useFetchData from "@/utils/fetchData";
import sortData from "@/utils/sortData";
import { Order } from "@/utils/type";
import OrderDetails from "@/Components/OrderDetails/OrderDetails";
import CustomTableBody from "@/Components/TableBody";
import TableHeader from "@/Components/TableHead";
import "./Table.css";

const CustomTable: React.FC = () => {
  const Asc = "asc";
  const Desc = "desc";
 
  const [payment, setPayment] = useState<string>("");
  const [fulfilment, setFulfilment] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [orderBy, setOrderBy] = useState<keyof Order>("order_id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updatedTable, setUpdatedTable] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  let existingUrl = `orders/getorders?page=${currentPage}&`

  const checkUrl = (existingUrl: string) => {
    if (payment) {
      existingUrl += `paymentStatus=${payment}&`;
      //console.log(url);
    }
    if (fulfilment) {
      existingUrl += `fulfilment=${fulfilment}&`;
    }
    if (startDate && endDate) {
      existingUrl += `startDate=${startDate}&endDate=${endDate}&`;
    }

    return existingUrl;
  };

  const handlePaymentStatusChange = (status: string): void => {
    setPayment(status);
  };
  const ordersData = useFetchData(checkUrl(existingUrl),[
    payment,
      fulfilment,
      startDate,
      endDate,
      orderBy,
      order,
      currentPage,
      updatedTable,
      selectedOrder,
  ])

  const handleFulfilmentChange = (status: string): void => {
    setFulfilment(status);
  };

  const handleDateRangeChange = (start: string, end: string): void => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Order
  ) => {
    const isAsc = orderBy === property && order === Asc; 
    setOrder(isAsc ? Desc : Asc);
    setOrderBy(property);
  };

  const sortedData = sortData(ordersData, orderBy, order)
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleUpdatedTable = () => {
    setUpdatedTable(updatedTable + 1);
  };

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };
  const handlecloseOrderDetails = () => {
    setSelectedOrder(null);
  };
  return (
    <>
      {selectedOrder ? (
        <OrderDetails
          orderId={selectedOrder.order_id}
          closeOrderDetails={handlecloseOrderDetails}
        />
      ) : (
        <TableContainer component={Paper} className="table-container">
          <Table className="table" aria-label="customized table">
            <TableHeader
              payment={payment}
              fulfilment={fulfilment}
              onPaymentStatusChange={handlePaymentStatusChange}
              onFulfilmentChange={handleFulfilmentChange}
              onDateRangeChange={handleDateRangeChange}
              onRequestSort={handleRequestSort}
              orderBy={orderBy}
              order={order}
            />
            <CustomTableBody
              data={sortedData}
              handleUpdatedTable={handleUpdatedTable}
              onRowClick={handleRowClick}
            />
          </Table>
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </TableContainer>
      )}
    </>
  );
};

export default CustomTable;
