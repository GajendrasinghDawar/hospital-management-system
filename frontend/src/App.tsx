import { useEffect, useState } from "react";
import "./App.css";
import { LoginScreen } from "./LoginScreen";
import { Management } from "./Management";
import { UserContext, UserContextProvider } from "./userContext";
import { use } from "react";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login_screen");
  const user = use(UserContext);
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentScreen("home_screen");
    }
  }, [user]);

  return (
    <UserContextProvider>
      {currentScreen === "login_screen" ? (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      ) : (
        <div>
          <h1>Hospital Management system</h1>
          <Management />
        </div>
      )}
    </UserContextProvider>
  );
}

export default App;
