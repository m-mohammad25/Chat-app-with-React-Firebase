import { auth, db, storage } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref } from "firebase/storage";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [sharedImgs, setSharedImgs] = useState([]);
  console.log(sharedImgs);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      let messages = res.data().messages;

      messages.forEach((msg) => {
        let imgSrc = msg?.img;
        if (typeof imgSrc === "undefined") return;
        let imgRef = ref(storage, msg?.img);
        let imgName = imgRef.name;
        setSharedImgs((prev) => [{ name: imgName, src: imgSrc }, ...prev]);
      });
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 detail">
      <div className="user py-[30px] px-5 flex flex-col items-center  gap-[15px] border-solid border-b border-b-[#dddddd35]">
        <img
          className="h-[100px] w-[100px] rounded-full object-cover "
          src={user?.avatar || "../../../avatar.png"}
          alt=""
        />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="flex flex-col p-5 gap-[25px] info ">
        <div className="option">
          <div className="flex items-center justify-between title">
            <span>Chat Settings</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="../../../arrowUp.png"
              alt=""
            />
          </div>
        </div>
        <div className="option">
          <div className="flex items-center justify-between title">
            <span>Chat Settings</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="../../../arrowUp.png"
              alt=""
            />
          </div>
        </div>
        <div className="option">
          <div className="flex items-center justify-between title">
            <span>Shared Photos</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="../../../arrowDown.png"
              alt=""
            />
          </div>
          {sharedImgs?.map((img) => (
            <>
              <div className="flex flex-col gap-5 mt-5 photos" key={img.name}>
                <div className="flex items-center justify-between photoItem">
                  <div className="flex items-center gap-5 photoDetail">
                    <img
                      className="object-cover w-10 h-10 rounded-lg"
                      src={img.src}
                      alt=""
                    />
                    <span className="text-sm font-light text-gray-400">
                      {img.name}
                    </span>
                  </div>
                  <a href={img.src} download={img.name}>
                    <img
                      className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                      src="../../../download.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="option">
          <div className="flex items-center justify-between title">
            <span>Shared Files</span>
            <img
              className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
              src="../../../arrowUp.png"
              alt=""
            />
          </div>
        </div>
        <button
          onClick={handleBlock}
          className=" p-4 text-white border-none rounded-md cursor-pointer bg-[rgba(230,74,105,.553)] hover:bg-[rgba(220,20,60,.794)]"
        >
          {isCurrentUserBlocked
            ? "You Are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button
          className="p-[10px] bg-[#1a73eb] rounded-md"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Detail;
