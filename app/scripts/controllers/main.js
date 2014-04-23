'use strict';
a2App.controller('MainCtrl', function($scope, Questions, Answers) {
    $scope.indexed_questions = [];
    $scope.indexed_answers = [];
    $scope.guessed_correct = 0;
    $scope.is_first_guess = true;
    $scope.total_questions = 0;

    $scope.qs = Questions.query();
    $scope.as = Answers.query();
    $scope.question_id = 0;
    $scope.selected_answer = '';
    $scope.correct_answer = false;
    $scope.correct_answer_index = -1;

    $scope.sortByName = function(d) {
        switch (d.name) {
            case 'A':
                return 0;
                break;
            case 'B':
                return 1;
                break;
            case 'C':
                return 3;
                break;
            case 'D':
                return 4;
                break;
        }
    }

    $scope.evaluateAnswer = function(){
        $scope.correct_answer = false;

        var answers = $scope.indexed_answers[$scope.question_id];
        for (var i in answers) {
            var answer = answers[i];
            if (parseInt(answer.answer) && $scope.selected_answer == answer.name) {
                $scope.correct_answer = true;
                switch(answer.name){
                    case 'A':
                        $scope.correct_answer_index = 0;
                        break;
                    case 'B':
                        $scope.correct_answer_index = 1;
                        break;
                    case 'C':
                        $scope.correct_answer_index = 2;
                        break;
                    case 'D':
                        $scope.correct_answer_index = 3;
                        break;
                }
                if ($scope.is_first_guess)
                    $scope.guessed_correct++;
            }
        }

        $scope.is_first_guess = false;
        $scope.current_percentage = parseInt(($scope.guessed_correct / $scope.total_questions) * 100)
    }

    $scope.randomQuestion = function() {
        $scope.question_id = Math.floor(Math.random() * 400) + 1;
        $scope.selected_answer = '';
        $scope.correct_answer = false;
        $scope.correct_answer_index = -1;
        $scope.is_first_guess = true;
        $scope.total_questions++;
    }

    $scope.$watch('qs', function(newValue, oldValue) {
        for (var i = 0; i < newValue.length; i++){
            var question = newValue[i];
            if (typeof question != 'undefined')
                $scope.indexed_questions[question.question_id] = question;
        }
    }, true);

    $scope.$watch('as', function(newValue, oldValue) {

        for (var i = 0; i < newValue.length; i++) {
            var answer = newValue[i];

            if (typeof answer != 'undefined') {
                if (typeof $scope.indexed_answers[answer.question_id] == 'undefined')
                    $scope.indexed_answers[answer.question_id] = [];

                $scope.indexed_answers[answer.question_id].push(answer);
            }
        }
    }, true);
});
