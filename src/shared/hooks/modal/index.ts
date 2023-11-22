import { useCallback, useState } from "react";

/**
 * 모달창 사용시 필요한 변수와 함수를 반환하는 함수
 * @returns
 */
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
