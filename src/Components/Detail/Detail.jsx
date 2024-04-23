import { auth } from "../../lib/firebase";

const Detail = () => {
  return (
    <div className="flex-1 detail">
      <div className="user py-[30px] px-5 flex flex-col items-center  gap-[15px] border-solid border-b border-b-[#dddddd35]">
        <img
          className="h-[100px] w-[100px] rounded-full object-cover "
          src="../../../avatar.png"
          alt=""
        />
        <h2>John Doe</h2>
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
          <div className="flex flex-col gap-5 mt-5 photos">
            <div className="flex items-center justify-between photoItem">
              <div className="flex items-center gap-5 photoDetail">
                <img
                  className="object-cover w-10 h-10 rounded-lg"
                  src="https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg"
                  alt=""
                />
                <span className="text-sm font-light text-gray-400">
                  photo_2024_2.png
                </span>
              </div>
              <img
                className="w-[30px] h-[30px] p-[10px] bg-[rgba(17,25,40,0.3)] rounded-full cursor-pointer"
                src="../../../download.png"
                alt=""
              />
            </div>
          </div>
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
        <button className=" p-4  text-white border-none rounded-md cursor-pointer bg-[rgba(230,74,105,.553)] hover:bg-[rgba(220,20,60,.794)]">
          Block User
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
