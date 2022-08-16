const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const catagoryRouter = require('./routers/catagoryRouter');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const bidRouter = require('./routers/bidRouter');
const packageRouter = require('./routers/packageRouter');
const buyRouter = require('./routers/buyRouter');
const Emitter = require('events');
const redis=require('redis');
const app = express();
// const client=redis.createClient(6379,'127.0.0.1');
// client.on('connect',function(err){
//     console.log('redis connected')
// })
//  client.connect();
//  client.set('Port',6379);
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET']
    }
})
const port = 5000;
mongoose.connect("mongodb+srv://haseeb-ashiq:j1A6L5ls8IsK7d29@cluster0.6dnqg.mongodb.net/vehicleauction?retryWrites=true&w=majority")
mongoose.connection.once('open', () => console.log('database successful connected.'))
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/public/", express.static(path.join(__dirname, "uploads")));
app.use('/api', catagoryRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', bidRouter);
app.use('/api', packageRouter);
app.use('/api', buyRouter);
const users = {};
const products = [];

const userSocketMap=(roomId)=>{
   return  Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            users:users[socketId]
        }
    })
}
function getRooms(roomid)
{
    return Array.from(io.sockets.adapter.rooms.get(roomid) || [])
}
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        for (let user in users) {
            if (user === socket.id) {
                delete users[user]
            }
        }
    })

    socket.on('join', ({ name,roomId }) => {
        // console.log({name,roomId})
        users[socket.id] = name;
        socket.join(roomId)
        const clients=userSocketMap(roomId);
        eventEmitter.on('BidAdded', ({ _bids }) => {
            if (_bids !== null) {
             clients.forEach(
                 ({socketId}) => {
                     io.to(socketId).emit('NewBid',{_bids})
                 }
             )
            }
        })
    })

    
    
   
})
httpServer.listen(process.env.PORT || port, () => console.log('server run at 5000'))