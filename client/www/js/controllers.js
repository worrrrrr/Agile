angular.module('starter.controllers', ['ionic','chart.js'])

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout,$http, $ionicSideMenuDelegate) {
  // Form data for the login modal
  console.log("AppCtrl");
 

  $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    
  };
  


  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  //get users

  $scope.getUsers = function() {
    $http.get('http://localhost:8000/api/users').success(function(data) {
      //console.log(data)
      $scope.users = data;
      //console.log($scope.users);
    });
  };
  $scope.getUsers();

  //get project
/*  $scope.getProject = function() {
    $http.get('/project',{'id':'1'}).success(function(data) {
      $scope.project = data;
      console.log(data);
    })
  };
  $scope.getProject();

*/
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('HomeCtrl', function($scope,$state ,$stateParams, $ionicModal,$ionicActionSheet, $location, $timeout,$http, $rootScope, _,$ionicSideMenuDelegate) {
  //console.log($rootScope.currentProject)

  //console.log("HomeCtrl")
  $scope.keyword='';
  chart();
  
  //getTasks();
  //searchTask();
   $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();

  };

  function searchTask() {
            $http.get('http://localhost:8000/api/searchTask/', {
              params:{ 
                data: $rootScope.currentProject
              }
            })
            .success(function (data, status, headers, config) {
                
            })
  };
  
  function chart(){

    //console.log($rootScope);
    console.log(_.groupBy($rootScope.tasks,'state'));

    var temp=_.countBy($rootScope.tasks,'state');
   console.log(temp);
    $scope.datas=temp;
    $scope.data =_.values($scope.datas);
    $scope.labels=_.keys($scope.datas);
  }
  
  

  /*function getTasks(){
  $http.get('http://localhost:8000/api/tasks/').success(function(data){
    $scope.tasks=data;
     var temp=_.countBy($scope.tasks,'state');
    $scope.datas=temp;
    $scope.data =_.values($scope.datas);
    $scope.labels=_.keys($scope.datas);

    })
  };*/

 
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;


  $scope.more = function() {

   // Show the action sheet

   var hideSheet = $ionicActionSheet.show({
        titleText: 'Home',
     buttons: [
       { text: '<b>Add</b> Task' },
       { text: '<b>Add</b> Sprint' }

     ],
     //destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
          console.log('CANCELLED');
           // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          console.log("Add Task function"); 
          $scope.openAddTask();
      }
       return true;
     }

 
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

 };

  $ionicModal.fromTemplateUrl('templates/task.html',function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });



  // Open the login modal
  $scope.openTask = function(taskModal) { 
          $scope.taskModal = taskModal;      
          $scope.modal.show();
          
  };


  /*$ionicModal.fromTemplateUrl('templates/task.html',{
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.closeTask = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openTask = function() {
    $scope.modal.show();

  };*/


   //Modal addTask
  $ionicModal.fromTemplateUrl('templates/add_task.html', {
    scope: $scope
    
  }).then(function(modal) {
    $scope.modal1 = modal;

  });
  $scope.openAddTask = function() {
    
    $scope.modal1.show();
  };
   $scope.closeAddTask = function() {
    $scope.modal1.hide();

  };
})

.controller('BacklogCtrl', function($scope, $rootScope,$ionicModal,$ionicActionSheet,$location, $timeout,$http) {
  console.log("USE BacklogCtrl")

  $scope.priority="High";

 $scope.shouldShowDelete = false;
 $scope.listCanSwipe = true;



  $scope.tasks=_.sortBy($rootScope.tasks,'state').reverse();
  //Modal addTask
  $ionicModal.fromTemplateUrl('templates/add_task.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;

  });
  $scope.openAddTask = function() {
    
    $scope.modal1.show();
  };
   $scope.closeAddTask = function() {
    $scope.modal1.hide();

  };

  //task Detail Modal
  $ionicModal.fromTemplateUrl('templates/task.html',function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });



  // Open the login modal
  $scope.openTask = function(taskModal) { 
          $scope.taskModal = taskModal;      
          $scope.modal.show();
          
  };



   $scope.showH=function(){
      $scope.priority="High";
      $scope.prioritystate=1;
   }
   $scope.showM=function(){
      $scope.priority="Medium";
      $scope.prioritystate=2;
   }
   $scope.showL=function(){
      $scope.priority="Low";
      $scope.prioritystate=3;
   }

     $scope.more = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Add</b> Task' },
       { text: '<b>Add</b> Sprint' }
     ],
     //destructiveText: 'Delete',
     titleText: 'More',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          console.log("Add Task function"); 
          $scope.openAddTask();
      }
       return true;
     }

 
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

 };

})


