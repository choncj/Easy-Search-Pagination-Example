import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Posts, PostsIndex } from '/imports/api/posts/posts.js';

import './addPost.html';

Template.addPost.onCreated(function () {
	const instance = this;
	instance.postPosts = function() {
		return Posts;
	};
});

Template.addPost.helpers({
	posts() {
		return Template.instance().postPosts();
	},
});