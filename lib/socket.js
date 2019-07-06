// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/tweet", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("tweet:", {})

let retweet_channel = socket.channel("retweet:", {})

let display_channel = socket.channel("display:", {})

let tweetbtn = document.getElementById("tweetbtn").addEventListener("click", function(){
    var val = document.getElementById('txtarea').value
    if (val != "") {
       channel.push("new_msg", {body: val})
    }
    document.getElementById('txtarea').value = ""
});

let messagesContainer = document.getElementById("tweet-panel")

channel.on("new_msg", payload => {
  //let messageItem = document.createElement("li")
  //messageItem.innerText = `[${Date()}] ${payload.body}`
  //let innerTxt = `${payload.body}`
  //messagesContainer.appendChild(innerTxt)

  console.log("dvdfgdf new msg ")

})

channel.on("abc", payload => {
  //let messageItem = document.createElement("li")
  //messageItem.innerText = `[${Date()}] ${payload.body}`
  //let innerTxt = `${payload.body}`
  //messagesContainer.appendChild(innerTxt)
  console.log("dvdfgdf sdjgsfjs sjdfjdsfgds msg ")
})

channel.on("new_num_page", payload => {

  val = `${payload.body}`
  cookie.setCookie("totalpages", val, 1)
  c = cookie.getCookie("totalpages")
  console.log(c)
  //let innerTxt = `${payload.body}`
  //messagesContainer.appendChild(innerTxt)
})

retweet_channel.on("new_msg", payload => {
  //let messageItem = document.createElement("li")
  //messageItem.innerText = `[${Date()}] ${payload.body}`
  let innerTxt = `${payload.body}`
  messagesContainer.appendChild(innerTxt)
})

display_channel.on("new_msg", payload => {
  //let messageItem = document.createElement("li")
  //messageItem.innerText = `[${Date()}] ${payload.body}`
  let innerTxt = `${payload.body}`
  messagesContainer.appendChild(innerTxt)
})

display_channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

retweet_channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })




export default socket
