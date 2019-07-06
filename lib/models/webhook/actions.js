export const MEETING_CREATED                 = 'MEETING_CREATED'
export const MEETING_STARTED                 = 'MEETING_STARTED'
export const MEETING_ENDED                   = 'MEETING_ENDED'
export const MEETING_UPDATED                 = 'MEETING_UPDATED'
export const MEETING_PARTICIPANT_JOINED      = 'MEETING_PARTICIPANT_JOINED'
export const MEETING_PARTICIPANT_LEFT        = 'MEETING_PARTICIPANT_LEFT' 
export const MEETING_PARTICIPANT_JBH_JOINED  = 'MEETING_PARTICIPANT_JBH_JOINED'
export const MEETING_PARTICIPANT_JBH_WAITING = 'MEETING_PARTICIPANT_JBH_WAITING'

export function createMeeting(text) {
  return {event: MEETING_CREATED, text}
} 

export function startMeeting(text) {
  return {event: MEETING_STARTED, text}
}

export function endMeeting(text) {
  return {event: MEETING_ENDED, text}
}

export function updateMeeting(text) {
  return {event: MEETING_UPDATED, text}
}

export function joinMeeting(text) {
  return {event: MEETING_PARTICIPANT_JOINED, text}
}

export function leaveMeeting(text) {
  return {event: MEETING_PARTICIPANT_LEFT, text} 
}

export function joinBeforeHost(text) {
  return {event: MEETING_PARTICIPANT_JBH_JOINED, text}
}

export function joinBeforeHostWaiting(text) {
  return {event: MEETING_PARTICIPANT_JBH_WAITING, text} 
}
