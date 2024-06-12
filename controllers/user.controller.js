const db = require('../models');
const User = db.user;
const ethers = require('ethers')
// deal with emails
const { sendEmail, getEmailTemplate } = require('../lib/email.lib');


//POST

const createWallet = () => {
     // Create a wallet instance
     const wallet = ethers.Wallet.createRandom();

     // Display the EOA details
     console.log("eoaPublicKey: " + wallet.address);
     console.log("eoaPrivateKey: " + wallet.privateKey);
 
     // Return the private key
     return wallet;

}


exports.createUser = async(req, res, next) => {
    const { userEmail, userName } = req.body;
    const randomstring = require("randomstring");

    const loginCode = randomstring.generate({
        length: 6,
        charset: 'numeric'
    });

    const existingEmail = await User.findOne({userEmail})
    if(!existingEmail){
        const wallet = createWallet();
        
        const user = new User({
            userEmail,
            userName,
            loginCode,
            walletAddress: wallet.address,
            privateKey: wallet.privateKey
        })
        user
            .save(user)
            .then(data =>{
                const emailOptions = {
                    subject: `Your code to the Demo app`,
                    html: getEmailTemplate('init_admin', {
                        userEmail,
                        userName,
                        loginCode
                    }),
                    to: userEmail,
                    from: 'tocon@tocon.io'
                }
                sendEmail(emailOptions);
                

                return res.status(200).send(data)
            })
            .catch(err => {
                return res.status(500).send(err)
            })

    } else {
        try{
            const userAccount = await User.findOneAndUpdate({userEmail}, {loginCode}, {new: true})
            res.status(200).send(userAccount)
        }
        catch(err){
            res.status(400).send(err)
        }
        
    }

    
    const emailOptions = {
        subject: `Your code to the Demo app`,
        html: getEmailTemplate('init_admin', {
            userEmail,
            userName,
            loginCode
        }),
        to: userEmail,
        from: 'tocon@tocon.io'
    }
    sendEmail(emailOptions);

}

exports.checkCode = (req, res) => {
    const { userEmail, loginCode } = req.body;

    User.findOne({userEmail})
    .then(data => {
        if(data.loginCode === loginCode){
            return res.status(200).send({success: true, msg: 'Authentication succeeded'})
        } else{
            return res.status(401).send({success: false, msg: 'Authentication failed'})
        }
    })
}