const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {
        timestamps: true
    }
);
schema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('User', schema);
