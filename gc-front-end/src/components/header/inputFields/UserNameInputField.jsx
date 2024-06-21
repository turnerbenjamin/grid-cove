import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function UserNameInputField({
  userNameValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;
  return (
    <FormInputValidator
      className="mb-2"
      values={[userNameValue]}
      validator={FormValidator.validateUsername}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        labelTitle="Username"
        placeholder="your-username"
        type="text"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
