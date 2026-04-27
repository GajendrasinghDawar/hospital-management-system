import { useState } from "react";
import { createAvailableSlot } from "../utils";

export function CreateAvailablity() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleCreateAvailability = async (formData: FormData) => {
    const date = formData.get("date");
    const time = formData.get("time");

    if (
      typeof date !== "string" ||
      typeof time !== "string" ||
      !date ||
      !time
    ) {
      setStatus("error");
      setMessage("Date and time are required");
      return;
    }

    setStatus("loading");
    setMessage("");

    const result = await createAvailableSlot({ date, time });

    if (result.success) {
      setStatus("success");
      setMessage("Availability created successfully");
      return;
    }

    setStatus("error");
    setMessage(result.message);
  };

  return (
    <div className="w-full max-w-md rounded border border-gray-300 p-4">
      <h3 className="mb-3 text-lg font-semibold">Create Availability</h3>
      <form action={handleCreateAvailability} className="flex flex-col gap-3">
        <input
          className="rounded border border-gray-400 px-3 py-2"
          type="date"
          name="date"
          required
        />
        <input
          className="rounded border border-gray-400 px-3 py-2"
          type="time"
          name="time"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded bg-rose-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Creating..." : "Create"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
