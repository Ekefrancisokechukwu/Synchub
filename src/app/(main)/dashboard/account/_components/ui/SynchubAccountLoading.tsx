import { Skeleton } from "@/components/ui/skeleton";

const SynchubAccountLoading = () => {
  return (
    <div className="w-[35rem] mx-auto">
      <Skeleton className="w-[6rem] h-[2rem] mx-auto rounded-lg" />
      <div className="space-y-4 mt-5">
        <Skeleton className="w-full  py-6 px-6 rounded-3xl" />
        <Skeleton className="w-full  py-6 px-6 rounded-3xl" />
      </div>
    </div>
  );
};
export default SynchubAccountLoading;
