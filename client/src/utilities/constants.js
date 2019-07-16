export const AUTH_FORM_TYPE = {
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Create an Account'
};

export const NOTIF = {
  AUTH_MODAL_SHOW: 'auth_modal_show',
  AUTH_FORM_TOGGLE: 'auth_form_toggle',
  SIGN_IN: 'sign_in',
  SIGN_OUT: 'sign_out'
};

export const ERROR_MESSAGES = {
  'auth/invalid-email': 'Invalid Email',
  'auth/user-disabled': 'User account has been disabled. Please contact support',
  'auth/user-not-found': 'Email does not exist',
  'auth/wrong-password': 'Email or Password is not correct',
  'auth/email-already-in-use': 'Email already in use',
  'auth/operation-not-allowed': 'Operation not allowed. This is a server issue, please try again later',
  'auth/weak-password': 'Password is too weak'
};

export const API_POST = {
  create_user: '/api/create_user',
  create_league: '/api/create_league'
};

export const API_GET = {
  current_user: '/api/current_user'
};