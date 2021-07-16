import './../scss/main.scss'

var inputMessage = document.querySelector('#message')
var send = document.querySelector('#send')
var iconSend = document.querySelector('#sendIcon')
var name = document.querySelector('#name')
var next = document.querySelector('#next')
var chatBot = document.querySelector('#chatBot')
var enterName = document.querySelector('#enterName')
var divMessage = document.querySelector('#divMessage')
var messageWelcome = document.querySelector('#messageWelcome')

send.disabled = true
next.disabled = true

inputMessage.onkeyup = () => {
    if(inputMessage.value.trim() != ""){
        iconSend.style.fill = '#bc178ced'
        send.style.cursor = 'pointer'
        send.disabled = false
    }else{
        iconSend.style.fill = '#707070'
        send.style.cursor = 'default'
        send.disabled = true
    }
}

name.onkeyup = () => {
    if(name.value.trim() != "" && name.value.trim().length > 2){
        next.disabled = false
    }else{
        next.disabled = true
    }
}

send.onclick = () => {
    sendMessage()
}

inputMessage.onkeypress = function (e) {
    if (e.keyCode == 13) {
        sendMessage()
    }
}

function sendMessage(){
    if(inputMessage.value.trim() != ""){
        let newMessage = '<div class="messages message-User"><p><strong>'+name.value+': </strong>'+inputMessage.value+'</p></div>'
        let cardMessages = document.querySelector('.card-body')
        cardMessages.innerHTML += newMessage
        inputMessage.value = ""
        inputMessage.focus()
        iconSend.style.fill = '#707070'
        send.style.cursor = 'default'
    }else{
        send.disabled = true
    }
}

next.onclick = () => {
    showChat()
}

name.onkeypress = function (e) {
    if (e.keyCode == 13) {
        showChat()
    }
}

function showChat(){
    if(name.value.trim() != "" && name.value.trim().length > 2){
        chatBot.classList.add("active")
        inputMessage.classList.add("active")
        enterName.classList.add("inactive")
        inputMessage.focus()
        setTimeout ( () => divMessage.style.zIndex = 1, 1000)
        messageWelcome.innerHTML = '<strong>Adara:</strong>'+ " Hola "+name.value+'! soy Adara, en que te puedo ayudar?'
    }
}
