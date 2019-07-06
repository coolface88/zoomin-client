import { createStore, applyMiddleware } from 'redux'
import webhookEventApp from './reducers'
import log from '../../logger'
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

import {Socket} from 'phoenix-channels'

import {
  socket,
  meeting_started_channel
} from './channels'
 
const logger = store => next => action => {
  log.info('dispatching', action)
  let result = next(action)
  return result
}

const phoenixChannelDispatcher = store => next => action => {
  switch (action.event) {
    case MEETING_STARTED:
      log.info('phoenixchannelDispatcher', action);
      meeting_started_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_ENDED:
      log.info('phoenixchannelDispatcher', action);
      meeting_ended_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_CREATED:
      log.info('phoenixchannelDispatcher', action);
      meeting_created_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_UPDATED:
      log.info('phoenixchannelDispatcher', action);
      meeting_updated_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_PARTICIPANT_JOINED:
      log.info('phoenixchannelDispatcher', action);
      meeting_participant_joined_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_PARTICIPANT_LEFT:
      log.info('phoenixchannelDispatcher', action);
      meeting_participant_left_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_PARTICIPANT_JBH_JOINED:
      log.info('phoenixchannelDispatcher', action);
      meeting_participant_jbh_joined_channel.push("new_msg", {body: action.event});
      break;
    case MEETING_PARTICIPANT_JBH_WAITING:
      log.info('phoenixchannelDispatcher', action);
      meeting_participant_jbh_waiting_channel.push("new_msg", {body: action.event});
      break;
    default:
      return next(action);
  }
}

const createStoreWithInitState = initialState => {
   return createStore(webhookEventApp, initialState);
}

const createStoreWithMiddlewares = applyMiddleware(logger, phoenixChannelDispatcher)(createStoreWithInitState);

export default function configureStore (preloadedState) { 
       socket.connect(); 
       meeting_started_channel.join()
         .receive("ok", resp => { log.info("The channel joined successfully", resp) })
         .receive("error", resp => { log.info("Unable to join that phoenix channel", resp) });
       return createStoreWithMiddlewares(preloadedState);}
