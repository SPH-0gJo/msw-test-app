import { useState } from "react";

export const useModal = function () {
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  return {
    modalShow,
    toggleModal,
  };
};
