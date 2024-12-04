import { useContext, useEffect, useRef, useState } from "react";
import { createChat } from "../controllers/chatController";
import ReactMarkdown from "react-markdown";
import { ConvContext } from "../contexts/ConvContext";
import Alert from "./Alert";
import { UserContext } from "../contexts/UserContext";

const Chat = () => {
  const { conv, setConv } = useContext(ConvContext);
  const { user } = useContext(UserContext);

  const chatEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setError(null);
  }, [conv.chats]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newUserMessage = { role: "user", message: message };

    setConv((prevConv) => ({
      ...prevConv,
      chats: [...prevConv.chats, newUserMessage],
    }));
    setIsTyping(true);
    setMessage("");

    try {
      const data = await createChat(conv.conv_id, user.user_id, message);
      if (!conv.conv_id) {
        setConv((conv) => ({
          ...conv,
          conv_id: data.conversation,
        }));
      }
      const newBotMessage = {
        role: "bot",
        message: data.botchat,
      };
      setConv((prevConv) => ({
        ...prevConv,
        chats: [...prevConv.chats, newBotMessage],
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleScheduleConsultation = () => {
    setMessage("appointment [Đặt lịch hẹn]");
  };

  const handleSetReminder = () => {
    setMessage("remind [Đặt nhắc nhở]");
  };

  return (
    <div className="flex flex-col h-full">
      <section className="flex-grow space-y-4 p-4 overflow-auto">
        {conv.chats.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {chat.role !== "user" && (
              <i className="fa-solid fa-user-circle text-xl mr-2 mt-auto"></i>
            )}

            <ReactMarkdown
              className={`inline-block px-4 py-2 rounded-lg break-words ${
                chat.role === "user"
                  ? "bg-indigo-500 text-white max-w-xs"
                  : "bg-gray-200 text-black"
              }`}
            >
              {chat.message}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={chatEndRef} />
      </section>

      <div className={isTyping ? "block" : "hidden"}>
        <p className="text-center italic text-gray-500">Typing...</p>
      </div>

      {error ? (
        <Alert msg={error} />
      ) : (
        <div className="sticky-chat">
          <div>
            <div className="flex justify-center"></div>
            <form id="inputForm" onSubmit={handleChat} className="p-4 w-full">
              <div className="sticky-chat-compoment">
                <textarea
                  value={message}
                  placeholder="Nhập nội dung tin nhắn..."
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full  resize-none focus:outline-none text-xl overflow-y-auto"
                  autoFocus
                  autoComplete="off"
                  rows="2"
                />

                <div className="flex justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      title="Đặt lịch tư vấn"
                      className="btn-chat bg-orange-200 hover:bg-orange-300"
                      onClick={handleScheduleConsultation}
                    >
                      <i className="fa-solid fa-calendar-plus"></i>
                    </button>
                    <button
                      type="button"
                      title="Đặt lịch nhắc nhở"
                      className=" btn-chat bg-green-200 hover:bg-green-300"
                      onClick={handleSetReminder}
                    >
                      <i className="fa-solid fa-bell"></i>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-chat bg-indigo-500 hover:bg-indigo-600 ml-auto"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
