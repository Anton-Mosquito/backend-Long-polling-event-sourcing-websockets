const ws = require('ws');

const wss = new ws.Server({
  port:5000,
}, () => console.log(`Server started on 5000 port`))

wss.on('connection', function connection(ws) {
  //ws.id= Date.now();

  ws.on('message', function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case "message":
        broadCastMessage(message);
        break;
      case "connection":
        broadCastMessage(message);
          break;
      default:
        break;
    }
  })
})

function broadCastMessage(message, id) {
  wss.clients.forEach(client => {
    //if (client.id === id) {
      client.send(JSON.stringify(message))
    //}
  })
}


// const message = {
//   event:"message/connection",
//   id: 123,
//   date: '03.02.2022',
//   username: 'nobody',
//   message: 'Some text of message'
// }