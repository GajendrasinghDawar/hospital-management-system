import { useEffect, useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { Management } from "./components/Management";
import { UserContext, UserContextProvider } from "./providers/UserContext";
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
          <Management />
        </div>
      )}
    </UserContextProvider>
  );
}

export default App;
