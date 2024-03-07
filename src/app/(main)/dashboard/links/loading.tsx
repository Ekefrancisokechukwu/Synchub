import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="p-5">
      <Spinner />
    </div>
  );
}
