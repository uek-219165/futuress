import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Archives from "./pages/Archives";
import Notification from "./components/Notification";

function App() {
  return (
    <div className="container app">
      <Router>
        <Routes>
          <Route
            path="*"
            element={<ErrorPage code="404" message="Page not found :(" />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/archives" element={<Archives />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          progressClassName="toastProgress"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Notification />
      </Router>
    </div>
  );
}

export default App;
