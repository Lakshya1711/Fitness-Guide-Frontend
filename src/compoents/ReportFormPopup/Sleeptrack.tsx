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
interface SleeptrackProps {
    setShowSleeptrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sleeptrack: React.FC<SleeptrackProps> = ({ setShowSleeptrack }) => {
    const color = '#ffc20e'

    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs>(dayjs());
    const [sleeptrack, setsleeptrack] = useState<any>({
        date: dayjs().format('YYYY-MM-DD'),
        durationInHrs: ''
    })
    const [items, setItems] = useState<any>([])

    const saveSleeptrack = async () => {
        let tempdate = date.format('YYYY-MM-DD')
        let temptime = time.format('HH:mm:ss')
        let tempdatetime = tempdate + ' ' + temptime
        let finaldatetime = new Date(tempdatetime)

        console.log('Final Date Time:', finaldatetime);
        console.log('Sleep Track:', sleeptrack);

        fetch('http://localhost:8000/sleeptrack/addsleepentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime,
                durationInHrs: sleeptrack.durationInHrs
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Sleep Track added Successfully')
                    getSleeptrack()
                }
                else {
                    toast.error('Error in adding Sleep Track')
                    console.log(data)
                }
            })
            .catch(err => {
                toast.error('Error in adding Sleep Track')
                console.log(err)
            })
    }
    const getSleeptrack = async () => {
        setItems([])
        fetch('http://localhost:8000/sleeptrack/getsleepbydate', {
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
                    console.log(data.data, 'Sleep Track data for date')
                    setItems(data.data)
                }
                else {
                    toast.error('Error in getting Sleep Track')
                }
            })
            .catch(err => {
                toast.error('Error in getting Sleep Track')
                console.log(err)
            })
    }
    const deleteSleeptrack = async (item: any) => {
        fetch('http://localhost:8000/sleeptrack/deletesleepentry', {
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
                    toast.success('Sleep Track item deleted successfully')
                    getSleeptrack()
                }
                else {
                    toast.error('Error in deleting Sleep Track')
                }
            })
            .catch(err => {
                toast.error('Error in Deleting Sleep Track')
                console.log(err)
            })

    }

    useEffect(() => {
        getSleeptrack()
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
                        setShowSleeptrack(false)
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

                <TextField id='outlined-basic' label='Sleep Track (in Hrs)'
                    variant='outlined' color='warning' type='number'
                    onChange={(e) => {
                        setsleeptrack({ ...sleeptrack, durationInHrs: e.target.value })
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
                    onClick={saveSleeptrack}>Save</Button>

                <div className='hrline'></div>
                <div className='items'>
                    {
                        items.map((item: any) => {
                            return (
                                <div className='item'>
                                    <h3>{item.item}</h3>
                                    <h3>{item.quantity} {item.quantitytype}</h3>
                                    <button onClick={() => {
                                        deleteSleeptrack(item)
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

export default Sleeptrack