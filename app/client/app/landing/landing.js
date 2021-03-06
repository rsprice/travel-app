angular.module('travel.landing', ['ngAnimate', 'ui.bootstrap'])

.controller('LandingController', function ($scope, $window, $state, $rootScope, Groups, Util, Venues) {
  $scope.destinations = null;
  $scope.data = {};

  $scope.sendDestination = function(destination) {
    $rootScope.destination = destination;
    $scope.data.group = $scope.data.group || "anonymous";

    Groups.createGroup({
      groupName : $scope.data.group,
      userId : $rootScope.currentUser._id,
      destinationId : $rootScope.destination.id
    })
    .then(function (newGroup) {
      Groups.selectGroup(newGroup, function () {
        $state.go('results');
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  };

  $scope.getDestsFromApi = function () {
    Venues.getAllDestinations()
    .then(function (destinations) {
      var allDestinations = destinations;
      allDestinations.forEach(function(destination) {
        if (destination.permalink === "portland-or") {
          destination.state = "OR";
        }
        if (destination.permalink === "portland-me") {
          destination.state = "ME";
        }
        if (destination.permalink === "naples-fl") {
          destination.state = "FL";
        }
        destination.splash_photo = "http://static.tripexpert.com/images/destinations/splash_photos/index/" + destination.id + ".jpg";
      });
      $scope.destinations = allDestinations;
      $rootScope.allDestinations = allDestinations;
    });
  };

  $scope.getDestsFromApi();

});
