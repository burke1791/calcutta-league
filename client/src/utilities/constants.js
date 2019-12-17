export const AUTH_FORM_TYPE = {
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Create an Account'
};

export const LEAGUE_FORM_TYPE = {
  CREATE: 'Start a League',
  JOIN: 'Join a League'
};

export const MESSAGE_BOARD_FORM_TYPE = {
  NEW_TOPIC: 'New Topic'
};

export const AUCTION_STATUS = {
  INITIAL: 'initial',
  IN_PROGRESS: 'in-progress',
  ITEM_COMPLETE: 'item-complete',
  END: 'end'
}

export const NOTIF = {
  AUTH_MODAL_SHOW: 'auth_modal_show',
  AUTH_FORM_TOGGLE: 'auth_form_toggle',
  LEAGUE_MODAL_SHOW: 'league_modal_show',
  LEAGUE_FORM_TOGGLE: 'league_form_toggle',
  LEAGUE_CREATED: 'league_created',
  LEAGUE_JOINED: 'league_joined',
  LEAGUE_SUMMARIES_FETCHED: 'league_summaries_fetched',
  LEAGUE_USER_SUMMARIES_FETCHED: 'league_user_summaries_fetched',
  MESSAGE_BOARD_TOPICS_DOWNLOADED: 'message_board_topics_downloaded',
  MESSAGE_BOARD_MODAL_SHOW: 'message_board_modal_show',
  MESSAGE_THREAD_DOWNLOADED: 'message_thread_downloaded',
  NEW_MESSAGE_POSTED: 'new_message_posted',
  AUCTION_TEAMS_DOWNLOADED: 'auction_teams_downloaded',
  SIGN_IN: 'sign_in',
  SIGN_OUT: 'sign_out',
  NEW_CHAT_MESSAGE: 'new_chat_message',
  NEW_AUCTION_DATA: 'new_auction_data',
  TIMER_EXPIRED: 'timer_expired',
  MM_RESULTS_DOWNLOADED: 'mm_results_downloaded',
  MM_SCORE_SET: 'mm_score_set'
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
  join_league: 'api/join_league',
  start_auction: '/api/auction/start',
  stop_auction: '/api/auction/stop',
  new_topic: '/api/message_board/new_topic',
  new_message: '/api/message_thread/new_message',
  admin_march_madness_single_game: '/api/admin/mm_single_game'
};

export const API_GET = {
  current_user: '/api/current_user',
  league_summaries: '/api/league_summaries',
  league_user_summaries: '/api/league_user_summaries/',
  auction_teams: '/api/auction_teams/',
  message_board_topics: '/api/message_board/all/',
  message_thread: '/api/message_board/topic/',
  admin_march_madness_results: '/api/admin/march_madness_results/'
};

export const API_PUT = {
  next_item: '/api/auction/next_item',
  reset_clock: '/api/auction/reset_clock'
};