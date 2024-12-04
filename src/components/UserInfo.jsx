const UserInfo = ({ info }) => {
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">
            {info.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-gray-700">Emai:</span> {info.email}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-gray-700">Cảm xúc:</span>{" "}
            <span
              className={`ml-2 first-letter:uppercase ${
                info.emotion === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {info.emotion}
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold text-gray-700">Vai trò:</span>
            {info.isDoctor ? " doctor" : " user"}
          </p>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6"></div>
    </div>
  );
};
export default UserInfo;
