/******************* Get user information *******************/
const getBookingByDrId = async (_id) => {
  const res = await fetch(`/7800/bookings/user/${_id}`);
  const data = res.json();
  if (!res.ok) {
    throw Error(data.detail);
  }
  return data;
};

export { getBookingByDrId };
