const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/******************* Get user information *******************/
const getBookingByDrId = async (_id) => {
  const res = await fetch(`${API_BASE_URL}/bookings/user/${_id}`);
  const data = res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

export { getBookingByDrId };
