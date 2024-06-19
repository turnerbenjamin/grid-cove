import RegisterButton from "./RegisterButton";
import SignInButton from "./SignInButton";

export default function UserControls() {
  return (
    <div className="md:col-start-3 flex flex-row gap-2 place-self-end">
      <RegisterButton />
      <SignInButton />
    </div>
  );
}
