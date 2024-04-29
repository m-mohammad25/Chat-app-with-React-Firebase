import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  }

  async function handleSend() {
    if (text == "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.map(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapshot = await getDoc(userChatRef);
        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      <div className="center flex-1 p-5 flex flex-col gap-5 overflow-y-scroll">
        {chat?.messages?.map((message) => (
          <div
            key={message?.createdAt}
            className="message own  self-end max-w-[70%] flex gap-5"
          >
            <div className="texts flex flex-1 flex-col gap-[5px]">
              {message.img && (
                <img
                  className="w-full h-[300px] rounded-lg object-cover"
                  src={message.img}
                  alt=""
                />
              )}
              <p className="bg-[#5183fe] p-5 rounded-[10px]">{message.text}</p>
              {/* <span className="text-sm">{message.createdAt}</span> */}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
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
        <button
          onClick={handleSend}
          className="bg-[#5183fe] text-white border-none py-[10px] px-5 cursor-pointer rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
