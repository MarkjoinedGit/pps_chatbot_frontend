/******************* Get all chats *******************/
const getConversations = async () => {
  const res = await fetch("/7800/conversations");
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

/******************* Get user chats *******************/
const getUserConversations = async (email) => {
  const res = await fetch("/7800/conversations/user", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

/********************* Delete conversation *********************/
const deleteConversation = async (_id) => {
  const res = await fetch(`/7800/conversations/${_id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

/********************* Create conversation *********************/
const createConversation = async (user_id, topic) => {
  if (topic.trim() === "") {
    const randomString = Math.random().toString(36).substring(2, 5);
    topic = `new chat ${randomString}`;
  }

  const res = await fetch("/7800/conversations/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ user: user_id, topic }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

export {
  getConversations,
  getUserConversations,
  deleteConversation,
  createConversation,
};
