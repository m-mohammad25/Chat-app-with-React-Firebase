import { useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (!e.target.files[0]) return;
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleLogin = function (e) {
    e.preventDefault();
    // toast.warn("hey!");
  };
  return (
    <div className="login w-full h-full flex items-center gap-[100px]">
      <div className="flex flex-col items-center flex-1 gap-5 item">
        <h2>Welcome back</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center flex-1 gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <button className="w-full p-5 border-none bg-[#1f8ef1] text-white rounded-md font-medium">
            Sign In
          </button>
        </form>
      </div>
      <div className="separator h-[80%] w-[2px] bg-[#dddddd35] rounded-sm"></div>
      <div className="flex flex-col items-center flex-1 gap-5 item">
        <h2>Create an Account</h2>
        <form className="flex flex-col items-center justify-center flex-1 gap-5">
          <label
            htmlFor="file"
            className="flex items-center justify-between w-full underline cursor-pointer"
          >
            <img
              src={avatar.url || "../../../avatar.png"}
              alt=""
              className="w-[50px] h-[50px] rounded-[10px] object-cover opacity-60"
            />
            Upload an Image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="email"
            className="p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-md"
          />
          <button className="w-full p-5 border-none bg-[#1f8ef1] text-white rounded-md font-medium">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
