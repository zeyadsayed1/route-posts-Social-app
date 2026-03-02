import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import {
  LuCamera,
  LuUsers,
  LuMail,
  LuFileText,
  LuBookmark,
  LuThumbsUp,
  LuRepeat2,
  LuMessageCircle,
  LuClock3,
  LuExpand,
} from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const { userData,getUserData } = useContext(AuthUserContext);
  const [PostsCount, SetPostsCount] = useState(0);
  useEffect(
    function () {
      setUserInfo(userData);
       getuserPosts()
    },
    [userData],
  );

  async function handleUserProfile(e) {
    const myForm = new FormData();
    myForm.append("photo", e.target.files[0]);
    toast.promise(
      axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo`, myForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      {
        loading: "Udating Profile image...",
        success: function (data) {
          getUserData();
          return data.data.message;
        },
        error: function (error) {
          return error.response.data.error;
        },
      },
    );
  }
  async function getuserPosts() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userInfo?._id}/posts`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    SetPostsCount(response.data.data.posts.length);
  }
 
  return (
    <>
      <title>Profile Page</title>
       <div className="bg-[#F0F2F5] min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-7xl px-3 py-3.5 pt-20">
        <main className="min-w-0">
          <div className="space-y-5 sm:space-y-6">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
              <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />
                <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
                <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />

                {/* Add cover button */}
                <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
                  <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                    <LuCamera size={13} aria-hidden="true" />
                    <span>Add cover</span>
                    <input accept="image/*" className="hidden" type="file" />
                  </label>
                </div>
              </div>

              {/* Card content */}
              <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
                <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    {/* Left: avatar + name */}
                    <div className="min-w-0">
                      <div className="flex items-end gap-4">
                        {/* Avatar */}
                        <div className="group/avatar relative shrink-0">
                          <button
                            type="button"
                            className="cursor-zoom-in rounded-full"
                          >
                            <img
                              alt={userInfo?.name}
                              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                              src={userInfo?.photo}
                            />
                          </button>

                          {/* View photo button */}
                          <button
                            type="button"
                            className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                            title="View profile photo"
                            aria-label="View profile photo"
                          >
                            <LuExpand size={16} aria-hidden="true" />
                          </button>

                          {/* Change photo button */}
                          <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                            <LuCamera size={17} aria-hidden="true" />
                            <input
                              accept="image/*"
                              className="hidden"
                              type="file"
                              onChange={handleUserProfile}
                            />
                          </label>
                        </div>

                        {/* Name & handle */}
                        <div className="min-w-0 pb-1">
                          <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            {userInfo?.name}
                          </h2>
                          <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                            @{userInfo?.username}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                            <LuUsers size={13} aria-hidden="true" />
                            <span>Route Posts member</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: stats cards */}
                    <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Followers
                        </p>
                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {userInfo?.followersCount}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Following
                        </p>
                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {userInfo?.followingCount}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Bookmarks
                        </p>
                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {userInfo?.bookmarksCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* About + side stats */}
                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                    {/* About */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="text-sm font-extrabold text-slate-800">
                        About
                      </h3>
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p className="flex items-center gap-2">
                          <LuMail
                            size={15}
                            className="text-slate-500"
                            aria-hidden="true"
                          />
                          <span>{userInfo?.email}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <LuUsers
                            size={15}
                            className="text-slate-500"
                            aria-hidden="true"
                          />
                          <span>Active on Route Posts</span>
                        </p>
                      </div>
                    </div>

                    {/* Side cards */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                          My posts
                        </p>
                        <p className="mt-1 text-2xl font-black text-slate-900">
                          {PostsCount}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                          Saved posts
                        </p>
                        <p className="mt-1 text-2xl font-black text-slate-900">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Posts list */}
            <section className="space-y-4">
              {/* Tabs + count */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition bg-white text-[#1877f2] shadow-sm">
                    <LuFileText
                      size={15}
                      className="text-[#1877f2]"
                      aria-hidden="true"
                    />
                    <span>My Posts</span>
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition text-slate-600 hover:text-slate-900">
                    <LuBookmark
                      size={15}
                      className="text-slate-600"
                      aria-hidden="true"
                    />
                    <span>Saved</span>
                  </button>
                </div>
                <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
                  5
                </span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
