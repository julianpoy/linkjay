'use strict';

/**
 * @ngdoc service
 * @name linkJayApp.Users
 * @description
 * # Users
 * Service in the linkJayApp.
 */

//For nodemon use http://localhost:3000/


angular.module('linkJayApp')
  .factory('Login', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/login', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('linkJayApp')
  .factory('Join', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/join', {}, {
      submit: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('linkJayApp')
  .factory('UserUpdate', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/', {}, {
      update: {
        method: 'PUT',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('linkJayApp')
  .factory('Forgot', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/forgot', {}, {
      forgot: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });
  }]);

angular.module('linkJayApp')
  .factory('Session', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/users/session', {}, {
      validate: {
        method: 'GET',
        params: {},
        isArray: false
      }

    });
  }]);
