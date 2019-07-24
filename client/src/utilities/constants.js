export const AUTH_FORM_TYPE = {
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Create an Account'
};

export const LEAGUE_FORM_TYPE = {
  CREATE: 'Start a League',
  JOIN: 'Join a League'
};

export const NOTIF = {
  AUTH_MODAL_SHOW: 'auth_modal_show',
  AUTH_FORM_TOGGLE: 'auth_form_toggle',
  LEAGUE_MODAL_SHOW: 'league_modal_show',
  LEAGUE_FORM_TOGGLE: 'league_form_toggle',
  LEAGUE_CREATED: 'league_created',
  LEAGUE_JOINED: 'league_joined',
  LEAGUE_SUMMARIES_FETCHED: 'league_summaries_fetched',
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
  create_league: '/api/create_league',
  join_league: 'api/join_league'
};

export const API_GET = {
  current_user: '/api/current_user',
  league_summaries: '/api/league_summaries'
};