function AddUser() {
  return (
    <div className="addUser w-max h-max p-[30px] bg-[rgba(17,25,40,0.781)] rounded-[10px] absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form className="flex gap-5">
        <input
          className="p-5 rounded-[10px] border-none outline-none"
          type="text"
          placeholder="Username"
          name="username"
        />
        <button className="p-5 rounded-[10px] border-none text-white bg-[#1a73e8]">
          Search
        </button>
      </form>
      <div className="user mt-[50px] flex items-center justify-between">
        <div className="flex items-center gap-5 detail">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src="../../../../../avatar.png"
            alt=""
          />
          <span>John Doe</span>
        </div>
        <button className="p-[10px] rounded-[10px] border-none text-white bg-[#1a73e8] ">
          Add User
        </button>
      </div>
    </div>
  );
}

export default AddUser;
