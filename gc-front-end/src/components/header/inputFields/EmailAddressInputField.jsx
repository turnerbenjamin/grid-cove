import FormInput from "./FormInput";
import FormInputValidator from "./FormInputValidator";
import FormValidator from "../../../utils/FormValidator";

export default function EmailAddressInputField({
  emailAddressValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;
  return (
    <FormInputValidator
      className="mb-4"
      values={[emailAddressValue]}
      validator={FormValidator.validateEmailAddress}
      doSkipValidation={doSkipValidation}
    >
      <FormInput
        labelTitle="Email address"
        value={emailAddressValue}
        placeholder="your@email.com"
        type="email"
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </FormInputValidator>
  );
}
