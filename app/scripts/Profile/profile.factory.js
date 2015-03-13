;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .factory('ProfileFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

  function ($http, HEROKU, UserFactory, $routeParams){

    var user = UserFactory.user;


    var getAllJobs = function(res){
      return $http.get(HEROKU.URL + 'users/listings', {
          headers: HEROKU.CONFIG.headers,
          // cache: true
      });

    };

    var getProfile = function (id){
      return $http.get(HEROKU.URL + 'profile/' + user.id, 
        {headers: HEROKU.CONFIG.headers,}
        // cache: true
      );
    };

    // var editProfile = function(listObj){
    //   return $http.post(HEROKU.URL + 'users/listings', listObj, HEROKU.CONFIG);
    //   // headers: HEROKU.CONFIG.headers
    // };


    // var deleteList = function (id){
    //   return $http.delete(HEROKU.URL + 'users/listings/' + id, HEROKU.CONFIG);
    // };

    // var preInt = function (id) {
    //   return $http.post(HEROKU.URL + $interpolate('users/listings/:id/interviews'), 
    //     {headers: HEROKU.CONFIG.headers,}
    //     );

    // };

    // var addInterview = function (id, listObj){
    //   return $http.post(HEROKU.URL + 'users/listings/' + id + '/interviews', listObj, {header: HEROKU.CONFIG.headers});
    // };

    // var addPostInterview = function (){
    //   return $http.post(HEROKU.URL)
    // }



    return {
      add : addJob,
      get : getAllJobs,
      profile : getProfile,
      del : deleteList,
      addInt : addInterview
      // preInt : preInt

    };

    }

  ]);

}());