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
interface Watertrack {
    setShowWatertrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Watertrack: React.FC<Watertrack> = ({ setShowWatertrack }) => {
    const color = '#ffc20e'

    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs>(dayjs());
    const [watertrack, setWatertrack] = useState<any>({

        date: dayjs().format('YYYY-MM-DD'),
        amountInMilliliters: ''
    })
    const [items, setItems] = useState<any>([])

    const saveWatertrack = async () => {
        let tempdate = date.format('YYYY-MM-DD')
        let temptime = time.format('HH:mm:ss')
        let tempdatetime = tempdate + ' ' + temptime
        let finaldatetime = new Date(tempdatetime)

        console.log('Final Date Time:', finaldatetime);
        console.log('Water Drink:', watertrack);

        fetch('http://localhost:8000/watertrack/addwaterentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime,
                water: watertrack.amountInMilliliters
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Water Drink added Successfully')
                    getWatertrack()
                }
                else {
                    toast.error('Error in adding Water Drink')
                    console.log(data)
                }
            })
            .catch(err => {
                toast.error('Error in adding Water Drink')
                console.log(err)
            })
    }
    const getWatertrack = async () => {
        setItems([])
        fetch('http://localhost:8000/watertrack/getwaterbydate', {
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
                    console.log(data.data, 'Water Drink data for date')
                    setItems(data.data)
                }
                else {
                    toast.error('Error in getting Water Drink')
                }
            })
            .catch(err => {
                toast.error('Error in getting Water Drink')
                console.log(err)
            })
    }
    const deleteSteptrack = async (item: any) => {
        fetch('http://localhost:8000/watertrack/deletewaterentry', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: item.date
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Water Drink item deleted successfully')
                    getWatertrack()
                }
                else {
                    toast.error('Error in deleting Water Drink')
                }
            })
            .catch(err => {
                toast.error('Error in Deleting Water Drink')
                console.log(err)
            })

    }

    useEffect(() => {
        getWatertrack()
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
                        setShowWatertrack(false)
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
                <TextField id='outlined-basic' label='Water Drink'
                    variant='outlined' color='warning'
                    onChange={(e) => {
                        setWatertrack({ ...watertrack, water: e.target.value })
                    }}
                />

                <Button variant='contained' color='warning'
                    onClick={saveWatertrack}>Save</Button>

                <div className='hrline'></div>
                <div className='items'>
                    {
                        items.map((item: any) => {
                            return (
                                <div className='item'>
                                    <h3>{item.item}</h3>
                                    <h3>{item.quantity} {item.quantitytype}</h3>
                                    <button onClick={() => {
                                        deleteSteptrack(item)
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

export default Watertrack