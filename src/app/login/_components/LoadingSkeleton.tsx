import { Skeleton } from "@/components/ui/skeleton";

export function FormLoading() {
  return (
    <div className="p-4 space-y-10">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-[14rem] h-[2rem]" />
        <Skeleton className="w-[10rem] h-[1.5rem]" />
      </div>
      <div className="mt-8 flex items-center gap-x-4">
        <Skeleton className="w-[3rem] h-[2rem]" />
        <Skeleton className="w-[3rem] h-[2rem]" />
        <Skeleton className="w-[3rem] h-[2rem]" />
        <Skeleton className="w-[3rem] h-[2rem]" />
      </div>
      <div className="mt-8 space-y-4">
        <Skeleton className="w-[20rem] h-[2.5rem]" />
        <Skeleton className="w-[20rem] h-[2.5rem]" />
      </div>
      <Skeleton className="w-[20rem] h-[2rem] mt-8" />
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="h-screen flex ">
      <div className="py-8 flex-1 grid place-items-center border-r">
        <FormLoading />
      </div>
      <div className="w-[40%]">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};
export default LoadingSkeleton;
