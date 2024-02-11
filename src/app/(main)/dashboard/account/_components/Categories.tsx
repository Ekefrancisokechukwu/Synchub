type Username = {
  name: string;
  isError: string;
};

type Props = Username & {
  handleChange: (fields: Partial<Username>) => void;
};

const Categories = ({ handleChange, name, isError }: Props) => {
  return (
    <div>
      <h6 className="text-neutral-600 text-sm font-medium">
        Share insights about your customized Synchub for a more personalized
        experience.
      </h6>
      <div className="mt-3">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="name" className="text-neutral-400">
            Tell use your name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="your name"
            onChange={(e) => handleChange({ name: e.target.value })}
            className="rounded-3xl focus:outline-4    outline-slate-900/50 outline-offset-4 py-3 px-5 text-base w-full"
          />
          {isError && (
            <p className="absolute -bottom-6 text-xs left-3 text-red-500">
              {isError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Categories;
