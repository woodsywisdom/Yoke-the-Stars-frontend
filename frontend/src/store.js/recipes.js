import Cookies from 'js-cookie';

import { addTags } from './tags';

const SET_NOTES = 'notes/SET_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const CLEAR_NOTES = 'notes/CLEAR_NOTES';

const setNotes = (tagName, notes) => {
  return ({
    type: SET_NOTES,
    tagName,
    notes,
  });
}

export const addNote = (note) => {
  return ({
    type: ADD_NOTE,
    note,
  });
}

export const clearNotes = () => {
  return ({
    type: CLEAR_NOTES,
  });
}

export const getNotes = tag => async dispatch => {
  const res = await fetch(`/api/tags/${tag.id}/`);
  const { savedNotes } = await res.json();
  if (res.ok) {
    dispatch(setNotes(tag.name, savedNotes));
  }
}

export const createNote = (noteContent, hashtagIds, campaignId, newHashtags) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const body = JSON.stringify({noteContent, hashtagIds, newHashtags, 'csrf_token': csrf_token})
  const res = await fetch(`/api/campaigns/${campaignId}/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token,
    },
    body,
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    const { newNote, newTags } = data;
    dispatch(addNote(newNote));
    dispatch(addTags(newTags));
    res.errors = [];
  } else {
    res.errors = data.errors;
  }
  return data;
}


export default function noteReducer(state={}, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case ADD_NOTE:
      const newNote = action.note;
      newNote.tags.forEach(tagName => {
        if (tagName in newState) {
          newState[tagName] = [...newState[tagName], newNote];
        }
      });
      return newState;
    case SET_NOTES:
      newState[action.tagName] = action.notes;
      return newState;
    case CLEAR_NOTES:
      return {};
    default:
      return state;
  }
}

//tbr