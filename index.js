const Config  = require('./models/Config')
const Message = require('./models/Message')
const axios   = require('axios');
const cron    = require('node-cron');

async function main() {
  // Obtener configuracion bot
  const config = await Config.get()

  // last ID message
  const lastMessageID = await Message.getLastMessageID()

  // Definir el mensaje
  let selectIDMessage = lastMessageID

  if (config.lastMessageID == selectIDMessage) {
    selectIDMessage = 1
  } else {
    selectIDMessage = config.lastMessageID + 1
  }

  // Seleccionar el mensaje
  const message = await Message.getMessage(selectIDMessage)

  // actualizar el ultimo mensaje
  const updateLastMessage = await Config.update('lastMessageID', selectIDMessage)

  // Envio del mensaje a Telegram
  mensajeText = message.message

  if (message.addLink) {

    mensajeText += `

*${message.callToAction}:* ${message.link}
`;

  }

  // Envía la petición POST usando Axios
  axios.post(`https://api.telegram.org/bot${config.token}/sendMessage`, {
    chat_id: config.chatID,
    text: mensajeText
  })
    .then(response => {
      console.log('Mensaje enviado con éxito:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar mensaje:', error);
    });
  
  console.log('executed!')
}

// PROD
// cron.schedule('0 7,19 * * *', () => {
//  // código a ejecutar a las 7AM y 7PM
    // main()
// });

// TEST
main();
// cron.schedule('* * * * *', () => {
//   main()
// });