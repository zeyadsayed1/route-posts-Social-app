import {
  Gallery,
  Heart,
  Message,
  Messages1,
  Notification,
  People,
} from "iconsax-reactjs";
import alexAvatar from "../assets/images/alex-avatar-BLDJqiDr.png";
import { User } from "@heroui/user";
import { FaStar } from "react-icons/fa";

export default function HeroSection(content) {
  const { titleOne, titleTwo, descripton } = content.content;
  return (
    <div className="w-full flex justify-center items-center  lg:w-1/2 bg-[linear-gradient(rgba(20,71,230,0.8),rgba(20,71,230,0.8)),url(assets/images/signup-bg-DGRfriy9.png)] bg-cover bg-center   ;">
      <div className="container p-10 lg:p-12">
        <header className="text-white">
          <h1>
            <a className="flex items-center gap-3">
              <span className="size-12 text-lg font-bold flex justify-center items-center bg-white/40 border border-white/30 rounded-xl">
                S
              </span>
              <span className="text-2xl font-bold">SocialHub</span>
            </a>
          </h1>
        </header>
        <div className="content mt-3 lg:mt-12 text-white">
          <div className="title">
            <h2 className="text-4xl md:text-5xl pb-7 md:max-w-96 font-bold">
              {titleOne} <br />
              <span className="bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                {titleTwo}
              </span>
            </h2>
            <p className="max-w-md">{descripton}</p>
          </div>
          <ul className="feature-cards grid lg:grid-cols-2 gap-4 mt-6">
            <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
              <div className="icon size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                <Messages1 size="25" color="#7BF1A8" variant="Bold" />
              </div>
              <div className="card-body">
                <h4>Real-time Chat</h4>
                <span>Instant messaging</span>
              </div>
            </li>
            <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
              <div className="icon size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300">
                <Gallery size="25" color="#DBEAFE" variant="Bold" />
              </div>
              <div className="card-body">
                <h4>Share Media</h4>
                <span>Photos & videos</span>
              </div>
            </li>
            <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
              <div className="icon size-10 flex justify-center items-center rounded-xl bg-[#6C67CA] text-green-300">
                <Notification color="#fce7f3" variant="Bold" />
              </div>
              <div className="card-body">
                <h4>Smart Alerts</h4>
                <span>Stay updated</span>
              </div>
            </li>
            <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
              <div className="icon size-10 flex justify-center items-center rounded-xl bg-[#448FDF] text-green-300">
                <People color="#7bf1a8" variant="Bold" />
              </div>
              <div className="card-body">
                <h4>Communities</h4>
                <span>Find your tribe</span>
              </div>
            </li>
          </ul>
          <ul className="mt-4 flex gap-5">
            <li className="w-fit">
              <div className="flex gap-2 items-center">
                <People size={25} color="#ffffff" variant="Bold" />
                <span className="capitalize font-bold text-xl lg:text-3xl">2M+</span>
              </div>
              <p>Active Users</p>
            </li>
            <li className="w-fit">
              <div className="flex gap-2 items-center">
                <Heart color="#ffffff" variant="Bold" />
                <span className="capitalize font-bold text-xl lg:text-3xl">10M+</span>
              </div>
              <p>Posts Shared</p>
            </li>
            <li className="w-fit">
              <div className="flex gap-2 items-center">
                <Message size={25} color="#ffffff" variant="Bold" />
                <span className="capitalize font-bold text-xl lg:text-3xl">50M+</span>
              </div>
              <p>Messages Sent</p>
            </li>
          </ul>
        </div>
        <div className="clients-review mt-5 lg:mt-15 p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl  hover:bg-white/25 transition-transform duration-200">
          <div className="starts flex gap-0.5">
            <FaStar color="#FFDF20" size={18} />
            <FaStar color="#FFDF20" size={18} />
            <FaStar color="#FFDF20" size={18} />
            <FaStar color="#FFDF20" size={18} />
            <FaStar color="#FFDF20" size={18} />
          </div>
          <blockquote className="text-lg mt-4 text-white italic">
            <p>
              "SocialHub has completely changed how I connect with friends and
              discover new communities. The experience is seamless!"
            </p>
          </blockquote>
          <User
            className="mt-4 text-white italic"
            avatarProps={{
              src: alexAvatar,
            }}
            description="Product Designer"
            name="Alex Johnson"
          />
        </div>
      </div>
    </div>
  );
}
