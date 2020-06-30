const socket = io('http://192.168.43.217:8000');
const form = document.getElementById('msg-frm');
const message = document.getElementById('msg');
const msgcontainer = document.getElementById('msg-section');
var audio=new Audio('./ting.mp3');

const append = (message,position)=>{
    const messageelement=document.createElement('div');
    const messageBox=document.createElement('div');
    const actualmsg=document.createElement('span');
    actualmsg.innerText=message;
    actualmsg.classList.add('text');
    messageBox.classList.add('message');
    messageBox.append(actualmsg);
    if(position=='left')
    {
        messageelement.classList.add('messagerecieved');
        audio.play();
    }
    else
        messageelement.classList.add('messagesend');
    
    messageelement.append(messageBox);
    msgcontainer.append(messageelement);
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left');
    msgcontainer.scrollTop=msgcontainer.scrollHeight;
});
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=message.value;
    append(`You: ${msg}`,'right');
    message.value="";
    msgcontainer.scrollTop=msgcontainer.scrollHeight;
    socket.emit('sendmsg',msg);
});
socket.on('recieve',data =>{
    append(`${data.name}: ${data.message}`,'left');
    msgcontainer.scrollTop=msgcontainer.scrollHeight;
})
socket.on('left',name =>{
    append(`${name} left the group`,'left');
    msgcontainer.scrollTop=msgcontainer.scrollHeight;
})