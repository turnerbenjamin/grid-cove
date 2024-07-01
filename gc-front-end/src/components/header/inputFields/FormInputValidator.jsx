import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/contexts/appContext";

export default function FormInputValidator({
  values,
  validator,
  className,
  children,
  doSkipValidation,
}) {
  const [doShowErrors, setDoShowErrors] = useState(false);

  const handleBlur = () => {
    if (doSkipValidation) return setDoShowErrors(false);
    setDoShowErrors(true);
  };

  useEffect(() => {
    if (doSkipValidation) setDoShowErrors(false);
  }, [doSkipValidation]);

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
