const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const path = require('path');


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});


io.on('connection', socket => {
	console.log('A user connected');
  
	// 클라이언트로부터 offer 메시지를 받으면 다른 클라이언트에게 전달합니다.
	socket.on('offer', data => {
	  io.to(data.to).emit('offer', { from: socket.id, offer: data.offer });
	});
  
	// 클라이언트로부터 answer 메시지를 받으면 다른 클라이언트에게 전달합니다.
	socket.on('answer', data => {
	  io.to(data.to).emit('answer', { from: socket.id, answer: data.answer });
	});
  
	// 클라이언트로부터 icecandidate 메시지를 받으면 다른 클라이언트에게 전달합니다.
	socket.on('icecandidate', data => {
	  io.to(data.to).emit('icecandidate', { from: socket.id, candidate: data.candidate });
	});
  
	// 클라이언트가 연결을 끊었을 때 처리합니다.
	socket.on('disconnect', () => {
	  console.log('A user disconnected');
	});
  });  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
