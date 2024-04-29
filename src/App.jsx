import Chat from "./Components/Chat/Chat";
import List from "./Components/List/List";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="p-[50px] text-4xl rounded-[10px] bg-[rgba(17,25,40,0.9)]">
        Loading...
      </div>
    );
  return (
    <div className="w-[80vw] h-[90vh] bg-[rgba(17,25,40,0.75)] rounded-xl backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/[.125] border-solid flex">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
