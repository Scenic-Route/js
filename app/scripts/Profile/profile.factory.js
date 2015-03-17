;(function() {
  "use strict";

  angular.module('ScenicRoute')

  .factory('ProfileFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

  function ($http, HEROKU, UserFactory, $routeParams){

    var user = UserFactory.user;


  

    var getProfile = function (id){
      return $http.get(HEROKU.URL + 'profiles/' + id, 
        {headers: HEROKU.CONFIG.headers,}
        // cache: true
      );
    };

    var saveVehicleProfile = function (data){
      console.log(data);
      return $http.patch(HEROKU.URL + 'profiles', data, HEROKU.CONFIG
        );
    };

   



    return {
      getP : getProfile,
      saveVP: saveVehicleProfile,

    };

    }

  ]);

}());