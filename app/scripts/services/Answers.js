'use strict';

a2App.factory('Answers', function($mongolabResource) {
    return $mongolabResource('answers');
});