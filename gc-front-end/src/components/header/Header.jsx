import Logo from "./Logo";
import UserControls from "./UserControls";

export default function Header() {
  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-3 p-2 border-b-[1px] border-secondary-700 self-center">
      <Logo />
      <UserControls />
    </div>
  );
}
