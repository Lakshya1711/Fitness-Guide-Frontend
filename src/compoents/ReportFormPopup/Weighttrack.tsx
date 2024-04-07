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
interface Weighttrack {
    setShowWeighttrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Weighttrack: React.FC<Weighttrack> = ({ setShowWeighttrack }) => {
    const color = '#ffc20e'

    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs>(dayjs());
    const [weighttrack, setWeighttrack] = useState<any>({

        date: dayjs().format('YYYY-MM-DD'),
        steps: ''
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

    const saveWeighttrack = async () => {
        let tempdate = date.format('YYYY-MM-DD')
        let temptime = time.format('HH:mm:ss')
        let tempdatetime = tempdate + ' ' + temptime
        let finaldatetime = new Date(tempdatetime)

        console.log('Final Date Time:', finaldatetime);
        console.log('Weight:', weighttrack);

        fetch('http://localhost:8000/weighttrack/addweightentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime,
                weights: weighttrack.weightInKg
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Steps Count added Successfully')
                    getWeighttrack()
                }
                else {
                    toast.error('Error in adding Steps Count')
                    console.log(data)
                }
            })
            .catch(err => {
                toast.error('Error in adding Steps Count')
                console.log(err)
            })
    }
    const getWeighttrack = async () => {
        setItems([])
        fetch('http://localhost:8000/weighttrack/getweightbydate', {
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
                    console.log(data.data, 'Steps Count data for date')
                    setItems(data.data)
                }
                else {
                    toast.error('Error in getting Steps Count')
                }
            })
            .catch(err => {
                toast.error('Error in getting Steps Count')
                console.log(err)
            })
    }
    const deleteWeighttrack = async (item: any) => {
        fetch('http://localhost:8000/weighttrack/deleteweightentry', {
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
                    toast.success('Steps Count item deleted successfully')
                    getWeighttrack()
                }
                else {
                    toast.error('Error in deleting Steps Count')
                }
            })
            .catch(err => {
                toast.error('Error in Deleting Steps Count')
                console.log(err)
            })

    }

    useEffect(() => {
        getWeighttrack()
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
                        setShowWeighttrack(false)
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
                <TextField id='outlined-basic' label='Steps taken'
                    variant='outlined' color='warning'
                    onChange={(e) => {
                        setWeighttrack({ ...weighttrack, steps: e.target.value })
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
                    onClick={saveWeighttrack}>Save</Button>

                <div className='hrline'></div>
                <div className='items'>
                    {
                        items.map((item: any) => {
                            return (
                                <div className='item'>
                                    <h3>{item.item}</h3>
                                    <h3>{item.quantity} {item.quantitytype}</h3>
                                    <button onClick={() => {
                                        deleteWeighttrack(item)
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

export default Weighttrack