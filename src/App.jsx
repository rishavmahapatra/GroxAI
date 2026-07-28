// src/App.js
import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { SignIn } from "./components/SignIn.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Land from "./components/Land.jsx";
import Error from "./components/Error.jsx";

const Home = lazy(() => import("./components/Home.jsx"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("user"),
  );
  const [user, setUser] = useState();
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("questions");
    localStorage.removeItem("resumeId");
    localStorage.removeItem("answers");
    localStorage.removeItem("question_notes");
    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   localStorage.getItem("user") || token
  //     ? (console.log("User found"),
  //       handleLogin())
  //     : console.error("No User found");
  // }, [token]);
  // useEffect(() => {
  //   console.log("isAuthenticated: ", isAuthenticated);
  // }, [isAuthenticated]);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId="750789723123-1sd7uafuq4nrr52b3dm7lk5dhgmf7vn5.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route
              path="/signin"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <SignIn onLogin={handleLogin} user={setUser} />
                )
              }
            />
            <Route
              element={
                <MainLayout
                  onLogout={handleLogout}
                  user={user}
                  authenticated={isAuthenticated}
                />
              }
            >
              <Route
                path="/"
                // element={isAuthenticated ? <Navigate to="/home" /> : <Land />}
                element={<Land />}
              />

              <Route
                path="/home"
                element={
                isAuthenticated ? (
                  <Suspense fallback={<div></div>}>
                    <Home user={setUser} />
                  </Suspense>
                ) : (
                  <SignIn onLogin={handleLogin} user={setUser} />
                )
              }
                // {
                //   <Suspense fallback={<div></div>}>
                //     <Home user={setUser} />
                //   </Suspense>
                // }
              />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
