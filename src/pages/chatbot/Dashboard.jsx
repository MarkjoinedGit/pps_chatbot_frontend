import { useContext, useState } from "react";
import Chatbot from "./Chatbot";
import History from "./History";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);

  const [activeComp, setActiveComp] = useState("chat");

  return (
    <section className="flex h-screen bg-white overflow-hidden">
      <div className="w-1/4 bg-gray-100 border-r overflow-auto h-full">
        <History setActiveComp={setActiveComp} />
      </div>

      <div className="w-3/4 overflow-auto h-full">
        <Chatbot activeComp={activeComp} setActiveComp={setActiveComp} />
      </div>
    </section>
  );
};

export default Dashboard;
