import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import HeroSection from "../../Components/HeroSection";
import { ArrowRight, Calendar, Google, User } from "iconsax-reactjs";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaLock } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FiAtSign } from "react-icons/fi";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
export default function Register() {
  const { getUserData } = useContext(AuthUserContext);
  const myNavigate = useNavigate();
  const heroSectionContent = {
    titleOne: "Conncet width ",
    titleTwo: "amazing people",
    descripton:
      "Join millions of users sharing moments, ideas, and building meaningful connections every day",
  };
  const [isLoading, setIsLoading] = useState(false);
  async function sendUserRegister(data) {
    setIsLoading(true);
    toast.promise(
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, data),
      {
        loading: "Createing your account...",
        success: (response) => {
          const token = response.data.data.token;
          const message = response.data.message;
          localStorage.setItem("token", token);
          getUserData();
          myNavigate("/");
          return message;
        },
        error: function (response) {
          return response.response?.data?.message || "Something went wrong";
        },
      },
    );

    setIsLoading(false);
  }
  const schema = zod
    .object({
      name: zod
        .string({ required_error: "Name is required" })
        .regex(
          /^[A-Za-z0-9 _-]{3,20}$/,
          "Name must be between 3-20 characters",
        ),
      username: zod
        .string({ required_error: "User is required" })
        .regex(/^[a-z0-9_-]{3,15}$/)
        .optional(),
      email: zod
        .string({ required_error: "Email is required" })
        .email("Email is invalid"),
      dateOfBirth: zod.coerce
        .date()
        .refine(
          function (value) {
            const today = new Date();
            const age = today.getFullYear() - value.getFullYear();
            if (age > 18) {
              return true;
            }
          },
          {
            error: "User Age must be older than 18 years",
          },
        )
        .transform(function (value) {
          return value.toLocaleDateString("en-CA");
        }),
      gender: zod.enum(["male", "female"], {
        required_error: "Gender is required",
        invalid_type_error: "Please select a valid gender",
      }),
      password: zod
        .string({ required_error: "Password is required" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
        ),
      rePassword: zod
        .string({ required_error: "Confirm password is required" })
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password and confirm password should be the same",
        ),
    })
    .refine(
      function ({ password, rePassword }) {
        return password === rePassword;
      },
      {
        message: "Password and confirm password should be the same",
        path: ["rePassword"],
      },
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  return (
    <div className=" flex flex-col lg:flex-row  min-h-screen">
      <HeroSection content={heroSectionContent} />
      <div className="w-full lg:w-1/2 bg-[#F3F4F6] flex justify-center items-center">
        <Form
          onSubmit={handleSubmit(sendUserRegister)}
          className="w-full my-15 lg:my-0 max-w-lg mx-auto p-8 rounded-2xl shadow space-y-5 flex flex-col gap-4 bg-white"
        >
          <header class="text-center w-full space-y-2">
            <h2 class="text-3xl font-bold">Create account</h2>
            <p>
              Already have an account?
              <Link class="text-blue-400" to="/login" data-discover="true">
                Sign in
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
            isRequired
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            label="Full Name"
            labelPlacement="outside"
            placeholder="Enter your Full Name"
            type="text"
            {...register("name")}
            classNames={{
              label: `text-sm ${errors.name ? "text-red-500!" : ""}`,
              inputWrapper: `text-base p-4 focus:border-1 ${errors.name ? " bg-red-100!" : ""}`,
              input: "",
              description: "text-xs",
            }}
            startContent={<User color="#99a1af" variant="Bold" size={18} />}
          />
          <Input
            label="User name"
            labelPlacement="outside"
            placeholder="Username (optional)"
            type="text"
            {...register("username")}
            classNames={{
              label: `text-sm`,
              inputWrapper: `text-base p-4 focus:border-1`,
              input: "",
              description: "text-xs",
            }}
            startContent={<FiAtSign color="#99a1af" variant="Bold" size={18} />}
          />
          <Input
            isRequired
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="Email Address"
            {...register("email")}
            labelPlacement="outside"
            placeholder="name@example.com"
            type="email Address"
            classNames={{
              label: `text-sm ${errors.email ? "text-red-500!" : ""}`,
              inputWrapper: `text-base p-4 focus:border-1 ${errors.email ? " bg-red-100!" : ""}`,
              description: "text-xs",
            }}
            startContent={<MdEmail color="#99a1af" variant="Bold" size={18} />}
          />
          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            placeholder="Create a strong Password"
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
          <Input
            isRequired
            errorMessage={errors.rePassword?.message}
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Confirm your Password"
            type="password"
            {...register("rePassword")}
            isInvalid={!!errors.rePassword}
            classNames={{
              label: `text-sm ${errors.rePassword ? "text-red-500!" : ""}`,
              inputWrapper: `text-base p-4 focus:border-1 ${errors.rePassword ? " bg-red-100!" : ""}`,
              description: "text-xs",
            }}
            startContent={<FaLock color="#99a1af" variant="Bold" size={18} />}
          />
          <div className="flex gap-2 w-full">
            <Input
              isRequired
              label="Date Of Birth"
              labelPlacement="outside"
              type="date"
              {...register("dateOfBirth")}
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={!!errors.dateOfBirth}
              className="flex-1  min-w-2"
              classNames={{
                label: `text-sm ${errors.date ? "text-red-500!" : ""}`,
                inputWrapper: `text-base p-4 focus:border-1 ${errors.date ? " bg-red-100!" : ""}`,
                description: "text-xs",
              }}
              startContent={
                <Calendar color="#99a1af" variant="Bold" size={18} />
              }
            />
            <Controller
              name="gender"
              control={control}
              render={function (x) {
                return (
                  <Select
                    className="max-w-xs flex-1  min-w-2"
                    label="Gender"
                    {...x.field}
                    labelPlacement="outside"
                    placeholder="Select your gender"
                    classNames={{
                      label: `text-sm ${errors.gender ? "text-red-500!" : ""}`,
                      inputWrapper: `text-base p-4 focus:border-1 ${errors.gender ? " bg-red-100!" : ""}`,
                      description: "text-xs",
                    }}
                    selectedKeys={[x.field.value]}
                    startContent={
                      <TbGenderBigender
                        color="#99a1af"
                        variant="Bold"
                        size={25}
                      />
                    }
                  >
                    <SelectItem key={"male"}>Male</SelectItem>
                    <SelectItem key={"female"}>Female</SelectItem>
                  </Select>
                );
              }}
            />
          </div>

          <Button
            className="disabled:from-gray-500 w-full m-0 disabled:to-gray-400  py-3 bg-linear-to-r from-blue-600 to-blue-400 border-none text-white font-medium"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            <span>Create New Account</span>{" "}
            <ArrowRight color="#ffffff" variant="Outline" />
          </Button>
        </Form>
      </div>
    </div>
  );
}
