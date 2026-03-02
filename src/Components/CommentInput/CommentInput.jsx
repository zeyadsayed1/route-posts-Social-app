import { Button } from "@heroui/react";
import { useContext, useState } from "react";
import { LuImage, LuSmile, LuSend } from "react-icons/lu";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function CommentInput({ id }) {
  const { userData } = useContext(AuthUserContext);
  const [image, setImage] = useState(null);

  const { handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content");

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file || null);
  }

  async function sendUserComment(data) {
    const myFormData = new FormData();
    myFormData.append("content", data.content);
    if (image) myFormData.append("image", image);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`,
      myFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendUserComment,
    onMutate: () => {
      toast.loading("Sending comment...", { id: "send-comment" });
    },
    onSuccess: () => {
      reset();
      setImage(null);
      toast.success("Comment added successfully", { id: "send-comment" });
    },
    onError: (error) => {
      console.error(error);
      const message =
        error?.response?.data?.error || "Failed to add comment";
      toast.error(message, { id: "send-comment" });
    },
  });

  function onSubmit(formData) {
    mutate(formData);
  }

  const isSendDisabled = !content.trim() && !image;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <div className="flex items-start gap-2">
        <img
          className="h-9 w-9 rounded-full object-cover"
          src={userData?.photo}
          alt={userData?.name}
        />
        <div
          className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5
                     focus-within:border-[#c7dafc] focus-within:bg-white"
        >
          <textarea
            rows={1}
            {...register("content")}
            placeholder={
              userData?.name
                ? `Comment as ${userData.name}...`
                : "Write a comment..."
            }
            className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent
                       px-2 py-1.5 text-sm leading-5 outline-none
                       placeholder:text-slate-500"
            spellCheck={false}
          />

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <label
                className="inline-flex cursor-pointer items-center justify-center
                                 rounded-full p-2 text-slate-500 transition
                                 hover:bg-slate-200 hover:text-emerald-600"
              >
                <LuImage size={16} aria-hidden="true" />
                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full
                           p-2 text-slate-500 transition hover:bg-slate-200
                           hover:text-amber-500"
              >
                <LuSmile
                  className="cursor-pointer"
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>
            <Button
              isIconOnly
              type="submit"
              size="sm"
              isLoading={isPending}
              disabled={isPending || isSendDisabled}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                         bg-[#1877f2] text-white shadow-sm transition
                         hover:bg-[#166fe5] disabled:cursor-not-allowed
                         disabled:bg-[#9ec5ff] disabled:opacity-100"
            >
              <LuSend size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}