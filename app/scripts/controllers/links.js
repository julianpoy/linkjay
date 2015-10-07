'use strict';

/**
 * @ngdoc function
 * @name linkDumpApp.controller:LinksCtrl
 * @description
 * # LinksCtrl
 * Controller of the linkDumpApp
 */
angular.module('linkDumpApp')
  .controller('LinksCtrl', function($scope, $sce, $cookies, $timeout, Dumps, Dump, Labels, Label, $location, $http) {

    //Get our sessions token
    var sessionToken = $cookies.get("sessionToken");

    //inititalizes our dumps
    $scope.dumps = [];

    //Inititalize searching
    $scope.findInput = false;

    //Initialize soundcloud
    SC.initialize({
      client_id: 'b9513e908ef7793171225f04e87cf362'
    });

    //Our main scraper will be noembed, since it is free and open soruce
    //With embedly as a backup to keep costs low
    //our embedly key

    //To get the correct things to fire the in viewport, wait a second and then scroll to the top
    $timeout(function() {
      if (window.scrollY == 0 && window.scrollX == 0) {
        window.scrollTo(0, 1);
      }
    }, 2000);

    //get our dumps
    $scope.getDumps = function() {
      //Our json we will submit to the backend
      var dumpJson = {
        "token": sessionToken,
      };

      Dumps.get(dumpJson,
        function(data, status) {
          $scope.dumps = data;
        },
        function(err) {
          if (err.status == 401) {
            //Session is invalid! Redirect.
            $location.path("/");
          } else {
            //Something else happened
            Materialize.toast(err.data.msg, 3000);
          }
        }
      );
    }

    //Show the find input
    $scope.showFind = function() {
      if ($scope.findInput) {
        $scope.findInput = false;
        $scope.enteredFind = "";
      } else {
        $scope.findInput = true;

        //To get the correct things to fire the in viewport, wait a second and then scroll to the top
        $timeout(function() {
          if (window.scrollY == 0 && window.scrollX == 0) {
            //focus on the field
            document.getElementById('findInput').focus();
          }
        }, 300);
      }
    }

    //Check if a link already exists
    function linkExists() {
      for (var i = 0; i < $scope.dumps.length; i++) {
        if ($scope.dumps[i].content == $scope.enteredLink) {
          Materialize.toast("Link already exists!", 3000);

          //Set the input back to empty
          $scope.enteredLink = "";

          return true;
        }
      }

      return false;
    }

    //Submit a dumped link
    $scope.submitLink = function() {
      //First need to see if it is a valid url
      if ($scope.linkForm.linkInput.$valid) {
        //Need to set a slight timeout for ng paste
        $timeout(function() {
          //Also check if the link already exists
          if (!linkExists()) {
            //Our json we will submit to the backend
            var enterJson = {
              "token": sessionToken,
              "content": $scope.enteredLink
            };

            //Save the link
            Dumps.save(enterJson,
              function(data, status) {
                //Set enetered link back to null
                $scope.enteredLink = "";

                //Inform user of the dump
                Materialize.toast("Dropped!", 3000);

                //Add new dump to dump array
                $scope.dumps.unshift(data);
              },
              function(err) {
                Materialize.toast(err.data.msg, 3000);
              });
          }
        }, 1);
      }
      //it is not a valid url
      else {
        //Toast here the error
      }
    }

    //Remove a dumped link
    $scope.removeLink = function(dump) {
      //Our json we will submit to the backend
      var remJson = {
        "token": sessionToken,
        "id": dump._id
      };

      //Splice off dump we dont want
      var index = $scope.dumps.indexOf(dump);
      $scope.dumps.splice(index, 1);

      //Save the link
      Dump.delete(remJson, function(data, status) {
        //Inform user
        Materialize.toast("Deleted " + data.content + "!", 3000);

      }, function(err) {
        Materialize.toast(err.data.msg, 3000);
      });;
    }

    //Submit a dumped link
    $scope.submitLabel = function(dump) {
      var payload = {
        "token": sessionToken,
        "link": dump.content,
        "title": dump.newLabel
      }
      Labels.save(payload, function(data) {
        var index = $scope.dumps.indexOf(dump);
        $scope.dumps[index].labels.push(data);
        dump.newLabel = "";
      }, function(err) {
        Materialize.toast(err.data.msg, 3000);
      });
    }

    $scope.filterLabel = function(label){
        $scope.enteredFind = label.title;
        $scope.findInput = true;
    }

    $scope.removeLabel = function(dump, label) {
      var payload = {
        "token": sessionToken,
        "dumpId": dump._id,
        "id": label._id
      }
      Label.delete(payload, function(data) {
        var i1 = $scope.dumps.indexOf(dump);
        var i2 = $scope.dumps[i1].labels.indexOf(label);
        $scope.dumps[i1].labels.splice(i2, 1);
      }, function(err) {
        Materialize.toast(err.data.msg, 3000);
      });
    }
  });
