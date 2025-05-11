'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const historicalEvents = [
    {
        year: 1969,
        title: "Apollo 11 Moon Landing",
        description: "NASA's Apollo 11 mission successfully landed humans on the Moon for the first time, with Neil Armstrong and Buzz Aldrin becoming the first people to walk on the lunar surface."
    },
    {
        year: 1989,
        title: "Fall of the Berlin Wall",
        description: "The Berlin Wall, which had divided East and West Berlin since 1961, was opened, leading to German reunification and symbolizing the end of the Cold War in Europe."
    },
    {
        year: 1776,
        title: "American Declaration of Independence",
        description: "The Continental Congress adopted the Declaration of Independence, announcing the American colonies' separation from Great Britain and establishing the United States of America."
    },
    {
        year: 1945,
        title: "End of World War II",
        description: "World War II concluded with the unconditional surrender of Nazi Germany in May and Imperial Japan in September after atomic bombs were dropped on Hiroshima and Nagasaki."
    },
    {
        year: 2001,
        title: "September 11 Attacks",
        description: "Terrorist attacks by al-Qaeda using hijacked commercial airplanes struck the World Trade Center in New York and the Pentagon, killing nearly 3,000 people and leading to the War on Terror."
    }
];

const correct = [3,4,1,2,5];


  const [order, setOrder] = useState<number[]>([]);
  const [pressed, setPressed] = useState<boolean[]>(Array(5).fill(false));
  const [numpressed, setnumpressed] = useState<number>(0);
  let [iscorrect,setiscorrect] = useState<number>(0); //0 is not win or lose //1 is win //-1 is lose

  const handleButtonClick = (num: number) => {
    if (!pressed[num - 1]) {
      setOrder((prevOrder) => [...prevOrder, num]);
      setPressed((prevPressed) => {
        const newPressed = [...prevPressed];
        newPressed[num - 1] = true;
        return newPressed;
      });
    }
    setnumpressed(numpressed + 1);  
  };

  const handleClear = () => {
    setOrder([]);
    setPressed(Array(5).fill(false));
    setnumpressed(0);
    setiscorrect(0)
  };

  const errorcheck = () => {
    for(var i = 0; i<5; i++){
      if(order[i]!=correct[i]){
        console.log("Stupid")
        handleClear()
        setiscorrect(-1)
        return;
      }
    } 
    setiscorrect(1);
  }

  const handleSubmit = () => {
    console.log("Submitted order:", order);
    if(order.length<5){
     alert("Missing Choices")
    }
    else
    {//there is 5 spaces having been selected, time to check
      errorcheck()
    }
  };




  return (
    <div className=" h-screen bg-black">
      <div className='text-white text-center pt-14 font-bold text-3xl md:text-4xl'>Hello<br/> Welcome to a early test of the new History puzzle game <br/> name/cover is still being designed as this is still the proof of concept</div>
      <div className='text-white text-center pt-5 font-semibold text-lg md:text-xl'>Click on the events in history from oldest to most recent</div>
      <div className="flex flex-col items-center m-auto pt-32 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num)}
              className="min-w-[300px] w-full md:w-1/3 h-40 border-2 border-stone-400 rounded flex items-center justify-center text-stone-200 hover:bg-stone-800 transition-all"
            >
              {pressed[num - 1] ? order.indexOf(num) + 1 : historicalEvents[num-1].title}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-4 py-2 bg-stone-700 text-stone-200 rounded hover:bg-stone-600 transition-all"
          >
            Submit
          </button>
          <button
            onClick={handleClear}
            className="w-full md:w-auto px-4 py-2 bg-stone-700 text-stone-200 rounded hover:bg-stone-600 transition-all"
          >
            Clear
          </button>
        </div>

        <div className="text-stone-200">
          {/* Order: {order.join(', ')} */}
        </div>

          {iscorrect === 0 ? 
          <div className='text-white text-center'>Once all events are selected, Press Submit to see how you did</div> 
          : 
            iscorrect === -1? 
            <div className='text-red-700 text-center'>Try Again</div> :
            
            
            <div className='text-green-700 text-center'>This is correct!</div>}

      </div>
    </div>
  );
}
