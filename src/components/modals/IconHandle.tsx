import Input from "@/app/(main)/dashboard/_components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddIconModal } from "@/hooks/useAddIconModal";
import { Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const IconHandle = () => {
  const { isOpen, onClose } = useAddIconModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="">
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Add icon</DialogTitle>
          </DialogHeader>
          <div className="mt-3">
            <Input value="" handleChange={() => {}} labelText="Search" />
          </div>
          <ScrollArea className="mt-2 h-[15rem]">
            <h2 className="font-bold text-sm ">Featured</h2>
          </ScrollArea>
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default IconHandle;
