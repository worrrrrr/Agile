angular.module('starter.controllers', ['ionic','chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {
  // Form data for the login modal
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
      console.log(data)
      $scope.users = data;
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



.controller('HomeCtrl', function($scope, $ionicModal,$ionicActionSheet, $location, $timeout,$http, $rootScope, _) {

  console.log("HomeCtrl")
  getTasks();
  
  $scope.options = {
    tooltipEvents: [],
    showTooltips: false,
    tooltipCaretSize: 0,
    onAnimationComplete: function () {
        this.showTooltip(this.segments, true);
    },
  };

  
 // $scope.labels = ["Todo", "Doing", "Done"];
 // $scope.data = [4, 3, 1];

 
  

  function getTasks(){
  $http.get('http://localhost:8000/api/tasks').success(function(data){
    $scope.tasks=data;
    console.log($scope.tasks) ;
    console.log(_.countBy($scope.tasks,'state'));

    //console.log(_.groupBy($scope.datas.keys,_.countBy($scope.tasks,'state')));
     var temp=_.countBy($scope.tasks,'state');
    console.log(_.defaults(temp, {Todo: 0, Doing: 0,Done:0 }));
    $scope.datas=temp;
    console.log($scope.datas);
    $scope.data =_.values($scope.datas);
    $scope.labels=_.keys($scope.datas);
    console.log($scope.labels,$scope.data)

   

  
  
    })
  };

  $scope.goProjectlist=function(){
      $location.path('/project_list');
      console.log("goProjectList");
  }


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



  $ionicModal.fromTemplateUrl('templates/task.html', {
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
  };


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

.controller('BacklogCtrl', function($scope, $ionicModal,$ionicActionSheet,$location, $timeout,$http) {
  console.log("USE BacklogCtrl")

  $scope.priority="High";

 $scope.shouldShowDelete = false;
 $scope.listCanSwipe = true;

  $scope.goProjectlist=function(){
      $location.path('/project_list');
      console.log("goProjectList");
  }
  
  $http.get('http://localhost:8000/api/users').success(function(data){
      $scope.users=data

  })
  $http.get('http://localhost:8000/api/tasks').success(function(data){
        $scope.tasks=data;
       console.log(data)
  })


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
    $ionicModal.fromTemplateUrl('templates/task.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;

  });
    $scope.closeTask = function() {
    $scope.modal.hide();

  };

  // Open the login modal
  $scope.openTask = function(data) {
    console.log(data);
    $scope.modal.task=data;
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

   $scope.chooseSprint = function() {

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

  };

  //go Projectlist
  $scope.goProjectlist=function(){
      $location.path('/project_list');
      console.log("goProjectList");
  }
  $http.get('http://localhost:8000/api/users').success(function(data){
      $scope.users=data

  })
  $http.get('http://localhost:8000/api/tasks').success(function(data){
        $scope.tasks=data;
       console.log(data)
  })

   $ionicModal.fromTemplateUrl('templates/task.html',
     {
    scope: $scope,
  }).then(function(modal) {
    $scope.modal = modal;

  });
    $scope.closeTask = function() {
    $scope.modal.hide();

  };

  // Open the task modal
  $scope.openTask = function(data) {
    console.log(data);
    $scope.modal.task=data;
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

.controller('SettingCtrl', function($scope, $ionicModal,$location, $timeout,$http) {
  console.log("USE SettingCtrl")
  $scope.goProjectlist=function(){
      $location.path('/project_list');
      console.log("goProjectList");
  }


})
//
.controller('TaskCtrl', function($scope, $ionicModal, $timeout,$http) {
  console.log("USE TaskCtrl")

  $scope.isChecked = 
    { text: "Home Task", checked: true }
  
  

  

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
.controller('BurndownCtrl', function($scope, $ionicModal, $ionicActionSheet, $location, $timeout,$http) {
  console.log("USE BurndownCtrl")
  
    $scope.goProjectlist=function(){
      $location.path('/project_list');
      console.log("goProjectList");
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
.controller('LoginCtrl', function($scope, $ionicModal,$location,$ionicPopup, LoginService ,$http,$state) {
  console.log("USE LoginCtrl")

    $scope.data = {};

   $scope.login = function() {
      $location.path('/project_list');
      console.log("goProjectList");
       console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})


.controller('Project_listCtrl', function($scope, $ionicModal,$location, $timeout,$http,$rootScope) {
  console.log("USE Project_listCtrl")


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


 $scope.goHome=function(projectname){
  $rootScope.currentProject=projectname;
  console.log($rootScope.currentProject);
  $location.path('/app/home');
  }
})

