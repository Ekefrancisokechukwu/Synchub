import { Loader2 } from "lucide-react";
import { Button } from "./button";

const Spinner = () => {
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="animate-spin rounded-full w-7 h-7 grid place-items-center"
    >
      <Loader2 />
    </Button>
  );
};
export default Spinner;
