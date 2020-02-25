import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs'
import slugify from 'transliter'
// const Schema = ;

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: true
    }
);
schema.plugin(
    URLSlugs('title', {
        field: 'url',
        generator: text => slugify(text)
    })
);
// console.log(typeof splitCreatedAt)

schema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Post', schema);
