import {combineReducers} from 'redux'
import {
  MEETING_CREATED,
  MEETING_STARTED,
  MEETING_ENDED,
  MEETING_UPDATED,
  MEETING_PARTICIPANT_JOINED,
  MEETING_PARTICIPANT_LEFT,
  MEETING_PARTICIPANT_JBH_JOINED,
  MEETING_PARTICIPANT_JBH_WAITING
} from './actions'

function hookEvent(state = {}, action) {
  switch (action.event) {
    case MEETING_STARTED:
    case MEETING_ENDED:
    case MEETING_CREATED:
    case MEETING_UPDATED:
    case MEETING_PARTICIPANT_JOINED:
    case MEETING_PARTICIPANT_LEFT:
    case MEETING_PARTICIPANT_JBH_JOINED:
    case MEETING_PARTICIPANT_JBH_WAITING:
      return Object.assign({}, state, {event: action.event, text: action.text})
    default:
      return state
  }
}

const webhookEventApp = hookEvent

export default webhookEventApp
