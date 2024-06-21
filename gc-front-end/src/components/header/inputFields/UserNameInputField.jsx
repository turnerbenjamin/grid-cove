import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function UserNameInputField({
  userNameValue,
  isLoading,
  onChange,
}) {
  return (
    <FormInputValidator
      className="mb-2"
      values={[userNameValue]}
      validator={FormValidator.validateUsername}
    >
      <FormInput
        labelTitle="Username"
        placeholder="your-username"
        type="text"
        isLoading={isLoading}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
