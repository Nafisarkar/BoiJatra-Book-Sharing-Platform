import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./provider/ThemeProvider";
import Post from "./pages/Post";
import { UserProvider } from "./provider/UserProvider";
import Deshboard from "./pages/Deshboard";
import AddPost from "./pages/AddPost";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/deshboard" element={<Deshboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
