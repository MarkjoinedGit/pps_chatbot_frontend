const Record = ({ record, children, showDetail }) => {
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">
            Trạng thái cảm xúc: {record.emotional_state}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-gray-700">Người dùng:</span>{" "}
            {record.user_name}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">Email:</span>{" "}
            {record.user_email}
          </p>
        </div>
        {/* Nút hành động */}
        <div className="flex gap-2">{children}</div>
      </div>

      {showDetail && (
        <>
          <div className="mt-4">
            <p className="text-sm text-gray-700 font-bold">
              Tóm tắt lịch sử tư vấn:
            </p>
            <p className="text-sm text-gray-600">
              {record.therapy_suggestions}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-700 font-bold">Mối bận tâm:</p>
            <p className="text-sm text-gray-600">{record.concerns}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-700 font-bold">Đề xuất trị liệu:</p>
            <p className="text-sm text-gray-600">
              {record.therapy_suggestions}
            </p>
          </div>
        </>
      )}

      <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6"></div>
    </div>
  );
};

export default Record;