//


.controller('SprintCtrl', function($scope, $ionicModal,$ionicActionSheet,$location, $timeout,$http) {
  console.log("USE SprintCtrl")
  $scope.state="Todo";
 $scope.listCanSwipe = true;
 
 $scope.sprints=[1,2,3]
 $scope.sprint=1;
  //Modal addTask
  $ionicModal.fromTemplateUrl('templates/add_task.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;

  });
  $scope.openAddTask = function() {
    
    $scope.modal1.show();
  };
   $scope.closeAddTask = function() {
    $scope.modal1.hide();

  };

    $scope.listSprint= [];
    $scope.listSprint.push({ text: '<b>Add</b> Task' });
    $scope.listSprint.push({ text: '<b>Add</b> Sprint' });

     for (var i = 0;i<$scope.sprints.length; i++) {
       //console.log($scope.sprints[i]);
       $scope.listSprint.push({text:"Sprint " + $scope.sprints[i]});
     };

     $scope.listSprintJSON = angular.toJson($scope.listSprint);

     console.log($scope.listSprintJSON)
/*   $scope.chooseSprint = function() {

     $scope.listSprint= [];
     for (var i = 0;i<$scope.sprints.length; i++) {
       //console.log($scope.sprints[i]);
       $scope.listSprint.push({text:"Sprint " + $scope.sprints[i]});
     };
     console.log($scope.listSprint);
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: $scope.listSprint ,
     //destructiveText: 'Delete',
     titleText: 'More',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      //console.log($scope.sprints)
      $scope.sprint=$scope.sprints[index] ;
        console.log($scope.sprint); 
       return true;
     }

 
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

  };*/



   $ionicModal.fromTemplateUrl('templates/task.html',function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
      });



  // Open the login modal
  $scope.openTask = function(taskModal) { 
          $scope.taskModal = taskModal;      
          $scope.modal.show();
          
  };


   $scope.showTodo=function(){
      $scope.state="Todo";
      $scope.taskState=1;
   }

   $scope.showDoing=function(){
      $scope.state="Doing";
      $scope.taskState=2;
   }

   $scope.showDone=function(){
      $scope.state="Done";
      $scope.taskState=3;
   }


     $scope.more = function() {
/*      $scope.listSprint.push({ text: '<b>Add</b> Task' });
      $scope.listSprint.push({ text: '<b>Add</b> Sprint'});*/
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: $scope.listSprint,
     titleText: 'More',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
      if(index==0){
          console.log("Add Task function"); 
          $scope.openAddTask();
      }else if(index==1){
        console.log("AddSprint")

      }else
        $scope.sprint=$scope.sprints[index-2] ;
        console.log($scope.sprint); 
      return true;
     }

 
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

  };
})
//

.controller('SettingCtrl', function($scope, $ionicModal,$location, $timeout,$http) {
  console.log("USE SettingCtrl")

})
//
.controller('TaskCtrl', function($scope, $ionicModal, $timeout,$http) {
  console.log("USE TaskCtrl")
  


  $scope.isChecked = { checked: true }

  $scope.setState =function(state){
      switch (state){
          case 'Todo':
             console.log('Todo state');
             $scope.taskModal.state='Todo';
             break;
          case 'Doing':
             console.log('Doing state');
             $scope.taskModal.state='Doing';
             break;
          case 'Done':
             console.log('Done state');
             $scope.taskModal.state='Done';
             break;
          default:
            console.log($scope.taskModal.state+'state');
      }
  }
  $scope.closeTask = function() {
    $scope.modal.hide();
  };
  

})
//

//


