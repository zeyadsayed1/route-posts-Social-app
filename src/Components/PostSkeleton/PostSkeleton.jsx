import { Skeleton } from "@heroui/react";
import React from "react";

export default function PostSkeleton() {
  return (
      <>
       <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm max-w-[600px] mx-auto my-4">
      <div className="mx-4 my-4 rounded-2xl">
        <Skeleton className="h-3 w-24 mb-3 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
        </div>
        <Skeleton className="h-3 w-32 mt-3 rounded" />
      </div>    
    </article>
      </>
  );
}
