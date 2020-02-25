import mongoose from 'mongoose';
// const Schema = _Schema;
import URLSlugs from 'mongoose-url-slugs'
import slugify from 'transliter'
// import {  } from ;
import splitCreatedAt from './customPlugins.mjs';

const schema = mongoose.Schema({
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
