module.exports = mongoose => {

    var schema = mongoose.Schema({
        userEmail: { type: String, required: true, trim: true, lowercase: true, unique: true },
        userName: { type: String, required: true},
        walletAddress: { type: String },
        privateKey: { type: String},
        loginCode: { type: Number}
    });


    const User = mongoose.model("users", schema);
    return User;
};