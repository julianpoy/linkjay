'use strict';

/**
 * @ngdoc service
 * @name linkJayApp.Dumps
 * @description
 * # Dumps
 * Service in the linkJayApp.
 */
angular.module('linkJayApp')
  .factory('Labels', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/labels/', {}, {
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
  .factory('Label', ['$resource', 'ENV', function($resource, ENV) {

    return $resource(ENV.API_BASE + '/labels/:id', {
      id: '@id'
    }, {
      delete: {
        method: 'DELETE',
        params: {
          id: '@id'
        },
        isArray: false
      }
    });

  }]);
