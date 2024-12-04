import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="card w-full max-w-5xl mx-auto mt-24 p-6">
      <h1 className="title">
        Chào bạn! Khoảng thời gian sau sinh chắc hẳn là một giai đoạn đầy thử
        thách, phải không? Chúng tôi hiểu những khó khăn bạn đang đối mặt và
        luôn sẵn sàng đồng hành cùng bạn để giải tỏa những lo lắng. Hãy chia sẻ
        cùng chúng tôi, bạn nhé!
      </h1>
      <Link to="/dashboard">
        <div className="flex justify-center">
          <button className="btn max-w-fit bg-white hover:bg-slate-100 text-indigo-900 border-0 outline-0 ring-1 rounded-2xl ring-indigo-500 mt-2 active:bg-indigo-200 gap-2">
            Bắt đầu trò chuyện
            <i className="fa-solid fa-arrow-right ml-2 " />
          </button>
        </div>
      </Link>
    </section>
  );
};

export default Home;
