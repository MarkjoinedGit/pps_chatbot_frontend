import { useContext, useEffect, useState } from "react";
import { getAllRecords } from "../../controllers/medicalRcController";
import Record from "../../components/Record";
import { getAllUserInfo } from "../../controllers/userController";
import UserInfo from "../../components/userInfo";
import { getBookingByDrId } from "../../controllers/bookingController";
import { UserContext } from "../../contexts/UserContext";
import Booking from "../../components/Booking";

const MedicalRecord = () => {
  const { user } = useContext(UserContext);

  const [records, setRecords] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [currentTab, setCurrentTab] = useState("records");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecords();
        const reversedRecords = [...data].reverse();
        setRecords(reversedRecords);

        const userdt = await getAllUserInfo();
        setUserInfo(userdt);

        const bookingdt = await getBookingByDrId(user.user_id);
        setBookings(bookingdt);
        setBookings(bookingdt);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const filterRecord =
    searchTerm.trim() === ""
      ? records
      : records.filter(
          (record) =>
            record.user_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            record.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const filterUser =
    searchTerm.trim() === ""
      ? userInfo
      : userInfo.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleSelectRecord = (_id) => {
    setSelectedRecordId((prevID) => (prevID === _id ? null : _id));
  };

  return (
    <div>
      <div className="sticky-chat top-0 z-10">
        <div>
          <div className="p-4 w-full flex justify-center">
            <div className="sticky-chat-compoment max-w-sm rounded-3xl">
              <i className="fa-solid fa-magnifying-glass text-slate-400 pr-2"></i>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email..."
                className="max-w-sm focus:outline-none text-xl text-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            currentTab === "records"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("records")}
        >
          Xem Bản Ghi
        </button>
        <button
          className={`px-4 py-2 rounded ${
            currentTab === "users" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("users")}
        >
          Xem Người Dùng
        </button>
        <button
          className={`px-4 py-2 rounded ${
            currentTab === "bookings"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setCurrentTab("bookings")}
        >
          Lịch hẹn
        </button>
      </div>

      {currentTab === "records" && (
        <div className="mt-4">
          {filterRecord &&
            filterRecord.map((record) => (
              <div key={record._id}>
                <Record
                  record={record}
                  showDetail={record._id === selectedRecordId}
                >
                  <div className="flex items-start gap-2">
                    <button
                      className="fa-solid fa-eye nav-link text-indigo-500 hover:bg-indigo-200"
                      title="Xem chi tiết báo cáo"
                      onClick={() => handleSelectRecord(record._id)}
                    ></button>
                  </div>
                </Record>
              </div>
            ))}
        </div>
      )}

      {currentTab === "users" && (
        <div className="mt-4">
          {filterUser && filterUser.length > 0 ? (
            filterUser.map((user) => (
              <div key={user.id}>
                <UserInfo info={user} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có thông tin người dùng nào.</p>
          )}
        </div>
      )}

      {currentTab === "bookings" && (
        <div className="mt-4">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.medical_record}>
                <Booking
                  booking={booking}
                  showDetail={booking.medical_record === selectedRecordId}
                >
                  <div className="flex items-start gap-2">
                    <button
                      className="fa-solid fa-eye nav-link text-indigo-500 hover:bg-indigo-200"
                      title="Xem chi tiết báo cáo"
                      onClick={() => handleSelectRecord(booking.medical_record)}
                    ></button>
                  </div>
                </Booking>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có thông tin người dùng nào.</p>
          )}
        </div>
      )}
    </div>
  );
};
export default MedicalRecord;
