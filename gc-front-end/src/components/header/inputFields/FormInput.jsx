export default function FormInput({
  value,
  labelTitle,
  placeholder,
  type,
  isDisabled,
  onChange,
}) {
  return (
    <div className="w-full max-w-[20rem] flex flex-col gap-1">
      <label className="w-full">{labelTitle}</label>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        title={labelTitle}
        className="w-full px-2 py-1 text-secondary-900"
        role="textbox"
        disabled={isDisabled}
        onChange={onChange}
      />
    </div>
  );
}
