import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDashboard = () => {
  return (
    <div className="h-screen">
      <div className="flex-grow ">
        <div className="mt-3 flex h-[85vh]">
          <section className=" pr-3 flex-grow  border-r">
            <div className="w-[35rem] border p-5 rounded-lg">
              <Skeleton className="w-[10rem] h-5" />
              <div className="flex items-center mt-5 gap-x-3 justify-between">
                <Skeleton className="h-[3rem] w-full" />
                <Skeleton className="h-[3rem] w-full" />
              </div>
              <Skeleton className="h-[2.5rem] rounded-3xl w-full mt-14" />
              <div className="flex items-center mt-5 gap-x-3 justify-between">
                <Skeleton className="h-[2rem] w-[40%]" />
                <Skeleton className="h-[2rem] w-[40%]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default SkeletonDashboard;
