import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Posts, PostsIndex } from '/imports/api/posts/posts.js';

import './pagination.html';

Template.pagination.onCreated(function () {
});

Template.pagination.helpers({
	postsIndex: () => PostsIndex,
});

Template.pagination.events({
	'click .delete'(e) {
		Meteor.call('post.remove', this.__originalId);
	}, 
	'change .sorting': (e) => {
		PostsIndex.getComponentMethods()
			.addProps('sortBy', $(e.target).val())
	},
});