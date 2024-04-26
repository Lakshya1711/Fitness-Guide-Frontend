"use client";
import React, { useState, useEffect } from 'react';
import './Report.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AiFillEdit } from 'react-icons/ai';
import CalorieIntakePopup from '@/compoents/ReportFormPopup/CalorieIntakePopup';
import Sleeptrack from '@/compoents/ReportFormPopup/Sleeptrack';
import Steptrack from '@/compoents/ReportFormPopup/Steptrack';
import { usePathname } from 'next/navigation';
import Watertrack from '@/compoents/ReportFormPopup/Watertrack';
import Weighttrack from '@/compoents/ReportFormPopup/Weighttrack';
import Workouttrack from '@/compoents/ReportFormPopup/Workouttrack';

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const chartsParams = {
        height: 300
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = null;
                if (pathname === '/report/Calorie%20Intake') {
                    response = await fetch('http://localhost:8000/calorieintake/getcalorieintakebylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                } else if (pathname === '/report/Sleep') {
                    response = await fetch('http://localhost:8000/sleeptrack/getsleepbylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                }
                else if (pathname === '/report/Steps') {
                    response = await fetch('http://localhost:8000/steptrack/getstepsbylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                }
                else if (pathname === '/report/Water') {
                    response = await fetch('http://localhost:8000/watertrack/getwaterbylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                }
                else if (pathname === '/report/Workout') {
                    response = await fetch('http://localhost:8000/workouttrack/getworkoutsbylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                }
                else if (pathname === '/report/Weight') {
                    response = await fetch('http://localhost:8000/weighttrack/getweightbylimit', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ limit: 10 })
                    });
                }



                if (response === null) {
                    setData([]);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setData(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pathname]);

    const formatData = () => {
        if (data.length === 0) {
            return [];
        }
        if (pathname === '/report/Calorie%20Intake') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.calorieIntake },
            }));
        } else if (pathname === '/report/Sleep') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.durationInHrs },
            }));
        }
        else if (pathname === '/report/Steps') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.steps },
            }));
        }
        else if (pathname === '/report/Water') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.amountInMilliliters },
            }));
        }
        else if (pathname === '/report/Workout') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.durationInMinutes },
            }));
        }
        else if (pathname === '/report/Weight') {
            return data.map(item => ({
                data: { date: new Date(item.date), value: item.weight },
            }));
        }
        return [];
    };

    const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState(false);
    const [showSleeptrack, setShowSleeptrack] = useState(false);
    const [showSteptracker, setShowSteptrack] = useState(false);
    const [showWatertrack, setShowWatertrack] = useState(false);
    const [showWorkouttrack, setShowWorkouttrack] = useState(false);
    const [showWeighttrack, setShowWeighttrack] = useState(false);

    return (
        <div className='reportpage'>
            <div className='s1'>
                {loading ? (
                    <h3>Loading...</h3>
                ) : data.length > 0 ? (
                    <LineChart width={800} height={400} data={formatData()}>
                        <XAxis dataKey="data.date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="data.value" stroke="#8884d8" />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                ) : (
                    <h3>No Data to Display</h3>
                )}
            </div>
            <button
                className='editbutton'
                onClick={() => {
                    if (pathname === '/report/Calorie%20Intake') {
                        setShowCalorieIntakePopup(true);
                    } else if (pathname === '/report/Sleep') {
                        setShowSleeptrack(true);
                    } else if (pathname === '/report/Steps') {
                        setShowSteptrack(true);
                    } else if (pathname === '/report/Water') {
                        setShowWatertrack(true);
                    } else if (pathname === '/report/Workout') {
                        setShowWorkouttrack(true);
                    } else if (pathname === '/report/Weight') {
                        setShowWeighttrack(true);
                    } else {
                        //show popup for other reports
                        alert('show popup for other reports');
                    }
                }}
            >
                <AiFillEdit />
            </button>
            {showCalorieIntakePopup && <CalorieIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />}
            {showSleeptrack && <Sleeptrack setShowSleeptrack={setShowSleeptrack} />}
            {showSteptracker && <Steptrack setShowSteptrack={setShowSteptrack} />}
            {showWatertrack && <Watertrack setShowWatertrack={setShowWatertrack} />}
            {showWeighttrack && <Weighttrack setShowWeighttrack={setShowWeighttrack} />}
            {showWorkouttrack && <Workouttrack setShowWorkouttrack={setShowWorkouttrack} />}

        </div >
    );
};

export default Page;