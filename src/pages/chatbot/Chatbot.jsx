import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Chat from "../../components/Chat";
import { logoutUser } from "../../controllers/userController";
import MedicalRecord from "../doctor/MedicalRecord";

const Chatbot = ({ activeComp, setActiveComp }) => {
  const { user, setUser } = useContext(UserContext);

  const handleShowChat = () => setActiveComp("chat");
  const handleShowReport = () => setActiveComp("report");

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm("Confirm logout")) {
      try {
        localStorage.removeItem("email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("is_doctor");
        navigate("/");
        setUser({
          email: null,
          user_id: user.user_id,
          is_doctor: user.is_doctor,
          conversations: [],
        });
        const data = await logoutUser(user.user_id);
        setUser({
          email: null,
          user_id: null,
          is_doctor: false,
          conversations: [],
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <section>
      <header className="bg-indigo-500 text-white rounded-tr-md rounded-br-md sticky top-0 z-10">
        <nav className="flex items-center justify-between p-4">
          <Link title="Home">PPSBot</Link>

          {user.email && (
            <div className="flex item-start gap-2">
              {user.is_doctor && (
                <button
                  title={
                    activeComp === "chat" ? "Báo cáo tình trạng" : "Trò chuyện"
                  }
                  className={`fa-solid ${
                    activeComp === "chat" ? "fa-notes-medical" : "fa-comments"
                  } nav-link`}
                  onClick={
                    activeComp === "chat" ? handleShowReport : handleShowChat
                  }
                ></button>
              )}
              <Link
                title="Thông tin người dùng"
                className="fa-solid fa-user nav-link"
                to="/info"
              ></Link>

              <button
                title="Đăng xuất"
                className="fa-solid fa-right-from-bracket nav-link"
                onClick={handleLogout}
              ></button>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-grow m-auto flex flex-col">
        {activeComp === "chat" && <Chat />}
        {activeComp === "report" && <MedicalRecord />}
      </main>
    </section>
  );
};

export default Chatbot;
