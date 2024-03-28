"use client"
import React, { useState, useEffect } from 'react'
import './Report.css'
import { LineChart } from '@mui/x-charts/LineChart'
import { AiFillEdit } from 'react-icons/ai'
import CalorieIntakePopup from '@/compoents/ReportFormPopup/CalorieIntake/CalorieIntakePopup'
import { usePathname } from 'next/navigation'

const Page = () => {
    const color = '#ffc20e';
    const pathname = usePathname()
    console.log(pathname)
    const chartsParams = {
        height: 300
    };

    const [dataS1, setDataS1] = useState<any>(null);

    const getDataForS1 = async () => {
        if (pathname == '/report/Calorie%20Intake') {
            fetch('http://localhost:8000/calorintake/getcalorieintakebylimit', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ limit: 10 })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                Date: item.date,
                                value: item.calorieIntake,
                                unit: 'Kcal'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        });
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        });
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert('get data for other reports')
        }
        //     let temp = [
        //         {
        //             date: 'Thu Feb 8 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2000,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Wed Feb 7 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2500,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Tue Feb 6 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2700,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Mon Feb 5 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 3000,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Sun Feb 4 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2000,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Sat Feb 3 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2300,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Fri Feb 2 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2500,
        //             unit: 'kcal'
        //         },
        //         {
        //             date: 'Thu Feb 1 2024 20:30:30 GMT+0530 (India Standard Time)',
        //             value: 2700,
        //             unit: 'kcal'
        //         },
        //     ];

        // let dataForLineChart = temp.map((item: any) => {
        //     let val = JSON.stringify(item.value)
        //     return val
        // });
        // let dataForXAxis = temp.map((item: any) => {
        //     let val = new Date(item.date)
        //     return val
        // });

        //     console.log({
        //         data: dataForLineChart,
        //         title: '1 Day Calorie Intake',
        //         color: color,
        //         xAxis: {
        //             data: dataForXAxis,
        //             label: 'Last 10 Days',
        //             scaleType: 'time'
        //         }
        //     });
        // };

        // useEffect(() => {
        //     getDataForS1();
        // }, []);
    }
    const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState<boolean>(false)
    return (
        <div className='reportpage'>

            <div className='s1'>
                {dataS1 ? (
                    <LineChart
                        {...chartsParams}
                        xAxis={[{
                            id: 'Day',
                            data: dataS1.xAxis.data,
                            scaleType: dataS1.xAxis.scaleType,
                            label: dataS1.xAxis.label,
                            valueFormatter: (date: any) => {
                                // Format date to display only the day number
                                return date.getDate().toString().padStart(2, '0');
                            }

                        }]}
                        series={[{
                            data: dataS1.data,
                            label: dataS1.title,
                            color: dataS1.color
                        },
                        ]}
                        {...chartsParams}
                    />
                ) : (
                    <h3>No Data to Display</h3>
                )}
            </div>

            <button className='editbutton' onClick={() => {
                if (pathname == '/report/Calorie%20Intake') {
                    setShowCalorieIntakePopup(true)
                }
                else {
                    //show popup for other reports
                    alert('show popup for other reports')
                }
            }}>
                <AiFillEdit />
            </button>
            {
                showCalorieIntakePopup &&
                <CalorieIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />

            }
        </div>
    );
};

export default Page;
