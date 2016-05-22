'use strict';

angular.module('demo', ['angular-slate']);

angular.module('demo').controller('indexCtrl', function($scope) {
    $scope.config = {
        color_aplite: 0,
        color_basalt: 0,
    };

    $scope.$watch('config.color_aplite', function() {
        console.log('color_aplite updated', $scope.config.color_aplite);
    });

    $scope.$watch('config.color_basalt', function() {
        console.log('color_basalt updated', $scope.config.color_basalt);
    });

    $scope.dynamic_list = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
    ];

    $scope.$watch('dynamic_list', function() {
        console.log('dynamic_list updated', $scope.dynamic_list);
    }, true);

    $scope.draggable_list = [
        {label: 'Draggable 1', value: 0},
        {label: 'Draggable 2', value: 1},
        {label: 'Draggable 3', value: 2},
        {label: 'Draggable 4', value: 3},
    ];

    $scope.$watch('draggable_list', function() {
        console.log('draggable_list updated', $scope.draggable_list);
    }, true);
});
