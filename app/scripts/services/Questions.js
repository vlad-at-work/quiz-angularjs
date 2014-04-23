'use strict';

a2App.factory('Questions', function($mongolabResource) {
    return $mongolabResource('questions');
});