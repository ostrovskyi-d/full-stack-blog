const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const { slugify } = require('transliter');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: {
            created_at: new Date().toDateString()
        }
    }
)
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

module.exports = mongoose.model('Post', schema);
