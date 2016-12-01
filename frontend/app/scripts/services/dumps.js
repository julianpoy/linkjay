'use strict';

/**
 * @ngdoc service
 * @name linkJayApp.Dumps
 * @description
 * # Dumps
 * Service in the linkJayApp.
 */
angular.module('linkJayApp')
  .factory('Dumps', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/dumps/', {}, {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      },
      save: {
        method: 'POST',
        params: {},
        isArray: false
      }

    });

  }]);

angular.module('linkJayApp')
  .factory('Dump', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/dumps/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        },
        isArray: false
      },
      delete: {
        method: 'DELETE',
        params: {
          id: '@id'
        },
        isArray: false
      }
    });

  }]);
