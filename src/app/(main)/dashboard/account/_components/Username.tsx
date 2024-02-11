type Username = {
  username: string;
  isError: string;
};

type Props = Username & {
  handleChange: (fields: Partial<Username>) => void;
};

const Username = ({ username, handleChange, isError }: Props) => {
  return (
    <div className="relative flex   items-center">
      <span className="absolute text-neutral-500 text-sm top-1/2 left-6 -translate-y-1/2">
        Sync/
      </span>
      <input
        type="text"
        name="username"
        value={username}
        autoComplete="off"
        onChange={(e) => handleChange({ username: e.target.value })}
        placeholder="synchub username"
        className="rounded-3xl focus:outline-4     outline-slate-900/50 outline-offset-4 py-3 pr-4 pl-[4.5rem] text-base w-full"
      />
      {isError && (
        <p className="absolute -bottom-6 text-xs left-3 text-red-500">
          {isError}
        </p>
      )}
    </div>
  );
};
export default Username;
