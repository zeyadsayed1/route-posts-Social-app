import React, { useState, useRef, useEffect, useContext } from "react";

import Loading from "../../Components/Loading/Loading";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Link, useLocation } from "react-router";
import logo from "../../assets/images/route.png";
import avatar from "../../assets/images/default-profile.png";
import { GoHome } from "react-icons/go";
import { FiMessageCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { User } from "iconsax-reactjs";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const { logOut, userData } = useContext(AuthUserContext);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timeout);
  }, []);

  const menuItems = [
    { label: "Profile", icon: <User size={18} />, href: "/profile" },
    { label: "Settings", icon: <FiSettings size={18} />, href: "/changepassword" },
    {
      label: "Logout",
      icon: <FiLogOut size={18} />,
      danger: true,
      onClick: logOut,
    },
  ];
  
  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
      setIsLoading(false);
    }
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userData]);
  if (isLoading) return <Loading />;
  const displayUser = userInfo || { name: "User", email: "", photo: null };
  return (
    <Navbar isBordered maxWidth="xl" className="bg-white fixed">
      <NavbarContent justify="start">
        <NavbarBrand>
          <div className="img overflow-hidden me-3">
            <img src={logo} className="w-9 rounded-xl" alt="Logo" />
          </div>
          <p className="hidden sm:block font-extrabold text-[20px]">
            Route Posts
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        justify="center"
        className="rounded-2xl max-h-12 border border-slate-200 bg-slate-50/90 p-1 sm:px-1.5"
      >
        <NavbarItem
           className={`relative flex items-center rounded-xl transition ${
    currentPath === "/" 
      ? "bg-white text-[#1f6fe5] shadow-sm" 
      : "text-[#45556C] hover:text-[#0F172B] transition-colors"
  }`}        >
          <Button
            as={Link}
            to="/"
            className="text-inherit min-w-10 font-extrabold bg-transparent p-1 sm:p-3"
          >
            <GoHome className="w-5 h-5 md:w-7 md:h-7" />
            <span className="hidden sm:block">Feed</span>
          </Button>
        </NavbarItem>
        <NavbarItem   className={`relative flex items-center rounded-xl transition ${
    currentPath === "/profile" 
      ? "bg-white text-[#1f6fe5] shadow-sm" 
      : "text-[#45556C] hover:text-[#0F172B] transition-colors"
  }`}        >
          <Button
            as={Link}
            to="/profile"
            className="text-inherit min-w-10 font-extrabold bg-transparent p-1 sm:p-3"
          >
            <User className="w-5 h-5 md:w-7 md:h-7 " />

            <span className="hidden sm:block">Profile</span>
          </Button>
        </NavbarItem>
        <NavbarItem   className={`relative flex items-center rounded-xl transition ${
    currentPath === "/notifications" 
      ? "bg-white text-[#1f6fe5] shadow-sm" 
      : "text-[#45556C] hover:text-[#0F172B] transition-colors"
  }`}        >
          <Button
            as={Link}
            className="text-inherit min-w-10 font-extrabold bg-transparent p-1 sm:p-3"
          >
            <FiMessageCircle className="w-5 h-5 md:w-7 md:h-7" />
            <span className="hidden sm:block">Notifications</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="flex-1 justify-end">
        <div className="relative" ref={dropdownRef}>
          {/* Toggle Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="h-10 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 transition hover:bg-slate-100 shadow-sm active:scale-95 cursor-pointer"
          >
            <img
              alt={displayUser.name}
              className="h-7 w-7 rounded-full object-cover border border-slate-200"
              src={displayUser.photo || avatar}
            />
            <span className="hidden md:block max-w-[140px] truncate text-sm font-bold text-slate-800">
              {displayUser.name}
            </span>
            {isMenuOpen ? (
              <AiOutlineClose size={18} className="text-slate-600" />
            ) : (
              <GiHamburgerMenu size={18} className="text-slate-600" />
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <img
                  src={displayUser.photo || avatar}
                  alt={displayUser.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {displayUser.name}
                  </p>
                  <p className="text-xs text-slate-400">{displayUser.email}</p>
                </div>
              </div>
              <ul className="py-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors no-underline ${
                        item.danger
                          ? "text-red-500 hover:bg-red-50"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={
                          item.danger ? "text-red-400" : "text-slate-400"
                        }
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </NavbarContent>
    </Navbar>
  );
}
