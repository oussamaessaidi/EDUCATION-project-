// import app from app.js
const app = require('./backend/app');

 const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4200',
}
app.use(cors()); 

app.listen(3000, () => {
    console.log("Express APP is compiled succeffully")
});