import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Projects from "./components/projects/Projects";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
