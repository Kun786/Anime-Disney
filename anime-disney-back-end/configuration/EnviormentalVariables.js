//Depndencies
const dotenv = require('dotenv');


//dotenv
// if(process.env.NODE_ENV !== 'production'){
//     dotenv.config({path: `${__dirname}/../SkillstituteInternational.env`});
// }
// ./= current directory      ../outside of current directory
dotenv.config({path:`${__dirname}/../EnviormentVariable.env`});

console.log(__dirname);

console.log(process.env.PORT);
console.log(process.env.MONGO_URI);
