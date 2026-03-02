import NavBar from "../../Components/NavBar/NavBar";
import { useParams } from "react-router";
import PostCard from "../../Components/PostCard/PostCard";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { axiosInterceptors } from "../../Shared/AxiosInterCeptors/AxiosInterCeptors";

export default function PostDetails() {
  const { id } = useParams();

  function getPostDetails() {
    return axiosInterceptors.get(`/posts/${id}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: getPostDetails,
    select: (res) => ({
      comments: res.data.data.comments,
      post: res.data.data.post,
    }),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F0F2F5] min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-3xl px-4 py-6 pt-20">
        <PostCard comments={data.comments || []} post={data.post} />
      </div>
    </div>
  );
}