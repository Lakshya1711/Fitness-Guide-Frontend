import React, { useState, useEffect } from 'react'
import './popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import { error } from 'console';
interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = '#ffc20e'

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs());
  const [calorieIntake, setCalorieIntake] = useState<any>({
    item: '',
    date: dayjs().format('YYYY-MM-DD'),
    quantity: '',
    quantitytype: 'g'
  })
  const [items, setItems] = useState<any>([])

  // const getDate = async () => {
  //   let temp = [{
  //     date: 'Tue Mar 12 2024 00:00:00 GMT+0530 (India Standard Time)',
  //     name: 'Apple',
  //     amount: 100,
  //     unit: 'gms'
  //   },
  //   {
  //     date: 'Tue Mar 12 2024 00:00:00 GMT+0530 (India Standard Time)',
  //     name: 'Bananas',
  //     amount: 100,
  //     unit: 'gms'
  //   },
  //   {
  //     date: 'Tue Mar 12 2024 00:00:00 GMT+0530 (India Standard Time)',
  //     name: 'Apple',
  //     amount: 100,
  //     unit: 'gms'
  //   }
  // ]
  // }

  const saveCalorieIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')
    let tempdatetime = tempdate + ' ' + temptime
    let finaldatetime = new Date(tempdatetime)

    console.log('Final Date Time:', finaldatetime);
    console.log('Calorie Intake:', calorieIntake);

    fetch('http://localhost:8000/calorintake/addcalorieintake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        item: calorieIntake.item,
        quantity: calorieIntake.quantity,
        quantitytype: calorieIntake.quantitytype
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Calorie intake added Successfully')
          getCalorieIntake()
        }
        else {
          toast.error('Error in adding Calorie intake')
          console.log(data)
        }
      })
      .catch(err => {
        toast.error('Error in adding Calorie intake')
        console.log(err)
      })
  }
  const getCalorieIntake = async () => {
    setItems([])
    fetch('http://localhost:8000/calorintake/getcalorieintakebydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log(data.data, 'Calorie intake data for date')
          setItems(data.data)
        }
        else {
          toast.error('Error in getting Calorie intake')
        }
      })
      .catch(err => {
        toast.error('Error in getting Calorie intake')
        console.log(err)
      })
  }
  const deleteCalorieIntake = async (item: any) => {
    fetch('http://localhost:8000/calorintake/deletecalorieintake', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        item: item.item,
        date: item.date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Calorie intake item deleted successfully')
          getCalorieIntake()
        }
        else {
          toast.error('Error in deleting Calorie Intake')
        }
      })
      .catch(err => {
        toast.error('Error in Deleting Calorie Intake')
        console.log(err)
      })

  }

  useEffect(() => {
    getCalorieIntake()
  }, [date])

  const selectedDay = (newValue: Dayjs | null) => {
    if (newValue !== null) {

    }
  };




  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close'
          onClick={() => {
            setShowCalorieIntakePopup(false)
          }}>
          <AiOutlineClose />
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => setDate(newValue)}
          />

        </LocalizationProvider>
        <TextField id='outlined-basic' label='Food item name'
          variant='outlined' color='warning'
          onChange={(e) => {
            setCalorieIntake({ ...calorieIntake, item: e.target.value })
          }}
        />
        <TextField id='outlined-basic' label='Food item amount(in gms)'
          variant='outlined' color='warning' type='number'
          onChange={(e) => {
            setCalorieIntake({ ...calorieIntake, quantity: e.target.value })
          }}
        />

        <div className='timebox'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Time picker"
              value={time}
              onChange={(newValue: any) => setTime(newValue)}
            />
          </LocalizationProvider>
        </div>

        <Button variant='contained' color='warning'
          onClick={saveCalorieIntake}>Save</Button>

        <div className='hrline'></div>
        <div className='items'>
          {
            items.map((item: any) => {
              return (
                <div className='item'>
                  <h3>{item.item}</h3>
                  <h3>{item.quantity} {item.quantitytype}</h3>
                  <button onClick={() => {
                    deleteCalorieIntake(item)
                  }}>
                    <AiFillDelete />
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>


    </div >
  )
}

export default CalorieIntakePopup