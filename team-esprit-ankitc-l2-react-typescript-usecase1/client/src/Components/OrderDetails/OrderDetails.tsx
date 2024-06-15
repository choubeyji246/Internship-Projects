import React, { useEffect, useState } from "react";

import "./OrderDetails.css";
import getResponse from "@/utils/GetResponse";
import { OrderDetailsProps } from "@/utils/type";
import { orderId } from "@/utils/type";


const editableFields = [
  "items",
  "payment_status",
  "total",
  "delivery",
  "fulfilment",
];

const OrderDetails: React.FC<orderId> = ({ orderId, closeOrderDetails }) => {
  const [orderData, setOrderData] = useState<OrderDetailsProps | null>(null);
  const [onEdit, setOnEdit] = useState<Boolean>(false);

  useEffect(() => {
    fetchOrderData(orderId);
  }, [orderId]);

  const fetchOrderData = async (orderId: string) => {
    try {
      const url = `orders/getorderdetails/?orderId=${orderId}`;
      const result: any = await getResponse("GET", url);
      setOrderData(result.data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldUpdate = async (columnName: string, newValue: string) => {
    try {
      const url = `orders/updateorder/?orderId=${orderId}`;
      await getResponse("PATCH", url, {
        columnName: columnName,
        columnValue: newValue,
      });
      fetchOrderData(orderId);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrderData = () => {
    if (!orderData) return null;
    const transformKeyName = (key: string) => {
      return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
  
    return Object.entries(orderData).map(([key, value]) => (
      <div className="order-detail-item" key={key}>
        <span className="order-detail-key">{`${transformKeyName(key)} :`}</span>
        {onEdit && editableFields.includes(key) ? (
          <input
            className="order-detail-input"
            type="text"
            value={value}
            onChange={(e) => handleFieldUpdate(key, e.target.value)}
          />
        ) : (
          <span className="order-detail-value">
            {key === "date" ? value.slice(0, 10) : value}
          </span>
        )}
        {!onEdit && editableFields.includes(key) && (
          <button className="edit-button" onClick={() => setOnEdit(true)}>
            Edit
          </button>
        )}
      </div>
    ));
  };
  return (
    <div className="order-details-card">
      <div className="order-details-header">
        <h2 className="order-details-heading">Order Details</h2>
        <button className="close-button" onClick={closeOrderDetails}>
          Close
        </button>
      </div>
      <div className="order-details-content">{renderOrderData()}</div>
    </div>
  );
};

export default OrderDetails;
