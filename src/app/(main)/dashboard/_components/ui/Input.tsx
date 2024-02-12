import { LucideIcon } from "lucide-react";

type Props = {
  labelText: string;
  value: string;
  name?: string | undefined;
  hasIcon?: boolean;
  icon?: LucideIcon;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  labelText,
  value,
  name,
  handleChange,
  hasIcon,
  icon: Icon,
}: Props) => {
  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        placeholder={labelText}
        value={value}
        onChange={handleChange}
        aria-invalid="false"
        className="peer pt-4 pb-2  px-3  text-base placeholder:leading-[44px] placeholder-transparent  text-neutral-500 block  w-full rounded-lg bg-muted  hover:outline focus:outline outline-offset-1 outline-2  outline-stone-400 transition duration-75 ease-out "
      />{" "}
      <label
        id="label-ltclid72"
        className="absolute capitalize px-4 text-neutral-500 pointer-events-none  text-sm transition-all transform -translate-y-3 scale-[0.85] top-[13px] origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:tracking-wide peer-focus:scale-[0.85] peer-focus:-translate-y-3   truncate max-w-[calc(100%-(16px*2))] "
      >
        {labelText}
      </label>
    </div>
  );
};
export default Input;
