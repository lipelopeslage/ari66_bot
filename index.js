const http = require('http');

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `393424068:AAG_3sUKdwJ3t-cT7O5CUzkl2tA1TVoYLQw`

const bot = new TelegramBot( TOKEN, { polling: true } )

const msgs = [
    "carai cuzão",
    "e ai seus cuzão",
    "vai se fudê cuzão",
    "cuzão cuzão",
    "ceis são mó otário",
    "como você é otário",
    "oxi cuzão",
    "patrãozinhooo <3 <3",
    "meus peixe caraio!",
    "6 frente? ai tu me fode cuzão!",
    "vou morar com o patrãozinho <3 <3",
    "vou ir embora com o patrãozinho hoje <3 <3",
    "vou escolher as aliança preta com o patrãozinho <3 <3",
    "tem que ser de RUBY cuzão!!"
];

const lastMsgs = new Array(msgs.length);

const getRand = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const randomMsg = function(){
    var msg = msgs[getRand(0, msgs.length-1)];
    return msg;
}

const isInHistory = function(theMsg){
    var checkArray = lastMsgs.slice(0);
    return checkArray.filter(function(msg){
        return msg === theMsg;
    }).length > 0;
}

const checkHistory = function(theMsg){
    var msg = randomMsg();
    if(isInHistory(theMsg)){
        console.log("[ERRO]", theMsg, "ESTA NO HISTORICO, checar", msg)
        return checkHistory(msg);
    }else{
        console.log("[OK]", theMsg, "NAO ESTA NO HISTORICO")
        return theMsg;
    }
}

const sendMsg = function(msg, match){
    var text = msg.text.toLowerCase();
    var msgToSend = "VAI TOMAR NO C$ SEU IMITÃO!!";
    if(text.match(/desce ai meu (parceiro|passero)/)){
        bot.sendMessage( msg.chat.id, msgToSend);
    }else if(!text.match(/\/start/)){
        msgToSend = checkHistory(randomMsg());
        bot.sendMessage( msg.chat.id, msgToSend);
    }
    lastMsgs[0] = msgToSend;
    for(var i = 0, total = msgs.length - 1; i < total; i++){
        lastMsgs[i+1] = lastMsgs[i];
    }
}


bot.onText( /(^\/start|.*)/, sendMsg);
console.log('rodando bot...')

http.createServer(function(){}).listen(process.env.PORT || 6000)