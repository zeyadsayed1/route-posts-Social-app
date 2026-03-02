import { useState } from "react";
import { Input, Button, Avatar } from "@heroui/react";
import { People, SearchNormal1, UserAdd, UserSearch } from "iconsax-reactjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInterceptors } from "../Shared/AxiosInterCeptors/AxiosInterCeptors";
async function fetchSuggestions() {
  const response = await axiosInterceptors.get("/users/suggestions?limit=10");
  return response.data;
}
async function followUser(userId) {
  const { data } = await axiosInterceptors.put(`/users/${userId}/follow`);
  return data;
}
function FriendRow({ friend }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => followUser(friend._id),
    onSuccess: () => {
      queryClient.setQueryData(["suggestedFriends"], (old) => {
        if (!old) return old;

        const clone = JSON.parse(JSON.stringify(old));

        const filterNested = (obj) => {
          if (Array.isArray(obj))
            return obj.filter((f) => f._id !== friend._id);
          if (typeof obj === "object" && obj !== null) {
            for (let key in obj) {
              if (Array.isArray(obj[key])) {
                obj[key] = obj[key].filter((f) => f._id !== friend._id);
              } else if (typeof obj[key] === "object") {
                filterNested(obj[key]);
              }
            }
          }
          return obj;
        };

        return filterNested(clone);
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestedFriends"] });
    },
  });

  return (
    <div className="rounded-xl border border-slate-200 p-2.5">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
        >
          <Avatar
            src={friend.photo}
            alt={friend.name ?? friend.username}
            className="h-10 w-10"
            radius="full"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 hover:underline">
              {friend.name ?? friend.username}
            </p>
            <p className="truncate text-xs text-slate-500">
              @{friend.username}
            </p>
          </div>
        </button>
        <Button
          size="sm"
          radius="full"
          isLoading={isPending}
          isDisabled={isPending}
          onPress={() => mutate()}
          className="inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-3 py-1.5 text-xs font-bold text-[#1877f2] hover:bg-[#d8ebff]"
          variant="flat"
          startContent={!isPending && <UserAdd size={13} variant="Outline" />}
        >
          {isPending ? "Following…" : "Follow"}
        </Button>
      </div>

      {friend.followersCount !== undefined && (
        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-0.5">
            {friend.followersCount} followers
          </span>
        </div>
      )}
    </div>
  );
}
export function SuggestedFriendsAside() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suggestedFriends"],
    queryFn: fetchSuggestions,
  });
  const friends = Array.isArray(data?.data?.data?.suggestions)
    ? data.data.data.suggestions
    : Array.isArray(data?.data?.suggestions)
      ? data.data.suggestions
      : Array.isArray(data?.data?.users)
        ? data.data.users
        : Array.isArray(data?.suggestions)
          ? data.suggestions
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.users)
              ? data.users
              : Array.isArray(data)
                ? data
                : [];

  const filtered = friends.filter(
    (f) =>
      f.username?.toLowerCase().includes(search.toLowerCase()) ||
      f.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // ─── Card content (shared between mobile & desktop) ─────────────────────────
  const card = (
    <aside className="h-fit xl:sticky xl:top-[84px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
              <People size={18} variant="Bold" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Suggested Friends
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {isLoading ? "…" : filtered.length}
          </span>
        </div>

        {/* Search */}
        <div className="mb-3">
          <Input
            size="sm"
            radius="lg"
            variant="bordered"
            placeholder="Search friends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            classNames={{
              inputWrapper:
                "border-slate-200 bg-slate-50 data-[focus=true]:bg-white data-[focus=true]:border-[#1877f2]",
              input: "text-sm text-slate-700",
            }}
            startContent={
              <SearchNormal1
                size={15}
                className="text-slate-400"
                variant="Outline"
              />
            }
          />
        </div>

        {/* States */}
        {isLoading && (
          <p className="py-4 text-center text-sm text-slate-400">Loading…</p>
        )}
        {isError && (
          <p className="py-4 text-center text-sm text-red-400">
            Failed to load suggestions.
          </p>
        )}

        {/* Friends list */}
        {!isLoading && !isError && (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-400">
                No suggestions found.
              </p>
            ) : (
              filtered.map((friend) => (
                <FriendRow
                  key={friend._id ?? friend.username}
                  friend={friend}
                />
              ))
            )}
          </div>
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <button className="mt-3 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
            View more
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <>
      <Button
        type="button"
        onPress={() => setIsOpen((prev) => !prev)}
        className="lg:hidden mb-4 inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
      >
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <UserSearch size={17} className="text-[#1877f2]" aria-hidden="true" />
          Suggested Friends
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {isLoading ? "…" : friends.length}
          </span>
          <span className="text-xs font-bold text-[#1877f2]">
            {isOpen ? "Hide" : "Show"}
          </span>
        </span>
      </Button>
      <div className="lg:hidden">{isOpen && card}</div>
      <div className="hidden lg:block">{card}</div>
    </>
  );
}
