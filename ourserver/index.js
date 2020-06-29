const io = require('socket.io')(8000);
var users={};
io.on('connection',socket =>{
socket.on('new-user-joined',name =>{
    if(name!=null)
    {
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
    }
});
socket.on('sendmsg',message =>{
    socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
});
socket.on('disconnect',message =>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});

});