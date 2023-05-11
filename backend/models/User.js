const mongoose = require('mongoose');
const {compare, genSalt, hash} = require('bcrypt');
const { nanoid } = require('nanoid');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({email: value});

    if (user) return false;
};

const validateEmail = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
};

const validateUsernameLength = username => {
    return username.length < 15;
};

const validateTeamNameLength = teamName => {
    return teamName.length < 25;
};

const validatePasswordLength = password => {
    return password.length > 5;
};

const MultiUsers = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: validateUsernameLength,
            message: "Max character length - 15"
        }
    },
    lastname: {
        type: String,
        required: true,
        validate: {
            validator: validateUsernameLength,
            message: "Max character length - 15"
        }
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: validateEmail,
            message: 'Invalid e-mail address'
        }]
    },
});

const Competitions = new Schema({
    title: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 1
    }
});

const UserSchema = new Schema({
    users: [MultiUsers],
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [{
            validator: validateUnique,
            message: 'Team with such an email has already been registered',
        }, {
            validator: validateEmail,
            message: 'Invalid e-mail address'
        }]
    },
    teamName: {
        type: String,
        required: true,
        validate: {
            validator: validateTeamNameLength,
            message: "Max character length - 25"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validatePasswordLength,
            message: "The password must be longer than 6 characters"
        }
    },
    practicePoints: {
        type: Number,
        required: true,
        default: 0
    },
    competitionsPoints: [Competitions],
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['team', 'admin'],
        default: "team"
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    solvedPracticeChallenges: [{type: String}]
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await genSalt(SALT_WORK_FACTOR);
    this.password = await hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;