import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../controllers/userController";
import Alert from "../../components/Alert";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(name, email, password, confirmPassword);
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
      <h1 className="title">Đăng ký tài khoản mới</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Tên của bạn"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
          type="email"
          placeholder="Địa chỉ email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn">
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-3xl block text-center"></i>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      <Link to="/login">
        <button className="btn bg-white hover:bg-slate-100 text-indigo-900 border-0 outline-0 ring-1 ring-indigo-500 mt-2 active:bg-indigo-200">
          Đã có tài khoản? Đăng nhập
        </button>
      </Link>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
