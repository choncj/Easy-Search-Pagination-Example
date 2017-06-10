import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Index, MongoDBEngine } from 'meteor/easy:search';

SimpleSchema.extendOptions(['autoform']);

export const Posts = new Mongo.Collection('posts');

export const PostsIndex = new Index({
	collection: Posts,
	fields: ['title'],
	defaultSearchOptions: {
		limit: 5
	},
	engine: new MongoDBEngine({
		sort: function (searchObject, options) {
			const sortBy = options.search.props.sortBy
			// return a mongo sort specifier
			if ('date1' === sortBy) {
				return {
					createdAt: -1,
				}
			} else if ('date2' === sortBy) {
				return {
					createdAt: 1,
				}
			} else if ('title1' === sortBy) {
				return {
					title: 1,
				}
			} else if ('title2' === sortBy) {
				return {
					title: -1,
				}
			} else {
				return {
					createdAt: -1,
				}
			}
		},
	})
});

export const Schemas = {};

Schemas.PostsSchema = new SimpleSchema({
	title: {
		type: String,
		label: "title"
	},
	text: {
		type: String,
		label: "text",
		optional: true,
		autoform: {
			type: 'textarea',
			rows: 5
		}
	},
	_id: {
		type: String,
		optional: true,
		autoform: {
		omit: true
		}
	},
	createdAt: {
		type: Date,
		optional: true,
		autoform: {
			omit: true
		}
	}
}, { tracker: Tracker });

Posts.attachSchema(Schemas.PostsSchema);

if (Meteor.isServer) {
	if (Posts.find().count() < 1) {
		[{ title: 'Here\'s the Thing 1', text: 'http://5by5.tv/b2w', createdAt: new Date() },
		{ title: 'Here\'s the Thing 2', text: 'http://www.merlinmann.com/roderick', createdAt: new Date() },
		{ title: 'Here\'s the Thing 3', text: 'http://www.wnyc.org/shows/heresthething', createdAt: new Date() },
		{ title: 'Here\'s the Thing 4', text: 'http://www.wnyc.org/shows/heresthething', createdAt: new Date() },
		{ title: 'Here\'s the Thing 5', text: 'http://www.wnyc.org/shows/heresthething', createdAt: new Date() },
		{ title: 'Here\'s the Thing 6', text: 'http://www.wnyc.org/shows/heresthething', createdAt: new Date() },
		{ title: 'Here\'s the Thing 7', text: 'http://www.wnyc.org/shows/heresthething', createdAt: new Date() },
		{ title: 'Here\'s the Thing 8', text: 'http://www.dhammatalks.org/mp3_index.html', createdAt: new Date() },
		{ title: 'Here\'s the Thing 9', text: 'http://www.dhammatalks.org/mp3_index.html', createdAt: new Date() },
		{ title: 'Here\'s the Thing 10', text: 'http://www.dhammatalks.org/mp3_index.html', createdAt: new Date() },
		{ title: 'Here\'s the Thing 11', text: 'http://www.dhammatalks.org/mp3_index.html', createdAt: new Date() }]
		.forEach((posts) => Posts.insert(posts));
	}
}