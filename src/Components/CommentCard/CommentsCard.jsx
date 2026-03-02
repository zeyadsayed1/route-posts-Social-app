import { formatDistance } from "date-fns";
import CommentInput from "../CommentInput/CommentInput";
import { Button } from "@heroui/react";
import { LuEllipsis } from "react-icons/lu";
export default function CommentsCard({ postComments, postId, onCommentAdded }) {
  return (
    <div className="border-t rounded-b-xl border-slate-200 bg-[#f7f8fa] px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-extrabold tracking-wide text-slate-700">
            Comments
          </p>
          <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
            {postComments.length}
          </span>
        </div>
        <select className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:bg-white focus:ring-2">
          <option value="relevant">Most relevant</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      {postComments.map((comment) => {
        const timeAgo = formatDistance(
          new Date(comment.createdAt),
          new Date(),
          {
            addSuffix: true,
          },
        );
        return (
          <div className="space-y-2 my-3" key={comment._id}>
            <div className="relative flex items-start gap-2" id={comment._id}>
              <img
                className="mt-0.5 h-8 w-8 rounded-full object-cover"
                src={comment.commentCreator.photo}
                alt={comment.commentCreator.name}
              />
              <div className="min-w-0 flex-1">
                <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {comment.commentCreator.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        member · {timeAgo}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                    {comment.content}
                  </p>
                </div>
                <div className="mt-1.5 flex items-center justify-between px-1">
                  <div className="flex items-center gap-4">
                    <button className="cursor-pointer text-xs font-semibold hover:underline disabled:opacity-60 text-slate-500">
                      Like ({comment.likes.length})
                    </button>
                    <button className="cursor-pointer text-xs font-semibold transition hover:underline disabled:opacity-60 text-slate-500 hover:text-[#1877f2]">
                      Reply
                    </button>
                  </div>
                  <div className="relative" data-comment-menu-root>
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <LuEllipsis size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <CommentInput id={postId} onCommentAdded={onCommentAdded} />
    </div>
  );
}
