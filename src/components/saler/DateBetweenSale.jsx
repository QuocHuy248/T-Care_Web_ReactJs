import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

export default function DateBetweenSale({setSelectedDate,selectedDate, defaultDateRange,
    timeEndPicker}) {

  const handleDateRangeChange = (newDateRange) => {
    setSelectedDate(newDateRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          value={selectedDate || [dayjs(defaultDateRange[0]), dayjs(timeEndPicker[0])] } 
        onChange={handleDateRangeChange}
          localeText={{ start: 'Bắt đầu', end: 'Kết thúc' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
