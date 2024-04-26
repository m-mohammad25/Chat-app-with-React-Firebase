import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";
function AddUser() {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addUser w-max h-max p-[30px] bg-[rgba(17,25,40,0.781)] rounded-[10px] absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form onSubmit={handleSearch} className="flex gap-5">
        <input
          className="p-5 rounded-[10px] border-none outline-none text-black"
          type="text"
          placeholder="Username"
          name="username"
        />
        <button className="p-5 rounded-[10px] border-none text-white bg-[#1a73e8]">
          Search
        </button>
      </form>
      {user && (
        <div className="user mt-[50px] flex items-center justify-between">
          <div className="flex items-center gap-5 detail">
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={user.avatar || "../../../../../avatar.png"}
              alt="avatar"
            />
            <span>{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="p-[10px] rounded-[10px] border-none text-white bg-[#1a73e8] "
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
