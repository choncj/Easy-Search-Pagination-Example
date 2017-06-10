import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts, Schemas } from './posts.js';

Meteor.methods({
	'post.insert'(doc) {
		Schemas.PostsSchema.validate(doc);
		let additionalParams = {};
		additionalParams = {
			createdAt: new Date()
		};
		const postsobj = _.extend(doc, additionalParams);
		return Posts.insert(postsobj, (error, result) => {
		});
	},
	'post.remove'(postId) {
		check(postId, String);
		return Posts.remove(postId);
	}
});