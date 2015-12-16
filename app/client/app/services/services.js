angular.module('travel.services', [])


////////////////// Groups //////////////////////


.factory('Groups', function ($http) {
  // HTTP REQ FUNCTIONS
  var getGroups = function(userId){
    return $http({
      method: 'GET',
      url: '/api/groups',
      params: { userId: userId }
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var createGroup = function(data){
    return $http({
      method: 'POST',
      url: '/api/group',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  var addParticipants = function(data) {
    return $http({
      method: 'POST',
      url: '/api/group/add',
      data: data
    });
  };

  // NOT HTTP REQ FUNCTIONS
  var selectGroup = function (groupInfo, _$rootScope_) {
    _$rootScope_.currentGroup = groupInfo;
    _$rootScope_.destinationPermalink = groupInfo.destination;
  };

  return {
    // HTTP REQ FUNCTIONS
    getGroups: getGroups,
    createGroup: createGroup,
    addParticipants: addParticipants,

    // NOT HTTP REQ FUNCTIONS
    selectGroup: selectGroup,
  };
})


////////////////// CITY //////////////////////


.factory('City', function ($http) {
  var getCity = function(destPermalink){
    return $http({
      method: 'GET',
      url: '/api/dest',
      params: { name: destPermalink }
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getCity: getCity
  };
})


////////////////// UTIL //////////////////////


.factory('Util', function () {
  var transToPermalink = function (string) {
    // Leave commented-out to let the server throw errors for now
    // if (!string) return;

    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };

  return {
    transToPermalink: transToPermalink
  };
})


////////////////// VENUES //////////////////////


.factory('Venues', function ($http) {


  ////////////////// PLACES TO EXPLORE //////////////////////


  var getVenues = function(query){
    return $http({
      method: 'GET',
      url: '/api/dest/venues',
      params: {permalink: query}
    })
    .then(function successCb (resp){
      return resp.data;
    }, function errCb (resp) {
      console.error(resp);
      return resp;
    });
  };


  ////////////////// FAVORITES //////////////////////


  var getFavs = function(query){
    return $http({
      method: 'GET',
      url: '/api/favs',
      params: {query: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };


  var getUserFavorites = function (userId) {
    return $http({
      method: 'GET',
      url: '/api/fav/user',
      params: {userId: userId}
    })
    .then(function(resp) {
      console.log(resp.data);
      return resp.data;
    })
  };


  /*
    @param {object} venue should contain all venue data
    @param {str} userID should be the user's ID
  */
  var addToUserFavorites = function (venue, userId) {
    return $http({
      method: 'POST',
      url: '/api/fav/user',
      data: {venue: venue, userId: userId}
    });
  };


  var addToUserFavorites = function (venue, user) {
    return $http({
      method: 'POST',
      url: '/api/fav/user',
      data: {venue: venue, user: user}
    });
  }


  var rateVenue = function(data) {
    return $http({
      method: 'POST',
      url: '/api/favs',
      data: data
    });
  };


  ////////////////// GROUP FAVORITES - ADMIN ONLY //////////////////////


  var addtoItinerary = function(data) {
    return $http({
      method: 'POST',
      url: '/api/itin',
      data: data
    });
  };


  ////////////////// ITINERARY //////////////////////


  var getItinerary = function(query){
    return $http({
      method: 'GET',
      url: '/api/itin',
      params: {query: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getVenues: getVenues,
    getUserFavorites: getUserFavorites,
    addToUserFavorites: addToUserFavorites,
    rateVenue: rateVenue,
    getFavs: getFavs,
    getItinerary: getItinerary,
    addtoItinerary: addtoItinerary
  };

})


////////////////// TRANSFACTORY STORAGE //////////////////////


.factory('CurrentInfo', function ($http) {
  var destination = {
    name: null,
    basicInfo: null,
    venues: null
  };
  return {
    destination: destination
  };
})


////////////////// SESSION STORAGE //////////////////////


.factory('SessionStorage', function ($http, $location, $window) {
  var sessionExists = function () {
    return !!$window.sessionStorage.getItem('knowhere');
  };

  return {
    sessionExists: sessionExists
  };
});
