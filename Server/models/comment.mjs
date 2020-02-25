import Schema from 'mongoose';
// const Schema = _Schema;

const schema = new Schema({
        body: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        children: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: false
    }
);
schema.set('toJSON', {
    virtuals: true
});
export default Schema.model('Comment', schema);
