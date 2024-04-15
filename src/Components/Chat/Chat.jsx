import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [message, setMessage] = useState("");
  function handleEmoji(e) {
    setMessage((prev) => prev + e.emoji);
    setOpenEmoji(false);
  }
  return (
    <div className="flex flex-col flex-[2] border-x border-solid border-x-[#dddddd35] h-full">
      <div className="top flex items-center justify-between p-5 border-b border-solid border-b-[#dddddd35]">
        <div className="user flex items-center gap-5">
          <img
            className="w-[60px] h-[60px] object-cover rounded-full"
            src="../../../../public/avatar.png"
            alt=""
          />
          <div className="texts flex flex-col gap-[5px]">
            <span className="text-lg font-bold">John Doe</span>
            <p className="text-sm text-[#a5a5a5]">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className="icons flex gap-5">
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../phone.png"
            alt=""
          />
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../video.png"
            alt=""
          />
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../edit.png"
            alt=""
          />
        </div>
      </div>
      <div className="center flex-1 p-5"></div>
      <div className="bottom mt-auto p-5 gap-5 flex items-center content-between border-solid border-t border-t-[#dddddd35] ">
        <div className="icons flex gap-5">
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../img.png"
            alt=""
          />
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../camera.png"
            alt=""
          />
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../mic.png"
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder="send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border-none outline-none text-[16px] text-white p-[10px] rounded-[10px] bg-[rgba(17,25,40,.5)] "
        />
        <div className="emoji relative">
          <img
            className="w-5 h-5 cursor-pointer"
            src="../../../emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker absolute left-0 bottom-[50px]">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="bg-[#5183fe] text-white border-none py-[10px] px-5 cursor-pointer rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
