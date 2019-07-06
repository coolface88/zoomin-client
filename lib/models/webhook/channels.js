import {Socket} from 'phoenix-channels'

export const socket = new Socket("ws://localhost:4000/tweet",{});

export const meeting_started_channel = socket.channel("tweet:", {});
export const meeting_created_channel = socket.channel("meeting_created:", {});
export const meeting_updated_channel = socket.channel("meeting_updated:", {});
export const meeting_ended_channel   = socket.channel("meeting_ended:", {});
export const meeting_participant_joined_channel      = socket.channel("meeting_participant_joined:", {});
export const meeting_participant_left_channel        = socket.channel("meeting_participant_left:", {});
export const meeting_participant_jbh_joined_channel  = socket.channel("meeting_participant_jbh_joined:", {});
export const meeting_participant_jbh_waiting_channel = socket.channel("meeting_participant_jbh_waiting:", {});

