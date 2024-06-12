require ('dotenv').config();
dbUser = process.env.DB_USER ;
dbPass = process.env.DB_PASS;
dbName = process.env.DB_NAME;
cluster =  process.env.CLUSTER;
//
//
module.exports = {
    url: `mongodb+srv://${dbUser}:${dbPass}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
}