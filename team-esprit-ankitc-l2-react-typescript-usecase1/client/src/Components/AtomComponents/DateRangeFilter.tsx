import React, { useState, ChangeEvent } from "react";

import { DateRangeFilterProps } from "@/utils/type";

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setStartDate(date);
    onChange(date, endDate || "");
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setEndDate(date);
    onChange(startDate || "", date);
  };

  return (
    <div>
      <input
        type="date"
        value={startDate || ""}
        onChange={handleStartDateChange}
      />
      <span>-</span>
      <input type="date" value={endDate || ""} onChange={handleEndDateChange} />
    </div>
  );
};

export default DateRangeFilter;
