//Block Start Loading The Enviorment Variables
// require('./creds/enviorment');
//Block End Loading The Enviorment Variables

//Block Start for Dependencies
const Database = require('./configuration/DatabaseConnection');
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require("mongoose");
const socketio = require('socket.io');
const http = require('http');
//Block End for Dependencies

//Block Start Initialize the APP
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
//Block End Initialize the APP

//Global Constant
const PORT = 5080;

//Socket.Io Initializer
const server = http.createServer(app); 
const io = socketio(server,{
    cors:{
        origin:'*'
    }
});


//Start Blcok Setting the Headers for you Application
app.all('*', (req, res, next) => {

     // This is how we protect the api
     res.header('Access-Control-Allow-Origin','*');// So it make the header allow to the origin when cross platfrom try to exchange the data
     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
     if(req.method==='OPTIONS'){
         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
     //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
  
     }
     next(); //if nothing of the response sent back so next() means other rou
});
//End Block Setting the Headers for you Application

//Start Block Set Static Folders (Absolute)
app.use('/assets',express.static('assets'));
app.use(express.static(path.join(__dirname,'/frontEnd')));
//End Block Set Static Folders (Absolute)

//Start Block Load Routes
//LoadingRoutes in Variable
const _UserManagementRoute = require('./routes/UserManagementRoute');
const _PublicManagementRoute = require('./routes/PublicManagementRoute');
//LoadingRoutes in Variable

//UsingRoutes
app.use('/UserManagement',_UserManagementRoute);
app.use('/PublicManagement',_PublicManagementRoute);
//UsingRoutes

//End Block Load Routes



//Serving Front End From Express Server
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontEnd/index.html'));
});

// End Block Checking Routes


//Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 
app.use((req,res,next)=>{
    const error= new Error('Url not found'); 
    error.status=404; 
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
        }
    })
});



//Starting the app
server.listen(PORT,()=>{
    console.log(`Server is running in mode on port ${PORT}`);
});


//Run when client connect
io.on('connection', (socket) => {
    //Not connection is the key that you needed to create a connection b/w
    //client and the server
    // Scoket is an Object allows us to join specific chat rooms and also
    // to catch and emit the events
    console.log('Connection has Made');

    socket.on('OnClientMessage',(Message) => {
        console.log(Message);
        io.emit('OnServerMessage',Message);
        //Yahan Database Call karo jahan message ko array main pus karo
    })
})







