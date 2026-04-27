import { useEffect, useState } from "react";
import "./App.css";
import { LoginScreen } from "./LoginScreen";
import { getUser } from "./utils";
import { Management } from "./Management";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login_screen");

  useEffect(() => {
    const user = async () => {
      const data = await getUser();
      return data;
    };
    user().then((result) => {
      if (result.success) {
        setCurrentScreen("home_screen");
      }
    });
  }, []);

  switch (currentScreen) {
    case "login_screen":
      return <LoginScreen setCurrentScreen={setCurrentScreen} />;
    case "home_screen":
      return (
        <div>
          <h1>Hospital Management system</h1>
          <Management />
        </div>
      );
  }
}

export default App;
