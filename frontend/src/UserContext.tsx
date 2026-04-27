import { createContext, useEffect, useState } from "react";
import { getUser } from "./utils";

type User = {
  id: string;
  email: string;
  type: "doctor" | "client";
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<User | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const user = async () => {
      const data = await getUser();
      console.log(data);
      return data;
    };
    user().then((result) => {
      if (result.success) {
        setUser(result.user);
      }
    });
  }, []);
  return <UserContext value={user}>{children}</UserContext>;
}