.controller('addTaskCtrl', function($scope, $ionicModal, $timeout,$http) {
  console.log("USE addTaskCtrl")
   $scope.task={}
  $scope.addThisTask=function(data){
    $scope.task.state="Todo";
    $scope.task.sprint="1";
    $http.post('http://localhost:8000/api/task',$scope.task).success(function(data){
         console.log($scope.task)
    });
    //console.log($scope.task)  
    //$scope.closeAddTask();
  }


  $scope

})
//
.controller('BurndownCtrl', function($scope, $ionicModal, $rootScope, $ionicActionSheet, $location, $timeout,$http,_) {
  console.log("USE BurndownCtrl")

     $scope.more = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Your team</b> ' },
       { text: '<b>All</b>' }
     ],
     //destructiveText: 'Delete',
     titleText: 'More',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
    
       return true;
     }

 
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

  };
    
  console.log(_.groupBy($rootScope.tasks,'pid'))

   var SpecialLabel = function (axisLabel, tooltipLabel) {
        this.axisLabel = axisLabel;
        this.tooltipLabel = tooltipLabel;
    }
    SpecialLabel.prototype.toString = function () {
        return this.axisLabel
    }


  $scope.labels = [new SpecialLabel("10-Jan"),
                  new SpecialLabel("11-Jan"),
                  new SpecialLabel("12-Jan"),
                  new SpecialLabel("13-Jan"),
                  new SpecialLabel("14-Jan"),
                  new SpecialLabel("15-Jan"),
                  new SpecialLabel("16-Jan"),
                      ];
  $scope.data = [
    [6,5,4,3,2,1,0],
    [6,5,3]
  ];
  $scope.data[0][0]=6;
  $scope.data[0][$scope.labels.length]=0;
/*new Chartist.Line('.ct-chart', {
  series: [[
    {x: 1, y: 100},
    {x: 2, y: 50},
    {x: 3, y: 25},
    {x: 5, y: 12.5},
    {x: 8, y: 6.25}
  ]]
}, {
  axisX: {
    type: Chartist.AutoScaleAxis,
    high:30,
    onlyInteger: true
  },
  axisY: {
    type: Chartist.AutoScaleAxis,
    high:$rootScope.currentProject.sprints[0].end,
    onlyInteger: true
  }
});*/

console.log($rootScope.currentProject);

      /*var data = {
        // A labels array that can contain any sort of values
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
          [5, 2, 4, 2, 0]
        ]
      };

      // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
      var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
          showPoint: false,
          axisX: {
            labelInterpolationFnc: function(value) {
              // Will return Mon, Tue, Wed etc. on medium screens
              return value.slice(0, 3);
            }
          }
        }],
        ['screen and (max-width: 640px)', {
          showLine: false,
          axisX: {
            labelInterpolationFnc: function(value) {
              // Will return M, T, W etc. on small screens
              return value[0];
            }
          },
          axisY: {
            type: Chartist.AutoScaleAxis,
            high:30,
            onlyInteger: true
          }
        }]
      ];

      new Chartist.Line('.ct-chart', data, null, responsiveOptions)
*/
// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.


})

//
.controller('LoginCtrl', function($scope,$rootScope, $ionicModal,$location,$ionicPopup, LoginService ,$http,$state) {
  //console.log("USE LoginCtrl")

    $scope.data = {};

   $scope.login = function() {
    console.log($scope.data);
    if($scope.data.username=='wor' && $scope.data.password=='123'){

      $http.post('http://localhost:8000/api/users',{username:$scope.data.username}).success(function(id){
            console.log(id)
            $http.post('http://localhost:8000/api/projects',{id:1}).success(function(data){
              $scope.projectlist=data;
              $rootScope.currentProject=data[0];
                  $http.post('http://localhost:8000/api/projects/tasks',{
                    id:data[0].id
                  }).success(function(data){
                    //console.log(data);
                    $rootScope.tasks=data;
                    $state.go('app.home');
           })            
        })
      })

          
    }else
      $ionicPopup.alert({
       title: 'Failed Login!',
       template: "username or password don't match"
      });
      
      };
      
})


.controller('ProjectCtrl', function($scope, $ionicModal,$location,$state, $timeout,$http,$rootScope) {
  //console.log("USE Project_listCtrl")


   $ionicModal.fromTemplateUrl('templates/add_project.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;

  });

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modalProfile.hide();


  };

  // Open the login modal
  $scope.addProject = function() {
    $scope.modal.show();
   
  };

   $ionicModal.fromTemplateUrl('templates/profile.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalProfile = modal;

  });

  // Open the login modal
  $scope.profileUser = function() {
    $scope.modalProfile.show();
   
  };
    $scope.getProjectlist=function(){
  $http.get('http://localhost:8000/api/projects').success(function(data){
    $scope.projectlist=data;
    console.log(data)
  })
 };
 $scope.getProjectlist();

 $rootScope.setProject=function(project){
  $rootScope.currentProject=project;
  //$rootScope.services.searchTask($rootScope.currentProject.id);
  //console.log($rootScope.currentProject);
      $http.post('http://localhost:8000/api/projects/tasks',{
        id:project.id
      }).success(function(data){
        //console.log(data);
        $rootScope.tasks=data;
        $state.reload();
      })
  //$state.go('app.home');
  //$location.path('/app/home');
  }


})


