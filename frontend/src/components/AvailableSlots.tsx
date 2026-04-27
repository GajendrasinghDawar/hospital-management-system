import { useEffect, useState } from "react";
import { getAvailableSlot } from "../utils";

export function AvailableSlots() {
  const [slots, setSlots] = useState<
    { id: string; date: string; time: string; doctorName: string }[]
  >([]);
  useEffect(() => {
    getAvailableSlot().then((result) => {
      console.log(result);
      setSlots(result.slots);
    });
  }, []);
  return (
    <div>
      <h2 className="text-center mb-2 ">Available Slots</h2>
      <section className="flex flex-col items-center justify-center gap-4">
        {slots.map(
          (slot: {
            id: string;
            date: string;
            time: string;
            doctorName: string;
          }) => (
            <div
              key={crypto.randomUUID() + slot.id}
              className="w-full max-w-md rounded border border-gray-300 p-4"
            >
              <p>Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              <p>Doctor: {slot.doctorName}</p>
            </div>
          ),
        )}
      </section>
    </div>
  );
}
