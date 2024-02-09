import React, { useState } from 'react'
import '../popup.css'
import { TextField } from '@mui/material';
import Button from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const [date, setDate] = useState<any>(new Date())
  const selectedDay = (val: any) => {
    console.log(val)
  }
  return (
    <div className='popupout'>

      <div className='popupbox'>
        <button className='close' onClick={() => {
          setShowCalorieIntakePopup(false)
        }}>
          <AiOutlineClose />
        </button>
        <DatePicker getSelectedDay={selectedDay}
          endDate={100}
          selectDate={new Date()}
          labelFormat={"MMMM"}
          color={"#ffc20e"} />
      </div>
    </div>
  )
}

export default CalorieIntakePopup
