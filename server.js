const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();

const PORT = process.env.PORT;

console.log(process.env.CLUSTER);
app.use(cors('*'));
app.use(express.json());

app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
app.get('/', (req, res)=> {
    res.send('app is working')
})
const db = require("./models");
db.mongoose
    .connect(db.url, {})
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });

require("./routes/user.routes")(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
//