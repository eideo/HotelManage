'use strict';

app.controller('setUpCtrl',['$scope','$http', 'dialog',function ($scope, $http, dialog) {
  var vm = this;

  vm.jsondata = {
    id:"",          //id主键值
    hbegintime:0,       //停车优惠金额
    hendtime:0,  //停车过夜费优惠金额
    housceamt:0,    //客房优惠金额
    hmendtime:0,   //停车过夜开始时间
    endtime:0,     //停车过夜结束时间
    hmhour:0
  };

  //优惠设置查询
  vm.getPreferential = function(){
    $http.get(lpt_host + '/zeus/ws/hotel/hChargeconfig/getlist',{ params:{page: 1, rows: 10}}).success(function(data) {
      if(data.code="200"){
        if(data.body.data!=null)
          vm.jsondata = data.body.data[0];
      }
    });
  }

  //新增OR修改
  vm.update = function(){
    if($scope.myForm.$valid){
      $http.post(lpt_host + '/zeus/ws/hotel/hChargeconfig/saveorupdate', vm.jsondata)
      .success(function(data){
        if(data.code == "200"){
          dialog.notify("保存成功!", 'success');
        }
        else{
          dialog.notify(data.msg, 'error');
        }
      }).error(function(data) {
        dialog.notify(data.msg, 'error');
      });
    }
    $scope.myForm.submitted = true;
  }

  vm.cancel = function(){
    $scope.closeThisDialog(null);
  }

  vm.getPreferential();
}]);