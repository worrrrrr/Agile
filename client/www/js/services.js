angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'wor' && pw == 'wor') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('myService', function($http) {
    return {
        searchTask: function(keyword) {
            $http.get('http://localhost:8000/api/searchTask/', {
              params:{ 
                data: keyword
            }
        })
            .success(function (data, status, headers, config) {
                console.log(data)
            })
        }
    };           
});