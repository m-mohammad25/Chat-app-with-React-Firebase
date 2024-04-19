import { useState } from "react";
import AddUser from "./AddUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="flex-1 overflow-y-scroll chatList">
      <div className="flex items-center flex-1 gap-5 p-5">
        <div className="flex  items-center gap-5 p-[10px] rounded-[10px] bg-[rgba(17,25,40,0.5)]">
          <img className="w-5 h-5" src="../../../../public/search.png" alt="" />
          <input
            className="flex-1 overflow-hidden text-white bg-transparent border-none outline-none"
            type="text"
            placeholder="search"
            name=""
            id=""
          />
        </div>
        <img
          className="w-9 h-9 bg-[rgba(17,25,40,.5)] cursor-pointer p-[10px] rounded-[10px]"
          src={
            !addMode
              ? "../../../../public/plus.png"
              : "../../../../public/minus.png"
          }
          onClick={() => setAddMode((prev) => !prev)}
          alt=""
        />
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="../../../../public/avatar.png"
          alt=""
        />
        <div className="flex flex-col g-[10px]">
          <span className="font-medium">John Doe</span>
          <p className="text-sm font-light">hello</p>
        </div>
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="../../../../public/avatar.png"
          alt=""
        />
        <div className="flex flex-col g-[10px]">
          <span className="font-medium">John Doe</span>
          <p className="text-sm font-light">hello</p>
        </div>
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="../../../../public/avatar.png"
          alt=""
        />
        <div className="flex flex-col g-[10px]">
          <span className="font-medium">John Doe</span>
          <p className="text-sm font-light">hello</p>
        </div>
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="../../../../public/avatar.png"
          alt=""
        />
        <div className="flex flex-col g-[10px]">
          <span className="font-medium">John Doe</span>
          <p className="text-sm font-light">hello</p>
        </div>
      </div>
      <div className="item flex items-center gap-5 p-5 cursor-pointer item  border-b-[#dddddd35]">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="../../../../public/avatar.png"
          alt=""
        />
        <div className="flex flex-col g-[10px]">
          <span className="font-medium">John Doe</span>
          <p className="text-sm font-light">hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
