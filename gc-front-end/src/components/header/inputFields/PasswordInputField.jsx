import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function PasswordInputField({
  passwordValue,
  isLoading,
  onChange,
}) {
  return (
    <FormInputValidator
      className="mb-2"
      values={[passwordValue]}
      validator={FormValidator.validatePassword}
    >
      <FormInput
        labelTitle="Password"
        placeholder="Your password"
        type="password"
        isLoading={isLoading}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
