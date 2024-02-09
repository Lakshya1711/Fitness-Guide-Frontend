import React, { useState } from 'react'
import '../popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material';
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = "#ffc20e"
  const [date, setDate] = useState<any>(new Date())
  const selectedDay = (val: any) => {
    console.log(val)
  }
  const handleDateChange = (date: Date | null) => {
    setDate(date);
    console.log(date); // This will log the selected date
  };

  const [value, setValue] = useState<Dayjs | null>(dayjs('2024-02-09T20:30'))
  return (
    <div className='popupout'>

      <div className='popupbox'>
        <button className='close' onClick={() => {
          setShowCalorieIntakePopup(false)
        }}>
          <AiOutlineClose />
        </button>
        <DatePicker
          value={date}
          onChange={handleDateChange}
          label="Select Date"
        // color = {color}
        />
        <TextField id="outlined-basic" label="food item name" variant="outlined" color='warning' />
        <TextField id="outlined-basic" label="food item amount (in gms)" variant="outlined" color='warning' />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock value={value} onChange={(newValue) => setValue(newValue)} />
        </LocalizationProvider>
      </div>
    </div>
  )
}

export default CalorieIntakePopup
