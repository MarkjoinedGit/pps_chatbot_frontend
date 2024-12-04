/******************* Get chats by id *******************/
const getConvChat = async (_id) => {
  if (!_id) {
    throw Error("Conversation id is required");
  }

  const res = await fetch(`/7800/chats/conv/${_id}`);

  const data = res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

/******************* Create chat *******************/
const createChat = async (conv_id, user_id, userchat) => {
  if (!conv_id && !user_id) {
    throw Error("Conversation id and userchat is required");
  }

  const res = await fetch("/7800/chats/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(
      conv_id
        ? { conversation: conv_id, userchat }
        : { user: user_id, userchat }
    ),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

export { getConvChat, createChat };
