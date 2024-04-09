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
interface Workouttrack {
    setShowWorkouttrack: React.Dispatch<React.SetStateAction<boolean>>;
}

const Workouttrack: React.FC<Workouttrack> = ({ setShowWorkouttrack }) => {
    const color = '#ffc20e'

    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs>(dayjs());
    const [workouttrack, setWorkouttrack] = useState<any>({
        date: dayjs().format('YYYY-MM-DD'),
        exercise: '',
        durationInMinutes: 'min'
    })
    const [items, setItems] = useState<any>([])

    const saveWorkouttrack = async () => {
        let tempdate = date.format('YYYY-MM-DD')
        let temptime = time.format('hh:mm:ss')
        let tempdatetime = tempdate + ' ' + temptime
        let finaldatetime = new Date(tempdatetime)

        console.log('Final Date Time:', finaldatetime);
        console.log('Workout :', workouttrack);

        fetch('http://localhost:8000/workouttrack/addworkoutentry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                date: finaldatetime,
                exercise: workouttrack.exercise,
                durationInMinutes: workouttrack.durationInMinutes
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Workout added Successfully')
                    getWorkouttrack()
                }
                else {
                    toast.error('Error in adding Workout')
                    console.log(data)
                }
            })
            .catch(err => {
                toast.error('Error in adding Workout')
                console.log(err)
            })
    }
    const getWorkouttrack = async () => {
        setItems([])
        fetch('http://localhost:8000/workouttrack/getworkoutsbydate', {
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
                    console.log(data.data, 'Workout data for date')
                    setItems(data.data)
                }
                else {
                    toast.error('Error in getting Workout')
                }
            })
            .catch(err => {
                toast.error('Error in getting Workout')
                console.log(err)
            })
    }
    const deleteWorkouttrack = async (item: any) => {
        fetch('http://localhost:8000/workouttrack/deleteworkoutentry', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                exercise: workouttrack.exercise,
                date: item.date
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    toast.success('Workout item deleted successfully')
                    getWorkouttrack()
                }
                else {
                    toast.error('Error in deleting Workout')
                }
            })
            .catch(err => {
                toast.error('Error in Deleting Workout')
                console.log(err)
            })

    }

    useEffect(() => {
        getWorkouttrack()
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
                        setShowWorkouttrack(false)
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
                <TextField id='outlined-basic' label='Workout Name'
                    variant='outlined' color='warning'
                    onChange={(e) => {
                        setWorkouttrack({ ...workouttrack, exercise: e.target.value })
                    }}
                />
                <TextField id='outlined-basic' label='Workout Duration'
                    variant='outlined' color='warning' type='number'
                    onChange={(e) => {
                        setWorkouttrack({ ...workouttrack, durationInMinutes: e.target.value })
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
                    onClick={saveWorkouttrack}>Save</Button>

                <div className='hrline'></div>
                <div className='items'>
                    {
                        items.map((item: any) => {
                            return (
                                <div className='item'>
                                    <h3> {new Date(item.date).toLocaleDateString('en-GB')}</h3>
                                    <h3>{item.exercise} </h3> <h3> {item.durationInMinutes}</h3>
                                    <button onClick={() => {
                                        deleteWorkouttrack(item)
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

export default Workouttrack
