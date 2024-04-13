const UserInfo = () => {
  return (
    <div className="flex items-center justify-between p-5 ">
      <div className="flex items-center gap-5">
        <img
          className="rounded-full object-cover h-[50px] w-[50px]"
          src="./avatar.png"
          alt=""
        />
        <h2>John Doe</h2>
      </div>
      <div className="flex gap-5">
        <img className="w-5 h-5 cursor-pointer" src="./more.png" alt="" />
        <img className="w-5 h-5 cursor-pointer" src="./video.png" alt="" />
        <img className="w-5 h-5 cursor-pointer" src="./edit.png" alt="" />
      </div>
    </div>
  );
};
export default UserInfo;
