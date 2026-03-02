import { Spinner } from "@heroui/react";
export default function Loading() {
  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black/20 z-[1000] flex items-center justify-center">
      <div className="bg-white px-5 py-4 rounded-2xl flex items-center gap-3">
        <Spinner size="sm" color="primary" />
        <span className="text-[15px] font-bold text-gray-500">
          Refreshing your timeline...
        </span>
      </div>
    </div>
  );
}
