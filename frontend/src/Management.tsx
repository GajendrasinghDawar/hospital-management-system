import { use } from "react";
import { UserContext } from "./userContext";

export function Management() {
  const user = use(UserContext);

  return (
    <section>
      {user?.type === "client" && (
        <>
          <h2>Welcome {user.email}</h2>
          <h3>Book an appointment</h3>

          <div></div>
        </>
      )}
      {user?.type === "doctor" && (
        <>
          <h2>Welcome Dr. {user.email}</h2>
          <h3>Your appointments</h3>
        </>
      )}
    </section>
  );
}
