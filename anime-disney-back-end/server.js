//Block Start Loading The Enviorment Variables
// require('./creds/enviorment');
//Block End Loading The Enviorment Variables

//Block Start for Dependencies
const Database = require('./configuration/DatabaseConnection');
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const _EnviormentalVariables = require('./configuration/EnviormentalVariables');
//Block End for Dependencies



//Global Constant
const PORT = process.env.PORT || 1234;

//Block Start Initialize the APP
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
//Block End Initialize the APP

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
app.use('/AdminImages',express.static('Admin'));
app.use('/assets',express.static('assets'));
app.use('/FeatureProducts',express.static('FeatureProducts'));
app.use(express.static(path.join(__dirname,'/frontEnd')));
//End Block Set Static Folders (Absolute)

//Start Block Load Routes
//LoadingRoutes in Variable
const _AdminManagementRoute = require('./routes/AdminManagementRoute');
const _UserManagementRoute = require('./routes/UserManagementRoute');
const _PackageManagementRoute = require('./routes/PackageManagementRoute'); 
const _VideoManagementRoute = require('./routes/VideoManagementRoute');
const _WithDrawlManagementRoute = require('./routes/WithDrawlsManagementRoute');
//LoadingRoutes in Variable

//UsingRoutes
app.use('/AdminManagement',_AdminManagementRoute);
app.use('/UserManagement',_UserManagementRoute);
app.use('/PackageManagement',_PackageManagementRoute);
app.use('/VideoManagement',_VideoManagementRoute);
app.use('/WithDrawlManagement',_WithDrawlManagementRoute);
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
app.listen(PORT,()=>{
    console.log(`Server is running in ${_EnviormentalVariables._Port} mode on port ${PORT}`);
});

// cron.schedule('*/3 * * * * *', function() {
//     request('/UserManagement/UserRegister', function(error, response, body) {
//         console.log(response);
//         console.log(body);
//         console.log(error);
//     })
//   });




