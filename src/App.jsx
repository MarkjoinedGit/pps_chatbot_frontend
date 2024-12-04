import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/chatbot/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/chatbot/Dashboard";
import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import Information from "./pages/user/Information";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<AuthRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/info" element={<Information />} />
          </Route>
          <Route element={<GuestRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
