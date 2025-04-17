import { Outlet } from "react-router-dom";
import groupImage from "../assets/group.png";
import Welcome from "../components/Welcome";

function AuthLayout() {
  return (
    <div className="flex items-center p-10 min-h-screen">
      <div className="flex w-full ">
        <div className="w-1/2 flex justify-center relative">
          <img src={groupImage} alt="group" className="max-w-full" />
          <Welcome />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
