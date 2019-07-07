# zoomin-client
The project is to setup a web client to create zoom meetings rooms on demand and webhooks dispatcher using Phoenix channels (meeting started, ended, & user joined). 
### the technologies
Express is used to provide HTTP routes for page and webhook controllers. Package management and project scripts is utilized with npm. Webpack is for bundling solutions of browser and Node environments. Babel is the compiler. Redux is used to manage simple application states shaping with webhooks events from zoom. Socket dispatcher is implemented with the Redux middleware for function composibility.   
### code walkthrough
- js/zoomin.js is the entry for client side (browser) with Zoom SDK.
- api/server.js is the entry for server side with Node enviroment and Express app.
- lib/models/webhook is the domain of webhook events handling with Redux utilized.
- .env, ZoomEvents.js, ... are the file configs
### code snippet
- MEETING_STARTED Zoom event json
```js
{
  "event": "meeting.started",
  "payload": {
    "account_id": "string",
    "object": {
      "id":"meeting2345",
      "uuid": "string",
      "host_id": "string",
      "topic": "string",
      "type": "integer",
      "timezone": "string",
      "duration": "integer"
    }
  }
}
```
- fix this to align with actual json payload of Zoom Meeting Events as its references or changing
```js
export const MEETING_CREATED                 = 'meeting.created';
export const MEETING_STARTED                 = 'meeting.started';
export const MEETING_ENDED                   = 'meeting.ended';
```
- I have tested this with my Phoenix server, fix this to align with your Phoenix socket setup. 
```js
import {Socket} from 'phoenix-channels'

export const socket = new Socket("ws://localhost:4000/tweet",{});

export const meeting_started_channel = socket.channel("tweet:", {});
export const meeting_created_channel = socket.channel("meeting_created:", {});
export const meeting_updated_channel = socket.channel("meeting_updated:", {});
export const meeting_ended_channel   = socket.channel("meeting_ended:", {});
```
### build && exec
```sh
npm run build-all
npm run start

> node api/dist/server/server

2019-07-07 17:27:51:812 - info: 
 --- 
 ==>  API is running on port 8080 
 ==>  Send requests to http://127.0.0.1:8080 
 --- 

2019-07-07 17:30:29:866 - info: The channel joined successfully
2019-07-07 17:30:59:598 - info: dispatching 
{ event: 'MEETING_STARTED', text: 'meeting2345' }
2019-07-07 17:30:59:601 - info: phoenixchannelDispatcher 
{ event: 'MEETING_STARTED', text: 'meeting2345' }
2019-07-07 17:31:31:663 - info: dispatching 
{ event: 'MEETING_STARTED', text: 'meeting2345' }
2019-07-07 17:31:31:664 - info: phoenixchannelDispatcher 
{ event: 'MEETING_STARTED', text: 'meeting2345' }
```
