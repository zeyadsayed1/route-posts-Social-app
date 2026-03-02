import React, { useEffect, useState } from "react";
import axios from "axios";
import MainPageLayout from "../../Layout/MainPageLayout";
import PostCard from "../../Components/PostCard/PostCard";
import PostSkeleton from "../../Components/PostSkeleton/PostSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function () {
  async function getAllPosts() {
   const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/posts`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data.data.posts;
  }
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
  if (isError) {
    return <h3 className="text-red-600">Error</h3>
  }
  return (
    <>
      <title>Home Feed </title>
       <div className="bg-[#F0F2F5] min-h-screen">
      <MainPageLayout>
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) :data.length > 0 ? (
         data.map((post) => (
  <PostCard key={post._id} post={post} />
))
        ) : (
          <div className="text-center py-10 text-gray-500">No posts found.</div>
        )}
      </MainPageLayout>
    </div>
    </>
  );
}
