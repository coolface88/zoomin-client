import logger from '../../lib/logger';
import {
  MEETING_CREATED,
  MEETING_STARTED,
  MEETING_ENDED,
  MEETING_UPDATED,
  MEETING_PARTICIPANT_JOINED,
  MEETING_PARTICIPANT_LEFT,
  MEETING_PARTICIPANT_JBH_JOINED,
  MEETING_PARTICIPANT_JBH_WAITING
} from '../../lib/ZoomEvents';
import configureStore from '../../lib/models/webhook/configureStore';
import {
  createMeeting,
  startMeeting,
  endMeeting,
  updateMeeting,
  joinMeeting,
  leaveMeeting,
  joinBeforeHost,
  joinBeforeHostWaiting
} from '../../lib/models/webhook/actions';

const store = configureStore({});

const dispatchWebhookEvents = (req, res) => {
  switch (req.body.event){
    case MEETING_STARTED:
      store.dispatch(startMeeting(req.body.payload.object.id));
      break;
    case MEETING_ENDED:
      store.dispatch(endMeeting(req.body.id));
    case MEETING_CREATED:
      store.dispatch(createMeeting(req.body.id));
    case MEETING_UPDATED:
      store.dispatch(updateMeeting(req.body.id));
    case MEETING_PARTICIPANT_JOINED:
      store.dispatch(joinMeeting(req.body.id));
    case MEETING_PARTICIPANT_LEFT:
      store.dispatch(leaveMeeting(req.body.id));
    case MEETING_PARTICIPANT_JBH_JOINED:
      store.dispatch(joinBeforeHost(req.body.id));
    case MEETING_PARTICIPANT_JBH_WAITING:
      store.dispatch(joinBeforeHostWaiting(req.body.id));
    default:
      return res.status(404).send()
  }
  return res.status(200).send();
}; 

export default {
  dispatchWebhookEvents  
};
