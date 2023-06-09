import { createReducer } from "../../utils/redux";
export const ROLE_VIEW_REQUEST_ADMIN = "ROLE_VIEW_REQUEST_ADMIN";
export const ROLE_VIEW_SUCCESS_ADMIN = "ROLE_VIEW_SUCCESS_ADMIN";
export const ROLE_VIEW_FAILED_ADMIN = "ROLE_VIEW_FAILED_ADMIN";
export const ROLE_VIEW_CLEAR_ADMIN = "ROLE_VIEW_CLEAR_ADMIN";

export const ROLE_VIEW_REQUEST_VL = "ROLE_VIEW_REQUEST_VL";
export const ROLE_VIEW_SUCCESS_VL = "ROLE_VIEW_SUCCESS_VL";
export const ROLE_VIEW_FAILED_VL = "ROLE_VIEW_FAILED_VL";
export const ROLE_VIEW_CLEAR_VL = "ROLE_VIEW_CLEAR_VL";

const RoleViewAppReducer = createReducer(
  ROLE_VIEW_REQUEST_ADMIN,
  ROLE_VIEW_SUCCESS_ADMIN,
  ROLE_VIEW_FAILED_ADMIN,
  ROLE_VIEW_CLEAR_ADMIN
);

const RoleViewAppVLReducer = createReducer(
  ROLE_VIEW_REQUEST_VL,
  ROLE_VIEW_SUCCESS_VL,
  ROLE_VIEW_FAILED_VL,
  ROLE_VIEW_CLEAR_VL
);
export { RoleViewAppReducer, RoleViewAppVLReducer };
