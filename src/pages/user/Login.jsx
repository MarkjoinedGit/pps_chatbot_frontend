import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/userController";
import Alert from "../../components/Alert";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setUser({
        email,
        user_id: data.user._id,
        is_doctor: data.user.isDoctor,
        conversations: [],
      });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="card w-full max-w-sm mx-auto mt-24 p-6">
      <h1 className="title">Đăng nhập bằng tài khoản của bạn</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Địa chỉ email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-3xl block text-center"></i>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <Link to="/register">
        <button className="btn bg-white hover:bg-slate-100 text-indigo-900 border-0 outline-0 ring-1 ring-indigo-500 mt-2 active:bg-indigo-200">
          Đăng ký
        </button>
      </Link>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Login;
