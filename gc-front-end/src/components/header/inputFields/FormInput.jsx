export default function FormInput({
  labelTitle,
  placeholder,
  type,
  isLoading,
  onChange,
}) {
  return (
    <div className="w-full max-w-[20rem] flex flex-col gap-1">
      <label className="w-full">{labelTitle}</label>
      <input
        type={type}
        placeholder={placeholder}
        title={labelTitle}
        className="w-full px-2 py-1 text-secondary-900"
        role="textbox"
        disabled={isLoading}
        onChange={onChange}
      />
    </div>
  );
}
