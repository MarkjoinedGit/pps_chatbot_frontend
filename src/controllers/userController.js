const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/******************* Login user *******************/
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("Vui lòng nhập đầy đủ thông tin!");
  }

  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  localStorage.setItem("email", email);
  localStorage.setItem("user_id", data.user._id);
  localStorage.setItem("is_doctor", data.user.isDoctor);

  return data;
};

/******************* Register user *******************/
const registerUser = async (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    throw Error("Vui lòng nhập đầy đủ thông tin!");
  }

  if (password !== confirmPassword) {
    throw Error("Mật khẩu không khớp");
  }

  const res = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  localStorage.setItem("email", email);
  localStorage.setItem("user_id", data._id);
  localStorage.setItem("is_doctor", data.isDoctor);

  return data;
};

/******************* Logout user *******************/
const logoutUser = async (_id) => {
  const res = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.detail);
  }

  return data;
};

/******************* Get user information *******************/
const getUserInfo = async (_id) => {
  const res = await fetch(`${API_BASE_URL}/users/${_id}`);
  const data = res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

/******************* Get user information *******************/
const getAllUserInfo = async () => {
  const res = await fetch(`${API_BASE_URL}/users/`);
  const data = res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

export { loginUser, registerUser, logoutUser, getUserInfo, getAllUserInfo };
