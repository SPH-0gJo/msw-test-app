/**
 * 메시지 텍스트 문구 정의
 */

export const ERROR = {
  REQUIRED: "필수 입력 값입니다.",
  PW_NOT_EQ: "비밀번호가 일치하지 않습니다.",
  NOT_PROCESSED: "오류가 발생했습니다. 관리자에게 문의하세요.",
  STATUS_OK_BUT_FAIL: "200 OK, but result data is failed",
  EXIST_GROUP_NAME: "이미 사용중인 그룹명입니다.",
  EXIST_MENU_PATH_NAME: "이미 사용중인 영문메뉴명입니다.",
  NO_SELECTION: "작업할 항목을 선택해주세요",
};

export const CONFIRM = {
  DELETE: "삭제하시겠습니까?",
};

export const SUCCESS = {
  PROCCESSED: "작업이 완료되었습니다.",
};

export const VALIDATION_ERROR = {
  USER_ID: "4자 이상 25자 이하 영문 대소문자 및 숫자만 가능",
  USER_NAME: "한글 또는 영문 2자 이상 20자 이내",
  PASSWORD: "영문, 숫자, 특수문자 포함 8자 이상 25자 이하",
  GROUP_NAME: "한글 또는 영문, 숫자 2자 이상 50자 이내",
  MENU_NAME: "한글, 숫자 또는 영문 2자 이상 20자 이내 띄어쓰기 허용",
  MENU_PATH_NAME: "영문 소문자, 숫자 2자 이상 30자 이내, 하이픈(-)만 사용가능",
  MENU_SORT_NO: "1 이상의 숫자만 가능합니다.",
  MENU_ETC: "1000자 이내",
  LOG_DATE_RANGE:
    "유효하지 않은 조회 기간입니다. 조회 기간을 3개월 이내로 설정해 주세요.",
};

export const RESULT = {
  NO_DATA: "조회된 데이터가 없습니다.",
};
