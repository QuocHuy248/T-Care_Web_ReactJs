import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { SelectDate } from "../../selectDate/SelectDate";
import DateBetweenSale from "../../saler/DateBetweenSale";
import DateBetween from "../../home/wordFindCare/datesession/DateBetween";

export function DateIndexUser({
  setValue,
  setEndDay,
  setStartDay,
  setDayInWeek,
  setSelectedDate,
  selectedDate,
  dayInWeek,
  defaultDateRange,
  timeEndPicker,
  handleDateChange
}) {
  
  const getDaysInRange = (startDate, endDate) => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push({
        date: new Date(currentDate),
        dayOfWeek: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };
  const handleDay = (objectDay) => {
    const dateValue = objectDay?.$d;
    const formattedDate = dateValue?.toLocaleDateString("en-GB");
    return formattedDate;
  };
  useEffect(() => {
    if (selectedDate != null) {
      const daysInRange = getDaysInRange(selectedDate[0], selectedDate[1]);
      const dayInWeekSelect = daysInRange.map((e) => e.dayOfWeek);
      setDayInWeek(dayInWeekSelect);
      setStartDay(handleDay(selectedDate[0]));
      setEndDay(handleDay(selectedDate[1]));
    }
  }, [selectedDate]);

  return (
    <>
      <DateBetween
        onChange={handleDateChange}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        defaultDateRange = {defaultDateRange}
        timeEndPicker={timeEndPicker}
      />
      <div style={{ marginTop: "20px" }}>
        {selectedDate && selectedDate[0] && selectedDate[1] && (
          <SelectDate dayInWeek={dayInWeek} setValue={setValue} billIndexUser={true} />
        )}
      </div>
    </>
  );
}
