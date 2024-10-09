import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Slices/userSlice";
import authApi from "../../Apis/authApi";
import { auth } from "../../firebase";
import SideBar from "./SideBar";
import { Outlet } from 'react-router-dom';
import FloatingMenu from "./FloatingMenu";


export default function HomePage() {
  
  return (
    <main className="w-full h-screen flex bg-gray-50 p-1 gap-1 overflow-hidden">
      
      {/* Sidebar remains fixed */}
      <SideBar />

      {/* Content area */}
      <div className="flex-1 h-full overflow-hidden">
      <FloatingMenu/>
        {/* Scrollable container inside */}
        <div className="h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </main>
  );
  }
  