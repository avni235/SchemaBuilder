import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1c1f] text-white flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-[#0d0d0d] flex items-center justify-between px-6 py-4">
        <div className="text-white text-lg font-semibold tracking-wide">
          {"{  }"}
        </div>
        <button
          onClick={() => navigate("/builder")}
          className="bg-[#1a1a1a] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#2a2a2a] transition"
        >
          Get Started
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          JSON Schema<br />Builder
        </h1>
        <p className="text-[#A1A1AA] text-base md:text-lg mb-8 max-w-lg">
          Build and edit JSON schemas with a dynamic UI
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="bg-white text-black text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Get Started
        </button>
      </div>

<div className="hidden md:block absolute bottom-20 left-80 w-24 h-24 bg-[#4e4b4b] rotate-[30deg] rounded-xl opacity-20"></div>
<div className="hidden md:block absolute bottom-28 right-20 w-20 h-20 bg-[#4e4b4b] rotate-[60deg] rounded-xl opacity-20"></div>
<div className="hidden md:block absolute bottom-6 left-10 w-16 h-16 bg-[#514e4e] rotate-[45deg] rounded-xl opacity-25"></div>
<div className="hidden md:block absolute bottom-6 right-80 w-24 h-24 bg-[#bba7a7] rotate-[15deg] rounded-xl opacity-15"></div>

    </div>
  );
};

export default LandingPage;
