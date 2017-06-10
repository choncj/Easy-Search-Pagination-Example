import { Template } from 'meteor/templating';
import { Posts, PostsIndex } from '/imports/api/posts/posts.js';

import './home.html';

Template.home.onCreated(function () {
	var template = this;
	template.ready = new ReactiveVar();

	template.autorun(function() {
		var handle = template.subscribe('posts.all');
		template.ready.set(handle.ready());
	});

	template.linksup = function() {
		return Posts.find({}, {	sort: { createdAt: -1 }	});
	}
});


Template.home.helpers({
	postReady() {
		return Template.instance().ready.get();
	},
});