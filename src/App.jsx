import Chat from "./Components/Chat/Chat";
import List from "./Components/List/List";
import Detail from "./Components/Detail/Detail";

const App = () => {
  return (
    <div className="w-[80vw] h-[90vh] bg-[rgba(17,25,40,0.75)] rounded-xl backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/[.125] border-solid flex">
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default App;
