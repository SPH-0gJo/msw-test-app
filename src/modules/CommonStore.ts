import { action, makeObservable, observable } from "mobx";
import { RootStore } from "@/modules/Store";
import { ToastTheme } from "@/component/Common/CustomToast";

interface ToastState {
  message?: string;
  theme: ToastTheme;
}
/**
 * 시스템 전반에서 공통적으로 필요한 state 관리를 담당하는 서비스 클래스
 */
class CommonStore {
  @observable
  toastState: ToastState = {
    message: "",
    theme: "FAIL",
  };
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    //const customAlert = commonStore.setToastMessage; 으로 호출하는 경우 this 바인딩 문제 발생
    this.setToastMessage = this.setToastMessage.bind(this);
  }

  @action
  setToastState(ts: ToastState) {
    this.toastState = {
      ...this.toastState,
      ...ts,
    };
  }

  setToastMessage(message: string, theme: ToastTheme = "SUCCESS") {
    //console.log(this);
    this.setToastState({
      message: message,
      theme,
    });
  }
}

export default CommonStore;
