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
interface SteptrackProps {
    setShowSteptrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Steptrack: React.FC<SteptrackProps> = ({ setShowSteptrack }) => {
    const color = '#ffc20e'

    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs>(dayjs());
    const [steptrack, setsteptrack] = useState<any>({

        date: dayjs().format('YYYY-MM-DD'),
        steps: ''
    })
    const [items, setItems] = useState<any>([])

    const saveSteptrack = async () => {
        let tempdate = date.format('YYYY-MM-DD')
        let temptime = time.format('HH:mm:ss')
        let tempdatetime = tempdate + ' ' + temptime
        let finaldatetime = new Date(tempdatetime)

        console.log('Final Date Time:', finaldatetime);
        console.log('Steps Count:', steptrack);

        fetch('http://localhost:8000/steptrack/addstepentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime,
                steps: steptrack.steps
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Steps Count added Successfully')
                    getSteptrack()
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
    const getSteptrack = async () => {
        setItems([])
        fetch('http://localhost:8000/steptrack/getstepsbydate', {
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
    const deleteSteptrack = async (item: any) => {
        fetch('http://localhost:8000/steptrack/deletestepentry', {
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
                    getSteptrack()
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
        getSteptrack()
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
                        setShowSteptrack(false)
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
                        setsteptrack({ ...steptrack, steps: e.target.value })
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
                    onClick={saveSteptrack}>Save</Button>

                <div className='hrline'></div>
                <div className='items'>
                    {
                        items.map((item: any) => {
                            return (
                                <div className='item'>
                                    <h3>{item.steps}</h3>
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

export default Steptrack