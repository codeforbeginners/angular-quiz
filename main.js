var app=angular.module("QuizApp",[]);

app.controller("QuizController",["$http",function($http){
	var vm=this;

	vm.is_started=false;
	vm.is_score=false;

	vm.QuestionsArray=[];
	vm.getIndex=0;
	vm.score=0;


	vm.startQuiz=function(){
		console.log("Hello");
		vm.is_started=true;
		$http({
			method: 'GET',
			url: 'files/data.json',
			dataType:'json',
			header:{
				contentType: "application/json"
			}
		}).then(function (response){
			console.log(response.data);
			vm.quizData=response.data;
			vm.getQuestions();
		},function (error){
			console.log(error);
			console.log("Ajax Failed");
		});
	};

	vm.getQuestions=function(){
		angular.forEach(vm.quizData,function(value,key){
			vm.QuestionsArray.push(value);
		});
		console.log(vm.QuestionsArray);
		vm.question=vm.QuestionsArray[vm.getIndex].question;
		vm.answer=vm.QuestionsArray[vm.getIndex].answer;
		console.log(vm.QuestionsArray[vm.getIndex].answer);
	};



	vm.submitAnswer=function(Index){
		console.log(Index+"\t"+(vm.QuestionsArray.length-1));
		if(Index <= (vm.QuestionsArray.length-1)){

			vm.correct=vm.QuestionsArray[Index].correct;
			console.log(vm.selected +""+ vm.correct);
			if(vm.selected === vm.correct){
				vm.getIndex++;
				vm.score++;
				vm.question=vm.QuestionsArray[vm.getIndex].question;
				vm.answer=vm.QuestionsArray[vm.getIndex].answer;
				console.log(vm.question+"\t:"+vm.answer);
				vm.selected="";
			}else{
				vm.showScore();
			}
		}else{
			vm.showScore();
		}

	};

	vm.showScore=function(){
		vm.is_score=true;
		vm.percentage=(vm.score/vm.QuestionsArray.length)*100;
		if(vm.percentage !== 0 && vm.percentage !== 100){
			vm.percentage= vm.percentage.toFixed(2);
		}	
		if(vm.percentage < 70){
			vm.message="FAIL";
		}else{
			vm.message="PASS";
		}
	};

	return vm;
	
}]);