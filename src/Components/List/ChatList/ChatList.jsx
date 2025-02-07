import { useEffect, useState } from "react";
import AddUser from "./AddUser/AddUser";
import { useUserStore } from "../../../lib/userStore/";
import { useChatStore } from "../../../lib/chatStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/";
const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [filterTxt, setFilterTxt] = useState("");
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
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((c) => c.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  }
  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(filterTxt.toLocaleLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-scroll chatList">
      <div className="flex items-center flex-1 gap-5 p-5">
        <div className="flex  items-center gap-5 p-[10px] rounded-[10px] bg-[rgba(17,25,40,0.5)]">
          <img className="w-5 h-5" src="../../../../public/search.png" alt="" />
          <input
            className="flex-1 overflow-hidden text-white bg-transparent border-none outline-none"
            type="text"
            placeholder="search"
            onChange={(e) => setFilterTxt(e.target.value)}
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

      {filteredChats.map((chat) => (
        <div
          key={chat.chatId}
          className="item flex items-center gap-5 p-5 cursor-pointer item border-b border-solid border-b-[#dddddd35]"
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "../../../../public/avatar.png"
                : chat.user.avatar || "../../../../public/avatar.png"
            }
            alt=""
          />
          <div className="flex flex-col g-[10px]">
            <span className="font-medium">
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p className="text-sm font-light">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};
export default ChatList;
