import { Global, More, Like1, Message, Share, Export } from "iconsax-reactjs";
import { Image, Button } from "@heroui/react";
import { Link } from "react-router";
import { formatDistance } from "date-fns";
import axios from "axios";
import { useState, useEffect } from "react";
import CommentsCard from "../CommentCard/CommentsCard";
import { axiosInterceptors } from "../../Shared/AxiosInterCeptors/AxiosInterCeptors";
function PostCard({ post, comments }) {
  const { user } = post;
  const [postComments, setPostComments] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(
    post.isUserLiked || post.isLiked || false,
  );
  const [isLiking, setIsLiking] = useState(false);
  async function handleLike() {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await axiosInterceptors.put(
        `/posts/${post.id || post._id}/like`,
      );
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  }

  const timeAgo = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
  });
  async function getPostComments() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/comments?page=1&limit=10`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setPostComments(response?.data?.data?.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (comments && post?.id) {
      getPostComments();
    }
  }, [comments, post]);
  return (
    <>
      <article className="overflow-visible rounded-xl border min-w-full border-slate-200 bg-white shadow-sm max-w-[150] mx-auto my-4">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Link className="shrink-0" to={`#/profile/${user.name}`}>
              <Image
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
                src={user.photo}
                width={44}
                height={44}
              />
            </Link>
            <div className="min-w-0 flex-1">
              <a
                className="truncate text-sm font-bold text-foreground hover:underline"
                href={`#/profile/${user.name}`}
              >
                {user.name}
              </a>
              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                <span>@{user.username}</span>
                <span>·</span>
                <button
                  type="button"
                  className="cursor-pointer rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                >
                  {timeAgo}
                </button>
                <span className="mx-1">·</span>
                <span className="inline-flex items-center gap-1">
                  <Global
                    size="11"
                    variant="Outline"
                    className="text-slate-500"
                  />
                  {post.privacy}
                </span>
              </div>
            </div>
            <div className="relative">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <More size="18" variant="Outline" />
              </Button>
            </div>
          </div>
        </div>
        {post.body && (
          <div className="ps-4 pb-2">
            <p>{post.body}</p>
          </div>
        )}
        {post.image && (
          <div className="max-h-[155] overflow-hidden border-y border-slate-200">
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in"
            >
              <Image
                alt="post"
                className="w-full object-cover"
                src={post.image}
                radius="none"
                width="100%"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
            </button>
          </div>
        )}
        <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                <Like1 size="12" variant="Bold" />
              </span>
              <button
                type="button"
                onClick={handleLike}
                disabled={isLiking}
                className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {likesCount} likes
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-1">
                <Export size="13" variant="Outline" />
                {post.sharesCount} shares
              </span>
              <span>{commentsCount} comments</span>
              {!comments && (
                <Link
                  variant="light"
                  to={`postdetails/${post._id}`}
                  size="sm"
                  className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff] h-auto min-w-0"
                >
                  View details
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mx-4 border-t border-slate-200"></div>
        <div className="grid grid-cols-3 gap-1 p-1">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm hover:bg-slate-100 ${isLiked ? "text-[#1877f2]" : "text-slate-600"}`}
          >
            <Like1 size="18" variant={isLiked ? "Bold" : "Outline"} />
            <span>Like</span>
          </button>
          <button
            onClick={() => {
              if (postComments) {
                setPostComments(null);
              } else {
                getPostComments();
              }
            }}
            disabled={IsLoading}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
          >
            {IsLoading ? (
              <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Message size="18" variant="Outline" />
            )}
            <span>Comment</span>
          </button>
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
            <Share size="18" variant="Outline" />
            <span>Share</span>
          </button>
        </div>
        {!comments && post.topComment && postComments === null && (
          <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Top Comment
            </p>
            {IsLoading && (
              <div className="mb-3 flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4">
                <p className="text-sm font-semibold text-slate-600 text-center">
                  Loading comments...
                </p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Image
                alt={post.topComment.commentCreator.name}
                className="h-8 w-8 rounded-full object-cover"
                src={post.topComment.commentCreator.photo}
                width={32}
                height={32}
              />

              <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                <p className="truncate text-xs font-bold text-slate-900">
                  {post.topComment.commentCreator.name}
                </p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                  {post.topComment.content}
                </p>
              </div>
            </div>

            <button
              onClick={function () {
                getPostComments();
              }}
              className="mt-2 cursor-pointer text-xs font-bold text-[#1877f2] hover:underline"
            >
              View all comments
            </button>
          </div>
        )}
        {comments && IsLoading && (
          <div className="mx-4 mb-4 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-8">
            <p className="text-sm font-semibold text-slate-600 text-center">
              Loading comments...
            </p>
          </div>
        )}
        {postComments && (
          <>
            <CommentsCard
              postComments={postComments}
              postId={post.id || post._id}
              onCommentAdded={() => {
                setCommentsCount((prev) => prev + 1);
                getPostComments();
              }}
            />
          </>
        )}
      </article>
    </>
  );
}

export default PostCard;
