// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','chart.js','underscore'])


.run(function($ionicPlatform,$httpBackend) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });




})

  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#7401DF', '#01A9DB','#01DF3A'],
      responsive: false, 
  
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
 
  }])


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
   .state('app.home', {
    url: "/home",
    cache: false,
    views: {
      'home-tab': {
        controller: "HomeCtrl",
       templateUrl: "templates/home.html"
        
      }
    }
  })

  .state('project_list', {
    url: "/project_list",
    cache: false,
    templateUrl: "templates/project_list.html",
    controller:"Project_listCtrl"
    }
  )

  .state('app.backlog', {
    url: "/backlog",
    cache: false,
    views: {
      'backlog-tab': {
        controller: "BacklogCtrl",
        templateUrl: "templates/backlog.html"
      }
    }
  })

  .state('app.sprint', {
    url: "/sprint",
    cache: false,
    views: {
      'sprint-tab': {
        controller: "SprintCtrl",
        templateUrl: "templates/sprint.html"
      }
    }
  })
    .state('app.setting', {
    url: "/setting",
    cache: false,
    views: {
      'setting-tab': {
        controller: "SettingCtrl",
        templateUrl: "templates/setting.html"
      }
    }
  })
    
  .state('app.burndown', {
    url: "/burndown",
    cache: false,
    views: {
      'burndown-tab': {
        controller: "BurndownCtrl",
        templateUrl: "templates/burndown.html"
      }
    }
  })

   .state('login', {
    url: "/login",
    cache: false,  
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
      

  })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
   
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');



});

