import Button from "../general/Button";

export default function AdminActions({ props }) {
  return (
    <div {...props}>
      <h3 className="mt-12 mb-2 text-center select-none">Admin Actions</h3>
      <div className="w-full h-[1px] bg-secondary-100 mb-6" />
      <div className="flex items-center justify-center gap-2">
        <Button>Reveal</Button>
        <Button danger>Delete</Button>
      </div>
    </div>
  );
}
