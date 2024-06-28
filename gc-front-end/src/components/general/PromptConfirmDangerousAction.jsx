import Button from "./Button";
import Modal from "./Modal";

export default function PromptConfirmDangerousAction({
  onProceed,
  onCancel,
  children,
}) {
  return (
    <Modal>
      <h3 className="text-2xl text-grid-orange text-center mb-2">Warning</h3>
      <div>{children}</div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <Button danger onClick={onProceed}>
          Proceed
        </Button>
        <Button primary onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
