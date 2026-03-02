import { Button, Form, Input } from "@heroui/react";
import HeroSection from "../../Components/HeroSection";
import { ArrowRight, Google, User } from "iconsax-reactjs";
import { FaFacebookF, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
export default function Login() {
  const { getUserData } = useContext(AuthUserContext);
  const myNavigate = useNavigate();
  const heroSectionContent = {
    titleOne: "Conncet width ",
    titleTwo: "amazing people",
    descripton:
      "Join millions of users sharing moments, ideas, and building meaningful connections every day",
  };
  const [isLoading, setIsLoading] = useState(false);
  async function sendUserLogin(data) {
    setIsLoading(true);
    try {
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, data),
        {
          loading: "Signing in...",
          success: (response) => {
            localStorage.setItem("token", response.data.data.token);
            getUserData();
            myNavigate("/");
            return response.data.message;
          },
          error: (err) => {
            return err.response?.data?.message || "Login failed";
          },
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const schema = zod.object({
    email: zod.string().email("Email not valid"),
    password: zod
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Enter Valid Password",
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });
  return (
    <div className=" flex flex-col lg:flex-row  min-h-screen">
      <HeroSection content={heroSectionContent} />
      <div className="w-full lg:w-1/2 bg-[#F3F4F6] flex justify-center items-center">
        <Form
          onSubmit={handleSubmit(sendUserLogin)}
          className="w-full my-15 lg:my-0 max-w-lg mx-auto p-8 rounded-2xl shadow space-y-5 flex flex-col gap-4 bg-white"
        >
          <header class="text-center w-full space-y-2">
            <h2 class="text-3xl font-bold">Log in to Route Posts</h2>
            <p class="mt-1 text-sm text-slate-500 ">
              Log in and continue your social journey.
            </p>
            <p>
              Don't have an account?
              <Link class="text-blue-400" to="/signup" data-discover="true">
                Sign up
              </Link>
            </p>
          </header>
          <div className="social-btns w-full flex items-center gap-3">
            <Button className="flex-1 border border-[#E7E1E5] bg-white hover:scale-105 transition-transform duration-200">
              <Google color="#fb2c36" variant="Bold" />
              <span>Google</span>
            </Button>
            <Button className="flex-1 bg-[#2B7FFF] text-white hover:scale-105 hover:bg-[#2B7FFF] transition-transform duration-200">
              <FaFacebookF />
              <span>Facebook</span>
            </Button>
          </div>
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="example@domain.com"
            type="email"
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            classNames={{
              label: `text-sm`,
              inputWrapper: `text-base p-4 focus:border-1`,
              input: "",
              description: "text-xs",
            }}
            startContent={<User color="#99a1af" variant="Bold" size={18} />}
          />
          <Input
            label="Password"
            labelPlacement="outside"
            placeholder="Password"
            type="password"
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            classNames={{
              label: `text-sm ${errors.password ? "text-red-500!" : ""}`,
              inputWrapper: `text-base p-4 focus:border-1 ${errors.password ? " bg-red-100!" : ""}`,
              description: "text-xs",
            }}
            startContent={<FaLock color="#99a1af" variant="Bold" size={18} />}
          />
          <Button
            className="disabled:from-gray-500 w-full m-0 disabled:to-gray-400  py-3 bg-linear-to-r from-blue-600 to-blue-400 border-none text-white font-medium"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            <span>Log in</span> <ArrowRight color="#ffffff" variant="Outline" />
          </Button>
          <Link
            type="button"
            class="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
          >
            Forgot password?
          </Link>
        </Form>
      </div>
    </div>
  );
}
