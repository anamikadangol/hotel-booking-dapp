import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRooms from "./pages/SingleRooms";
import Booknow from "./pages/Booknow";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:slug" element={<SingleRooms />} />
          <Route path="/booknow/:slug" element={<Booknow />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;