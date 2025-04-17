import { Outlet } from "react-router-dom";
import groupImage from "../assets/group.png";
import Welcome from "../components/Welcome";

function AuthLayout() {
  return (
    <div className="flex items-center p-10 min-h-screen">
      <div className="flex flex-col md:flex-row w-full">
        <div className="hidden md:flex md:w-1/2 justify-center relative">
          <img src={groupImage} alt="group" className="max-w-full" />
          <Welcome />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
