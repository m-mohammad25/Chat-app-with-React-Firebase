import { useEffect, useState } from "react";
import AddUser from "./AddUser/AddUser";
import { useUserStore } from "../../../lib/userStore/";
import { useChatStore } from "../../../lib/chatStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase/";
const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const item = res.data().chats;
        const promises = item.map(async (item) => {
          const userDocRef = doc(db, "users", item.recieverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(
          chatData.sort((a, b) => {
            b.updatedAt - a.updatedAt;
          })
        );
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  async function handleSelect(chat) {
    console.log(chat);
    changeChat(chat.chatId, chat.user);
  }

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

      {chats.map((chat) => (
        <div
          key={chat.chatId}
          className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]"
          onClick={() => handleSelect(chat)}
        >
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={chat.user.avatar || "../../../../public/avatar.png"}
            alt=""
          />
          <div className="flex flex-col g-[10px]">
            <span className="font-medium">{chat.user.username}</span>
            <p className="text-sm font-light">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
