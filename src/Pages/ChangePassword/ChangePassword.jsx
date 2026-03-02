import NavBar from "../../Components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInterceptors } from "../../Shared/AxiosInterCeptors/AxiosInterCeptors";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router";
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
const schema = zod
  .object({
    password: zod
      .string()
      .regex(
        passwordRegex,
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character.",
      ),
    newPassword: zod
      .string()
      .regex(
        passwordRegex,
        "New password must be at least 8 characters with uppercase, lowercase, number, and special character.",
      ),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
async function changePassword(data) {
  const response = await axiosInterceptors.patch("/users/change-password", {
    password: data.password,
    newPassword: data.newPassword,
  });
  return response.data;
}
export default function ChangePasswordForm() {
  const { logOut } = useContext(AuthUserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", newPassword: "", confirmPassword: "" },
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully!");
      reset();
      logOut();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password. Please try again.",
      );
    },
  });
  function onSubmit(data) {
    mutate(data);
  }
  return (
    <>
      <title>Change Password</title>
      <div className="bg-[#F0F2F5] min-h-screen">
        <NavBar />
        <main className="mx-auto max-w-7xl px-3 py-3.5 pt-20">
          <div className="mx-auto max-w-2xl">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    Change Password
                  </h1>
                  <p className="text-sm text-slate-500">
                    Keep your account secure by using a strong password.
                  </p>
                </div>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Current password
                  </span>
                  <input
                    {...register("password")}
                    placeholder="Enter current password"
                    className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                      errors.password
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1877f2] focus:bg-white"
                    }`}
                    type="password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    New password
                  </span>
                  <input
                    {...register("newPassword")}
                    placeholder="Enter new password"
                    className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                      errors.newPassword
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1877f2] focus:bg-white"
                    }`}
                    type="password"
                  />
                  {errors.newPassword ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.newPassword.message}
                    </p>
                  ) : (
                    <span className="mt-1 block text-xs text-slate-500">
                      At least 8 characters with uppercase, lowercase, number,
                      and special character.
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-slate-700">
                    Confirm new password
                  </span>
                  <input
                    {...register("confirmPassword")}
                    placeholder="Re-enter new password"
                    className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-slate-200 focus:border-[#1877f2] focus:bg-white"
                    }`}
                    type="password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </label>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Updating…
                    </>
                  ) : (
                    "Update password"
                  )}
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
