import UserInfo from "./UserInfo/UserInfo";
import ChatList from "./ChatList/ChatList";
const List = () => {
  return (
    <div className="flex flex-col flex-1">
      <UserInfo />
      <ChatList />
    </div>
  );
};
export default List;
