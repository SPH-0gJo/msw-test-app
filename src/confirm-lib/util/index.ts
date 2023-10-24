import ConfirmModal from "../component/ConfirmModal";
import createConfirmation from "../src/createConfirmation";
import { CustomConfirmOpts } from "../types";

export const customConfirm = (message: string) => {
  const confirmation = createConfirmation(ConfirmModal);
  const props: CustomConfirmOpts = {
    title: "확인",
    confirmation: message,
  };

  return confirmation(props);
};
