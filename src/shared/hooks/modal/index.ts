import { useCallback, useState } from "react";

export const useModal = function () {
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = useCallback(() => {
    setModalShow(!modalShow);
  }, [modalShow]);

  return {
    modalShow,
    toggleModal,
  };
};
