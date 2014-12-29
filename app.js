'use strict';
// Declare app level module which depends on views, and components
angular.module('app', ['agsserver']).
  controller('test', ['$scope', '$http', 'Ags', function($scope, $http, Ags){
    //Create new server object
    var testServer = new Ags({host: '152.46.17.144'});
    console.log(testServer);


    //Set up options
    var streamsOptions = {
      folder: 'GEWA',
      layer: 'Streams',
      service: 'gewa_sde',
      server: 'FeatureServer',
      params: {
        f: 'json',
        where: 'OBJECTID > 0',
        outSR: 4326
      },
      headers: {
        'Content-Type': 'text/plain'
      },
      timeout: 5000,
      geojson: true,
      actions: 'query'
    };
    //Set intentional error for testing layer: Boudary1 does not exisit
    var boundaryOptions = {
      folder: 'GEWA',
      layer: 'Boundary',
      service: 'gewa_sde',
      server: 'FeatureServer',
      params: {
        f: 'json',
        where: 'OBJECTID > 0',
        returnGeometry: true,
        outSR: 4326
      },
      geojson: true,
      actions: 'query'
    };

    var gamefishOptions = {
      folder: 'GEWA',
      layer: 'Sample Locations',
      service: 'gewa_sde',
      server: 'FeatureServer',
      params: {
        f: 'json',
        features: [
          {
            "geometry": {"x": -76.9346809387207 , "y": 38.1779196445415 },
            "attributes": {"siteid": "TEST"}
          }
        ]
      },
      headers: {
        'Content-Type': 'text/plain'
      },
      timeout: 5000,
      geojson: false,
      actions: 'addFeatures'
    };

    testServer.request(streamsOptions)
      .then(function(data){
      console.log('Polyline Data');
      console.log(data);
      $scope.streams = data;
    });

    testServer.request(boundaryOptions)
    .then(function(data){
      console.log('Polygon Data');
      console.log(data);
      $scope.boundary = data;
    });

    testServer.request(gamefishOptions)
    .then(function(data){
      console.log('Point Data');
      console.log(data);
      $scope.gamefish = data;
    });

    // testServer.request('String')
    // .then(function(data){
    //   console.log('Point Data');
    //   console.log(data);
    //   $scope.gamefish = data;
    // });

  }]);
