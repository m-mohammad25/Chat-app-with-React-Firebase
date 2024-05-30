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
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({ file: null, url: null });

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
      let imgUrl = null;
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
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
    setText("");
    setImg({ file: null, url: null });
  }
  const handleImg = (e) => {
    if (!e.target.files[0]) return;
    setImg({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };
  return (
    <div className="flex flex-col flex-[2] border-x border-solid border-x-[#dddddd35] h-full">
      <div className="top flex items-center justify-between p-5 border-b border-solid border-b-[#dddddd35]">
        <div className="flex items-center gap-5 user">
          <img
            className="w-[60px] h-[60px] object-cover rounded-full"
            src={user?.avatar || "avatar.png"}
            alt=""
          />
          <div className="texts flex flex-col gap-[5px]">
            <span className="text-lg font-bold">{user?.username}</span>
            <p className="text-sm text-[#a5a5a5]">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className="flex gap-5 icons">
          <img className="w-5 h-5 cursor-pointer" src="phone.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="video.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="edit.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-5 p-5 overflow-y-scroll center">
        {chat?.messages?.map((message) => (
          <>
            <div
              key={message?.createdAt}
              className={
                (message?.senderId === currentUser?.id
                  ? "self-end"
                  : "self-start") + " message max-w-[70%] flex gap-5"
              }
            >
              <div className="texts flex flex-1 flex-col gap-[5px]">
                {message.img && (
                  <img
                    className="w-full h-[300px] rounded-lg object-cover"
                    src={message.img}
                    alt=""
                  />
                )}
                <p
                  className={
                    (message?.senderId === currentUser?.id
                      ? "bg-[#5183fe]"
                      : "bg-[rgba(17,25,40,0.3)]") + " p-5 rounded-[10px]"
                  }
                >
                  {message.text}
                </p>
                {/* <span className="text-sm">{message.createdAt}</span> */}
              </div>
            </div>
          </>
        ))}
        {img.url && (
          <div className="message own  self-end max-w-[70%] flex gap-5">
            <div className="texts flex flex-1 flex-col gap-[5px]">
              <img
                className="w-full h-[300px] rounded-lg object-cover"
                src={img.url}
                alt=""
              />
              {/* <span className="text-sm">{message.createdAt}</span> */}
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom mt-auto p-5 gap-5 flex items-center content-between border-solid border-t border-t-[#dddddd35] ">
        <div className="flex gap-5 icons">
          <label htmlFor="img">
            <img className="w-5 h-5 cursor-pointer" src="img.png" alt="" />
          </label>
          <input id="img" type="file" className="hidden" onChange={handleImg} />
          <img className="w-5 h-5 cursor-pointer" src="camera.png" alt="" />
          <img className="w-5 h-5 cursor-pointer" src="mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You Cannot Send a Message"
              : "send a message"
          }
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="disabled:cursor-not-allowed flex-1 border-none outline-none text-[16px] text-white p-[10px] rounded-[10px] bg-[rgba(17,25,40,.5)] "
        />
        <div className="relative emoji">
          <img
            className="w-5 h-5 cursor-pointer"
            src="emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker absolute left-0 bottom-[50px]">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          onClick={handleSend}
          className="bg-[#5183fe] text-white border-none py-[10px] px-5 cursor-pointer rounded-md disabled:bg-[#5182febe4] disabled:cursor-not-allowed"
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
