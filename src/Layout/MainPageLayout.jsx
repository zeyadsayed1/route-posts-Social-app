import LeftSidebar from "../Components/LeftSidebar";
import CreatePostCard from "../Components/CreatePostCard/CreatePostCard";
import { SuggestedFriendsAside } from "../Components/SuggestedFriendsAside";
import NavBar from "../Components/NavBar/NavBar";
export default function MainPageLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="mx-auto pt-20 max-w-7xl px-4 py-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="order-1 lg:order-0 lg:col-span-3 lg:sticky lg:top-6 self-start">
          <LeftSidebar />
        </div>
        <div className="order-3 lg:order-0 lg:col-span-6">
          <CreatePostCard />
          {children}
        </div>
        <div className="order-2 lg:order-0 lg:col-span-3 lg:sticky lg:top-6 self-start">
          <SuggestedFriendsAside />
        </div>
      </div>
    </>
  );
}
