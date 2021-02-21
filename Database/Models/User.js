const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const role = {
    USER : 'user',
    ADMIN : 'admin'
}

const UserSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true,
        unique: true,
        lowecase: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowecase: true
    },
    password:{
        type: String,
        require: true
    },
    discord: {
        type: String,
        require: true,
        unique: true
    },
    institutionName: {
        type: String,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0
    },
    lastPlayed: {
        type: Date,
        default: null
    },
    levelsPlayed:{
        type: Object,
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: role.USER
    }
});

UserSchema.pre('save',async function(next){

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch(error){
        next(error)
    }

})

const User = mongoose.model('user', UserSchema)

module.exports = User