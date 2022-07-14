const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const cookieParser=require('cookie-parser');
const catagoryRouter=require('./routers/catagoryRouter');
const productRouter=require('./routers/productRouter');
const userRouter=require('./routers/userRouter');
const bidRouter=require('./routers/bidRouter');
const app = express();
const port=5000;
mongoose.connect("mongodb+srv://haseeb-ashiq:j1A6L5ls8IsK7d29@cluster0.6dnqg.mongodb.net/vehicleauction?retryWrites=true&w=majority")
mongoose.connection.once('open',()=>console.log('database successful connected.'))
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/public/", express.static(path.join(__dirname, "uploads")));
app.use('/api',catagoryRouter);
app.use('/api',productRouter);
app.use('/api',userRouter);
app.use('/api',bidRouter);
app.listen(process.env.PORT || port,()=>console.log('server run at 5000'))