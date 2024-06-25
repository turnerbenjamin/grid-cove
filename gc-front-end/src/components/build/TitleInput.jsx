export default function TitleInput({ value, onChange }) {
  return (
    <input
      placeholder="Title"
      type="text"
      className="text-center text-secondary-900"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
