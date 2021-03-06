import Cookies from 'js-cookie';
import {setCampaigns} from './campaigns';
import { clearCategories } from './categories';
import { clearCampaigns } from './campaigns';
import { clearTags } from './tags';
import { clearNotes } from './notes';
import { clearUi } from './ui';
import { clearLoginErrors, clearSignUpErrors, setLoginErrors, setSignUpErrors } from './errors';

const SET_USER = 'auth/SET_USER';


export const setUser = user => {
  return ({
    type: SET_USER,
    user,
  });
}

export const login = (username, password) => async (dispatch) => {
  dispatch(clearLoginErrors());
  dispatch(clearSignUpErrors());
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/session/login/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ username, password, 'csrf_token': csrf_token }),
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(setUser(data));
    if (data.campaigns) {
      const campaigns = data.campaigns;
      dispatch(setCampaigns(campaigns));
      delete data.campaigns;
    }
  } else {
    dispatch(setLoginErrors(data.errors));
  }
}

export const signUp = (username, password, passwordConfirm) => async (dispatch) => {
  dispatch(clearLoginErrors());
  dispatch(clearSignUpErrors());
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/session/signup/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ username, password, passwordConfirm, 'csrf_token': csrf_token }),
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(setUser(data));
  } else {
    dispatch(setSignUpErrors(data.errors));
  }
}

export const logout = () => async (dispatch) => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/session/logout/', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'XSRF-TOKEN': csrfToken,
    },
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(setUser({ id: null }));
    dispatch(clearCampaigns());
    dispatch(clearCategories());
    dispatch(clearTags());
    dispatch(clearNotes());
    dispatch(clearUi());
  } else {
    res.errors = data['errors'];
  }
  return res
}

export default function authReducer(state={ id: null }, action) {
  // const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

//tbr