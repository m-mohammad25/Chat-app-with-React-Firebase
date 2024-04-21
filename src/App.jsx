import Chat from "./Components/Chat/Chat";
import List from "./Components/List/List";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";

const App = () => {
  const user = false;
  return (
    <div className="w-[80vw] h-[90vh] bg-[rgba(17,25,40,0.75)] rounded-xl backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/[.125] border-solid flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
