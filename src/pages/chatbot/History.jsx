import { useContext, useEffect, useState } from "react";
import Conversation from "../../components/Conversation";
import { UserContext } from "../../contexts/UserContext";
import {
  deleteConversation,
  getConversations,
  getUserConversations,
} from "../../controllers/conversationController";
import Alert from "../../components/Alert";
import Success from "../../components/Success";
import { Link } from "react-router-dom";
import { getConvChat } from "../../controllers/chatController";
import { ConvContext } from "../../contexts/ConvContext";

const History = ({ setActiveComp }) => {
  const { user, setUser } = useContext(UserContext);
  const { conv, setConv } = useContext(ConvContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // useEffect((e) => {
  //   const fetchData = async () => {
  //     try {
  //       const userConvs = await getUserConversations(user.email);

  //       const reversedConvs = [...userConvs].reverse();

  //       setUser({
  //         email: user.email,
  //         user_id: user.user_id,
  //         conversations: reversedConvs,
  //       });

  //       setLoading();
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   console.log("User thay đổi");

  //   fetchData();
  // }, [user]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const userConvs = await getUserConversations(user.email);

        const reversedConvs = [...userConvs].reverse();

        setUser({
          email: user.email,
          user_id: user.user_id,
          is_doctor: user.is_doctor,
          conversations: reversedConvs,
        });

        setLoading();
      } catch (error) {
        setError(error.message);
      }
    }, 0);
  }, [conv.conv_id]);

  const handleNewChat = () => {
    setConv((prevConv) => ({
      ...prevConv,
      conv_id: null,
      chats: [],
    }));
  };

  const handleDelete = async (_id) => {
    if (confirm("Confirm delete")) {
      try {
        const data = await deleteConversation(_id);
        setSuccess(data.message);
      } catch (error) {
        setError(data.detail);
      }
      const newConvs = user.conversations.filter((conv) => conv._id !== _id);
      setUser({ ...user, conversations: newConvs });
    }
  };

  const handleLoadChat = async (_id) => {
    try {
      const data = await getConvChat(_id);

      const chats = data.flatMap((item) => {
        const messages = [];
        if (item.userchat) {
          messages.push({ role: "user", message: item.userchat });
        }
        if (item.botchat) {
          messages.push({ role: "bot", message: item.botchat });
        }
        return messages;
      });

      setConv((prevConv) => ({
        ...prevConv,
        conv_id: _id,
        chats,
      }));

      setActiveComp("chat");
    } catch (error) {
      console.log(data.detail);
    }
  };

  return (
    <section className="card p-0">
      <header className="bg-indigo-500 text-white rounded-tl-md rounded-bl-md sticky top-0 z-10">
        <nav className="flex items-center justify-between p-4">
          <Link title="Home">Cuộc hội thoại gần đây</Link>
          <div className="flex items-start gap-2">
            {/* <button className="fa-solid fa-sliders nav-link"></button> */}
            <button
              className="fa-solid fa-plus nav-link"
              title="New chat"
              onClick={handleNewChat}
            ></button>
          </div>
        </nav>
      </header>

      <main>
        {error && <Alert msg={error} />}
        {success && <Success msg={success} />}

        {loading && (
          <i className="fa-solid fa-spinner animate-spin text-3xl block text-center"></i>
        )}

        {user.conversations &&
          user.conversations.map((conversation) => (
            <div key={conversation._id}>
              <Conversation conversation={conversation}>
                <div className="flex items-start gap-2">
                  <button
                    className="fa-solid fa-download nav-link text-green-500 hover:bg-green-200"
                    title="Load chat"
                    onClick={() => handleLoadChat(conversation._id)}
                  ></button>
                  <button
                    className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                    title="Delete"
                    onClick={() => handleDelete(conversation._id)}
                  ></button>
                </div>
              </Conversation>
            </div>
          ))}
      </main>
    </section>
  );
};

export default History;
