import { createDomTreeMounter } from "./mounter/domTree";

export const createConfirmationCreator =
  (mounter) =>
  //컴포넌트를 마운트 시키고, 컴포넌트에 resolve, reject를 전달해서 사용자로 부터 받은 응답을 전달해주는 커넥터 역할을 하는 함수
  (Component, unmountDelay = 1000, mountingNode) => {
    //confirm 함수의 정의
    /* props 는 아래와 같다. 
    show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
    proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
    confirmation: PropTypes.string,  // arguments of your confirm function
    options: PropTypes.object        // arguments of your confirm function
    */
    return (props) => {
      let mountId;
      const dispose = function () {
        setTimeout(() => {
          mounter.unmount(mountId);
        }, unmountDelay);
      };

      const promise = new Promise((resolve, reject) => {
        try {
          mountId = mounter.mount(
            Component,
            { reject, resolve, dispose, ...props },
            mountingNode
          );
        } catch (e) {
          console.error(e);
          throw e;
        }
      });

      // 사용자로부터 응답을 받은후 (resolve) dispose라는 추가 작업을 위해서 한번더 Promise를 반환
      return promise.then(
        (result) => {
          dispose();
          return result;
        },
        (err) => {
          dispose();
          return Promise.reject(err);
        }
      );
    };
  };

  export default createConfirmationCreator(createDomTreeMounter());