import classNames from "classnames";
import { useState } from "react";

export default function FormInputValidator({
  values,
  validator,
  className,
  children,
}) {
  const [doShowErrors, setDoShowErrors] = useState(false);

  const handleBlur = () => {
    setDoShowErrors(true);
  };

  const [isValid, error] = validator(...values);
  const errorMessage = !isValid && (
    <p className="text-grid-red" role="alert">
      {error}
    </p>
  );

  const classes = classNames("w-full max-w-[20rem] mb-2", className);

  return (
    <div className={classes} onBlur={handleBlur}>
      {children}
      {doShowErrors && errorMessage}
    </div>
  );
}
