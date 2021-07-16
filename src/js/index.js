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
var messageIA = document.querySelector('.message-IA')
var index = 0

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
    insertMessage(name.value, inputMessage.value)
}

inputMessage.onkeypress = function (e) {
    if (e.keyCode == 13) {
        insertMessage(name.value, inputMessage.value)
    }
}

function insertMessage(entity, message){
    let newMessage = ""
    let cardMessages = document.querySelector('.card-body')
    if(message.trim() != ""){
        if(entity != 'Adara'){
            newMessage = '<div class="messages message-User" id="'+entity+'-'+index+'"><p><strong>'+entity+': </strong>'+message+'</p></div>'
            inputMessage.value = ""
            iconSend.style.fill = '#707070'
            send.style.cursor = 'default'
            send.disabled = true
            inputMessage.disabled = true
            setTimeout ( () => connect(entity, message), 800)
        }else{
            newMessage = '<div class="messages message-IA" id="'+entity+'-'+index+'"><p><strong>'+entity+': </strong>'+message+'</p></div>'
        }
        cardMessages.innerHTML += newMessage
        var idMessage = document.querySelector("#"+entity+'-'+index)
        setTimeout ( () => cardMessages.scrollTop = cardMessages.scrollHeight, 800)
        setTimeout ( () => idMessage.classList.add("active"), 300)
        index=index+1

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
        messageIA.classList.add("active")
    }
}

function connect(user, message){
    var url = 'http://127.0.0.1:8000/api/chatBot'
    var data = {user: user, message: message}

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-CSRF-Token": document.querySelector('input[name=_token]').value
        }
    }).then(res => res.json())
    .catch(error => alert('Opps algo salió mal...'))
    .then(response => responseIA(response) )
}

function responseIA(response){
    insertMessage('Adara', response.response)
    send.disabled = false
    setTimeout ( () => inputMessage.disabled = false, 1000)
    setTimeout ( () => inputMessage.focus(), 1000)
}
