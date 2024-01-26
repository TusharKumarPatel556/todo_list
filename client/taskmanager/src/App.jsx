import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
// import HomePage from "./pages/HomePage/HomePage";
import "./App.css";

const LazyHome = React.lazy(() => import("./pages/HomePage/HomePage"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <React.Suspense fallback={"Loading..."}>
              <LazyHome />
            </React.Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
