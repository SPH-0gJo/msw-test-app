import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap";

interface CustomToastProps {
  //message: string;
}

export type ToastTheme = "SUCCESS" | "FAIL";

const getThemeMember = (theme: ToastTheme) => {
  const icon = theme === "SUCCESS" ? "fe-check-circle" : "fe-x-circle";
  const color = theme === "SUCCESS" ? "success" : "danger";

  return {
    icon,
    color,
  };
};

const CustomToast = (props: CustomToastProps) => {
  const { commonStore } = useStores();
  const { theme, message } = commonStore.toastState;

  const { color, icon } = getThemeMember(theme);

  const [show, setShow] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setShow(true);
    }
  }, [commonStore.toastState]);

  return (
    <Toast
      bg={color}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <ToastBody style={{ color: "#fff" }}>
        <i className={icon}></i> {message}
      </ToastBody>
    </Toast>
  );
};

export default observer(CustomToast);
