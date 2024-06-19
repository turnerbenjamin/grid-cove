import classNames from "classnames";
import { CgSpinner } from "react-icons/cg";

export default function Button({
  primary = false,
  danger = false,
  children,
  onClick,
  className,
  isLoading,
  isDisabled,
  ...props
}) {
  const classes = classNames(
    " px-2 sm:px-4 py-1 sm:py-2 border ",
    {
      "border-primary-200 bg-primary-200 hover:bg-primary-300": !danger,
      "text-secondary-900": primary,
      "border-grid-red bg-grid-red hover:bg-opacity-90": danger,
      "bg-opacity-0 hover:bg-opacity-10": !primary && !danger,
      "disabled pointer-events-none": isDisabled || isLoading,
      "opacity-50": isDisabled,
    },
    className
  );

  if (isLoading) {
    return <CgSpinner className="animate-spin text-2xl" role="status" />;
  }

  return (
    <button
      {...props}
      type="button"
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
