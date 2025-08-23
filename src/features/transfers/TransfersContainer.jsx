import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateTransfer } from "./transfersSlice";
import TransferForm from "../../components/transfers/TransferForm";
import TransferConfirmationModal from "../../components/transfers/TransferConfirmationModal";
import TransferStatus from "../../components/transfers/TransferStatus";

export default function TransfersContainer() {
  const dispatch = useDispatch();
  const { list: accounts } = useSelector((state) => state.accounts);
  const { status } = useSelector((state) => state.transfers);

  const [formData, setFormData] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = (form) => {
    setFormData(form);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    dispatch(initiateTransfer(formData));
    setConfirmOpen(false);
  };

  return (
    <div>
      <TransferForm accounts={accounts} onSubmit={handleSubmit} />
      <TransferConfirmationModal
        open={confirmOpen}
        form={formData || {}}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
      <TransferStatus status={status} />
    </div>
  );
}
