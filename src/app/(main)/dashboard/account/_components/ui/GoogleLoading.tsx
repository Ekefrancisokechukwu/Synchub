import { Skeleton } from "@/components/ui/skeleton";

const GoogleLoading = () => {
  return (
    <div className="w-[35rem] mx-auto">
      <Skeleton className="w-11 h-11 rounded-full mx-auto " />
      <div className="flex flex-col gap-y-4 mt-4">
        <Skeleton className="w-full py-6 px-6 rounded-3xl " />
        <Skeleton className="w-full py-6 px-6 rounded-3xl " />
      </div>
    </div>
  );
};
export default GoogleLoading;
