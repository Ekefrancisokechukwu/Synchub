import { cn } from "@/lib/utils";
import { dancingScript } from "./fonts";

const Logotext = () => {
  return (
    <div
      className={cn(
        `${dancingScript.className} bg-clip-text p-2  font-bold text-5xl bg-gradient-to-r text-transparent from-slate-600 via-blue-500 to-blue-700 inline-block `
      )}
    >
      sy
    </div>
  );
};

export default Logotext;
