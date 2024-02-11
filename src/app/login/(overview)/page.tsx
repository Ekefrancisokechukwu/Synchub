import Image from "next/image";
import SigninForm from "../_components/SigninForm";

export default function Page() {
  return (
    <div className="h-screen flex ">
      <div className="grid place-items-center flex-1 border-r">
        <SigninForm />
      </div>
      <div className="w-[40%] px-5">
        <Image
          src={"/img/formavaterlight.webp"}
          alt="avater image"
          width={400}
          height={300}
          priority
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
