"use client";
import React, { useState, useEffect } from "react";
import "./../workoutPage.css";
import { useSearchParams } from "next/navigation";
interface PageProps {
  params: {
    type: string
  }
}
const page = ({ params }: PageProps) => {
  const { type } = params
  console.log(type)
  const [workout, setWorkout] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams()

  const workoutid = searchParams.get('id')

  const getworkout = async () => {
    const Chest = {
      type: "Chest",
      imageUrl:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      durationInMin: 30,
      exercises: [
        {
          exercise: "Flat Bench Press",
          videoUrl: "https://gymvisual.com/img/p/1/7/5/5/2/17552.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "The flat bench press is a popular strength training exercise that primarily targets the muscles of the chest, shoulders, and triceps.",
        },
        {
          exercise: "Incline Bench Press",
          videoUrl: "https://gymvisual.com/img/p/1/0/3/9/8/10398.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "The incline bench press is a variation of the traditional bench press that targets the upper part of the chest, shoulders, and triceps. The main difference lies in the angle of the bench, which is set to an incline.",
        },
        {
          exercise: "Decline Bench Press",
          videoUrl: "https://gymvisual.com/img/p/6/5/2/3/6523.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "This exercise involves performing the bench press on a decline bench, where the upper body is positioned at a lower angle compared to the legs.",
        },
      ],
    }
    const Abs = {
      type: "Abs",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      durationInMin: 90,
      exercises: [
        {
          exercise: "Reverse Crunches",
          videoUrl: "https://gymvisual.com/img/p/2/0/9/5/9/20959.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Lie on your back, knees bent, feet off the floor. Contract abs, lifting hips off the ground while bringing knees towards chest. Lower legs back down without touching the floor. Repeat for desired reps, engaging lower abs throughout.",
        },
        {
          exercise: "Side plank",
          videoUrl: "https://gymvisual.com/img/p/2/1/8/6/0/21860.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Begin in a side plank position with forearm on the ground, elbow directly below shoulder. Stack feet or stagger for stability. Lift hips until body forms a straight line from head to heels. Engage core and hold for desired time. Repeat on opposite side.",
        },
        {
          exercise: "Leg raises",
          videoUrl: "https://gymvisual.com/img/p/2/2/8/8/7/22887.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Lie on your back with legs straight. Keeping your lower back pressed into the floor, lift legs up until they're perpendicular to the floor. Lower them back down with control, stopping before they touch the ground. Repeat for desired reps, engaging core throughout.",
        },
      ],
    }
    const Shoulder = {
      type: "shoulder",
      imageUrl:
        "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      durationInMin: 90,
      exercises: [
        {
          exercise: "Shoulder Circle",
          videoUrl: "https://gymvisual.com/img/p/2/1/6/5/9/21659.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Shoulder circles: Stand tall, arms relaxed. Slowly roll shoulders forward in circular motion, squeezing shoulder blades together at top. Reverse direction after desired reps. Maintain control and breathe steadily.",
        },
        {
          exercise: "Dumbbell Side Lunge",
          videoUrl: "https://gymvisual.com/img/p/2/0/3/1/2/20312.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Hold a dumbbell in each hand, stand tall, and step to the side with one leg while keeping the other straight. Lower your body by bending the knee of the side you stepped to, ensuring your back remains straight. Push back to the starting position and repeat on the other side.",
        },
        {
          exercise: "Dumbbell Standing Biceps Curl",
          videoUrl: "https://gymvisual.com/img/p/2/0/9/5/4/20954.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Hold dumbbells in each hand, palms facing forward. Stand with feet shoulder-width apart. Keeping elbows close to your sides, curl the weights towards your shoulders, exhaling. Lower the weights back down slowly, inhaling. Repeat for desired reps. Keep core engaged and avoid swinging.",
        },
      ],
    }
    const Back = {
      type: "Back",
      imageUrl:
        "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      durationInMin: 90,
      exercises: [
        {
          exercise: "Barbell Back Wide Shrug",
          videoUrl: "https://gymvisual.com/img/p/2/1/9/4/4/21944.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "To perform a barbell back wide shrug: Hold a barbell with an overhand grip wider than shoulder-width apart. Stand tall with feet hip-width apart. Elevate shoulders towards ears, squeezing at the top. Lower back down. Maintain a straight back throughout.",
        },
        {
          exercise: "Dumbbell Step Back Lunge and Row",
          videoUrl: "https://gymvisual.com/img/p/2/0/9/5/7/20957.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Hold dumbbells at sides, step back into lunge position. Lower until both knees form 90-degree angles. Simultaneously row dumbbells towards hips. Return to standing, bringing dumbbells to sides. Repeat on alternate leg.",
        },
        {
          exercise: "45 degrees Back Extension",
          videoUrl: "https://gymvisual.com/img/p/2/0/8/2/5/20825.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Lie facedown on a back extension bench, keeping hips and feet secured. Cross arms over chest or behind head. Lift upper body until parallel with the floor, then lower down. Avoid hyperextension.",
        },
      ],
    }
    const Biceps = {
      type: "Biceps",
      imageUrl:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      durationInMin: 90,
      exercises: [
        {
          exercise: "Bar Biceps Curl",
          videoUrl: "https://gymvisual.com/img/p/2/0/3/0/1/20301.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Stand with feet shoulder-width apart, holding a barbell with an underhand grip, hands slightly wider than shoulders. Keep elbows close to your body, curl the barbell towards your shoulders while exhaling. Pause briefly, then lower back down to starting position while inhaling. Repeat for desired reps.",
        },
        {
          exercise: "Dumbbell Goblet Squat and Biceps Curl",
          videoUrl: "https://gymvisual.com/img/p/2/0/3/0/7/20307.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Hold a dumbbell vertically close to your chest with both hands. Stand with feet shoulder-width apart, toes slightly turned out. Perform a squat, keeping your chest up and knees aligned with toes. As you rise, perform a biceps curl. Lower and repeat.",
        },
        {
          exercise: "Dumbbell Incline Biceps Curl",
          videoUrl: "https://gymvisual.com/img/p/1/9/8/1/1/19811.gif",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Sit on an incline bench, back straight. Hold dumbbells, arms fully extended. Curl the weights toward your shoulders, keeping elbows close to your body. Lower the dumbbells with control. Repeat for desired reps, ensuring full range of motion.",
        },
      ],
    }
    switch (type) {
      case "Chest":
        setWorkout(Chest)
        break

      case "Abs":
        setWorkout(Abs);
        break

      case "Shoulder":
        setWorkout(Shoulder)
        break

      case "Back":
        setWorkout(Back)
        break

      case "Biceps":
        setWorkout(Biceps)
        break
    }

    // fetch('http://localhost:8000/workoutplans/workouts/' + workoutid, {
    //   method: 'GET',
    //   credentials: 'include'
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.ok) {
    //       setData(data.data)
    //     }
    //     else {
    //       setData(null)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  };

  useEffect(() => {
    getworkout();
  }, []);
  return (
    <div>
      {workout ?
        (
          <div className="workout">
            <h1 className="mainhead1">{workout.type} Day</h1>
            <div className="workout__exercises">
              {workout.exercises.map((item: any, index: number) => (
                <div
                  className={
                    index % 2 === 0
                      ? "workout__exercise"
                      : "workout__exercise workout__exercise--reverse"
                  }
                  key={index}
                >
                  <h3>{index + 1}</h3>
                  <div className="workout__exercise__image">
                    <img src={item.videoUrl} alt="" />
                  </div>
                  <div className="workout__exercise__content">
                    <h2>{item.exercise}</h2>
                    <span>
                      {item.sets} sets X {item.reps} reps
                    </span>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (<div style={{ color: "#ffffff", fontSize: "2rem", textAlign: "center" }}> No Workout Present for {type} </div>)}
    </div>
    // <>
    //   {
    //     workout &&
    //     <div className="workout">
    //       <h1 className="mainhead1">{data?.name} Day</h1>
    //       <div className="workout__exercises">
    //         {workout.exercises.map((item: any, index: number) => (
    //           <div
    //             className={
    //               index % 2 === 0
    //                 ? "workout__exercise"
    //                 : "workout__exercise workout__exercise--reverse"
    //             }
    //             key={index}
    //           >
    //             <h3>{index + 1}</h3>
    //             <div className="workout__exercise__image">
    //               <img src={item.imageURL} alt="" />
    //             </div>
    //             <div className="workout__exercise__content">
    //               <h2>{item.name}</h2>
    //               <span>
    //                 {item.sets} sets X {item.reps} reps
    //               </span>
    //               <p>{item.description}</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   }
    // </>
  );
};

export default page;
