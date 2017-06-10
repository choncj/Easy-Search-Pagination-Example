import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/pages/home.js';
import '/imports/components/pagination/pagination.js';
import '/imports/components/addPost/addPost.js';

AutoForm.setDefaultTemplate('bootstrap3');

Tracker.autorun(function () {
	FlowRouter.watchPathChange();
	var currentContext = FlowRouter.current();
});

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('home');
	}
});