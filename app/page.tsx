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


  const [order, setOrder] = useState<number[]>([]);
  const [pressed, setPressed] = useState<boolean[]>(Array(5).fill(false));
  const [numpressed, setnumpressed] = useState<number>(0);

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

  const handleSubmit = () => {
    console.log("Submitted order:", order);
  };

  const handleClear = () => {
    setOrder([]);
    setPressed(Array(5).fill(false));
    setnumpressed(0);
  };

  return (
    <div className=" h-screen bg-black">
      <div className="flex flex-col items-center m-auto pt-40 gap-4">
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num)}
              className=" w-40 h-40 border-2 border-stone-400 rounded flex items-center justify-center text-stone-200 hover:bg-stone-800 transition-all"
            >
              {pressed[num - 1] ? order.indexOf(num) + 1 : historicalEvents[num-1].title}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-stone-700 text-stone-200 rounded hover:bg-stone-600 transition-all"
          >
            Submit
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-stone-700 text-stone-200 rounded hover:bg-stone-600 transition-all"
          >
            Clear
          </button>
        </div>

        <div className="text-stone-200">
          Order: {order.join(', ')}
        </div>
      </div>
    </div>
  );
}
