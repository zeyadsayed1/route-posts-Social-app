import { useContext, useRef, useState, useEffect } from "react";
import { LuEarth, LuImage, LuSmile, LuSend } from "react-icons/lu";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import avatar from "../../assets/images/default-profile.png";

export default function CreatePostCard() {
  const [privacy, setPrivacy] = useState("public");
  const imageupload = useRef();
  const [image, setImage] = useState(null);
  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      body: "",
    },
  });
  const { userData, getUserData } = useContext(AuthUserContext);
  const [userImage, setUserImage] = useState(null);
  const content = watch("body");
  const queryClient = useQueryClient();

  function handleImageUpload(e) {
    setImage(e.target.files[0]);
    setUserImage(URL.createObjectURL(e.target.files[0]));
  }

  async function sendPost(data) {
    const myFormData = new FormData();
    myFormData.append("body", data.body);
    myFormData.append("privacy", privacy);
    if (image) myFormData.append("image", image);
    
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      myFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendPost,
    onSuccess: async (response) => {
      toast.success(response.statusText || "Post created successfully");
      await queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      await getUserData();
      reset();
      setUserImage(null);
      setImage(null);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "Failed to create post";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-start gap-3">
        <img
          alt={userData?.name || "User"}
          className="h-11 w-11 rounded-full object-cover"
          src={userData?.photo || avatar}
        />
        <div className="flex-1">
          <p className="text-base font-extrabold text-slate-900">
            {userData?.name || "User"}
          </p>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
            <LuEarth size={12} aria-hidden="true" />
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="public">Public</option>
              <option value="following">Followers</option>
              <option value="only_me">Only me</option>
            </select>
          </div>
        </div>
      </div>
      <div className="relative">
        <textarea
          rows={4}
          {...register("body")}
          placeholder={`What's on your mind, ${userData?.name?.split(" ")[0] || "there"}?`}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
        />
      </div>
      <div className={`relative mt-2 ${!userImage && "hidden"}`}>
        <img
          src={userImage}
          className={`max-h-60 w-full rounded-lg object-cover`}
          alt="preview"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
            <LuImage
              size={18}
              className="text-emerald-600"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Photo/video</span>
            <input
              accept="image/*"
              className="hidden"
              type="file"
              onChange={(e) => handleImageUpload(e)}
              ref={imageupload}
            />
          </label>
          <button
            type="button"
            className="flex items-center cursor-pointer gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <LuSmile size={18} className="text-amber-500" aria-hidden="true" />
            <span className="hidden sm:inline">Feeling/activity</span>
          </button>
        </div>
        <Button
          disabled={!content.trim()}
          isLoading={isPending}
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
        >
          Post
          <LuSend size={16} aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}