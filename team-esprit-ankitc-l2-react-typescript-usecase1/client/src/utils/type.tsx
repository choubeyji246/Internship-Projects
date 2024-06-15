export interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    selectedOption: string;
  }

export interface DateRangeFilterProps {
    onChange: (start: string, end: string) => void;
  }
  
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (status: string) => void;
    statusType: string;
    options: string[];
    handleUpdatedTable:()=>void
  }

export interface OrderDetailsProps {
    Customer_name: string;
    Address: string;
    Mob_no: string;
    order_id: string;
    date: string;
    customer_id: string;
    payment_status: string;
    total: number;
    delivery: string;
    items: number;
    fulfilment: string;
    Product_name: string;
    Price: number;
  }
  
export interface orderId {
    orderId: string;
    closeOrderDetails: () => void;
  }

 export interface Order {
    order_id: string;
    order_date: string;
    customer_name: string;
    payment_status: string;
    total: string;
    delivery: string;
    items: number;
    fulfilment: string;
  }
  
export interface TableBodyProps {
    data: Order[];
    handleUpdatedTable: () => void;
    onRowClick: (order: Order) => void;
  }

  
export interface TableHeadProps {
    onPaymentStatusChange: (status: string) => void;
    onFulfilmentChange: (status: string) => void;
    payment: string;
    fulfilment: string;
    onDateRangeChange: (start: string, end: string) => void;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Order
    ) => void;
    orderBy: keyof Order;
    order: "asc" | "desc";
  }
  

  