import mongoose from 'mongoose';

const schema =  mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
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
export default mongoose.model('User', schema);
