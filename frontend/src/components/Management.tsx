import { use } from "react";
import { UserContext } from "../providers/UserContext";
import { CreateAvailablity } from "./CreateAvailability";
import ClientAppointments from "./ClientAppointments";

export function Management() {
  const user = use(UserContext);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {user?.type === "client" && (
        <>
          <h2>Welcome {user.email}</h2>
          <h3>Book an appointment</h3>
          <ClientAppointments />
          <div></div>
        </>
      )}

      {user?.type === "doctor" && (
        <>
          <h2>Welcome Dr. {user.email}</h2>
          <h3>Your appointments</h3>
          <CreateAvailablity />
        </>
      )}
    </section>
  );
}
