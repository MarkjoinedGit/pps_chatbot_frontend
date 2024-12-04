import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserInfo } from "../../controllers/userController";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";

const Information = () => {
  const { user, setUser } = useContext(UserContext);

  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo(user.user_id);
        setInfo(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError("Không tải được thông tin");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="card w-full max-w-lg mx-auto mt-24 p-6 flex items-center border rounded-lg shadow-md">
        {info ? (
          <>
            {" "}
            {/* Thông tin user */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4 text-indigo-600">
                Thông tin cá nhân
              </h1>
              <p className="mb-2">
                <span className="font-semibold">Tên:</span> {info.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {info.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Emotion:</span>
                <span
                  className={`ml-2 first-letter:uppercase ${
                    info.emotion === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {info.emotion}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Role:</span>
                {info.isDoctor ? " doctor" : " user"}
              </p>
              <Link to="/dashboard">
                <button className="btn bg-white hover:bg-slate-100 text-indigo-900 border-0 outline-0 ring-1 ring-indigo-500 mt-10 active:bg-indigo-200 ">
                  Thoát
                </button>
              </Link>
            </div>
            <div className="ml-6">
              <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="8" r="4" /> {/* Đầu hình tròn */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 14H8a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4z" // Thân hình người
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <Alert msg={error} />
        )}
      </section>
    </>
  );
};

export default Information;
