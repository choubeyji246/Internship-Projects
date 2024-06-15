import { TableBody, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

import getResponse from "@/utils/GetResponse";
import UpdateStatusDialog from "@/Components/AtomComponents/Dialog";
import { TableBodyProps } from "@/utils/type";

const CustomTableBody: React.FC<TableBodyProps> = ({
  data,
  handleUpdatedTable,
  onRowClick,
}) => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [fulfilmentDialogOpen, setFulfilmentDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const openPaymentDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setPaymentDialogOpen(true);
  };

  const openFulfilmentDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setFulfilmentDialogOpen(true);
  };

  const closePaymentDialog = () => {
    setPaymentDialogOpen(false);
    setSelectedOrderId(null);
  };

  const closeFulfilmentDialog = () => {
    setFulfilmentDialogOpen(false);
    setSelectedOrderId(null);
  };

  const handlePaymentStatusUpdate = async (status: string) => {
    // console.log(`Updating payment status of order ${selectedOrderId} to ${status}`);
    try {
      const url = `orders/updateorder/?orderId=${selectedOrderId}`;
      await getResponse("PATCH", url, {
        columnName: "payment_status",
        columnValue: status,
      });
      closePaymentDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFulfilmentStatusUpdate = async (status: string) => {
    // console.log(`Updating fulfilment status of order ${selectedOrderId} to ${status}`);
    try {
      await getResponse(
        "PATCH",
        `orders/updateorder/?orderId=${selectedOrderId}`,
        { columnName: "fulfilment", columnValue: status }
      );
      closePaymentDialog();
    } catch (error) {
      console.log(error);
    }
    closeFulfilmentDialog();
  };

  return (
    <>
      <TableBody>
        {data.map((order, index) => (
          <TableRow key={order.order_id}>
            <TableCell onClick={() => onRowClick(order)}>
              {order.order_id}
            </TableCell>
            <TableCell>{order.order_date.slice(0, 10)}</TableCell>
            <TableCell>{order.customer_name}</TableCell>
            <TableCell>{order.payment_status}</TableCell>
            {/* <TableCell
              style={{
                backgroundColor:
                  order.payment_status === "Success" ? "green" : "red",
                opacity: "0.7",
              }}
            > */}
            <TableCell>{order.total}</TableCell>
            <TableCell>{order.delivery}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.fulfilment}</TableCell>
            <TableCell>
              <div className="svgs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                  onClick={() => openPaymentDialog(order.order_id)}
                >
                  <path
                    fill="currentColor"
                    d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  onClick={() => openFulfilmentDialog(order.order_id)} // Open fulfilment status dialog
                >
                  <path
                    fill="currentColor"
                    d="M2.692 18.616V8.192h1v9.424h14.654v1zm3-3V5.23h15.616v10.385zm2.616-1q0-.667-.475-1.141T6.693 13v1.616zm10.384 0h1.616V13q-.671 0-1.143.475q-.473.474-.473 1.14M13.5 12.424q.846 0 1.423-.577t.577-1.423T14.923 9T13.5 8.423T12.077 9t-.577 1.423t.577 1.423t1.423.577M6.692 7.846q.667 0 1.141-.474q.475-.475.475-1.141H6.692zm13.616 0V6.231h-1.616q0 .671.475 1.143q.474.472 1.14.472"
                  />
                </svg>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <UpdateStatusDialog
        open={paymentDialogOpen}
        onClose={closePaymentDialog}
        onUpdate={handlePaymentStatusUpdate}
        statusType="Payment"
        options={["Success", "Pending"]}
        handleUpdatedTable={handleUpdatedTable}
      />

      <UpdateStatusDialog
        open={fulfilmentDialogOpen}
        onClose={closeFulfilmentDialog}
        onUpdate={handleFulfilmentStatusUpdate}
        statusType="Fulfilment"
        options={["Fulfilled", "Unfulfilled"]}
        handleUpdatedTable={handleUpdatedTable}
      />
    </>
  );
};

export default CustomTableBody;
