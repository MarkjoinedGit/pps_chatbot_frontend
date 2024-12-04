import { useEffect, useState } from "react";
import Record from "./Record";
import { getRecordById } from "../controllers/medicalRcController";

const Booking = ({ booking, children, showDetail }) => {
  const bookingDate = new Date(booking.booking_date);
  const [record, setRecord] = useState(null);

  const date = bookingDate.toLocaleDateString("vi-VN");
  const time = bookingDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecordById(booking.medical_record);
        setRecord(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">
            Lịch hẹn ngày: {date}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-gray-700">Thời gian:</span> {time}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">Người tư vấn:</span>{" "}
            {booking.doctor_name}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">
              Người yêu cầu tư vấn:
            </span>{" "}
            {booking.user_name}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">Email:</span>{" "}
            {booking.user_email}
          </p>
        </div>
        {/* Nút hành động */}
        <div className="flex gap-2">{children}</div>
      </div>

      {showDetail && <Record record={record} showDetail={true} />}

      <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6"></div>
    </div>
  );
};

export default Booking;
