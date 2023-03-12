// All answer options 

const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');


// All our options

const optionElements = document.querySelectorAll('.option');	// все option'ы в переменной, чтобы было удобно проходиться по ним в массиве

const question = document.getElementById('question');						// вопрос
const numberOfQuestion = document.getElementById('number_of_question');			// число вопроса
const numberOfAllQuestion = document.getElementById('number_of_all_question');		// число всех вопросов 

let indexOfQuestion;		// индекс нашего текущего вопроса
let indexOfPage = 0;	// индекс текущей страницы

const answersTracker = document.getElementById('answers_tracker'); 		// наши кругляшки с показанием правильных ответов
const btnNext = document.getElementById('btn_next');		// наша кнопка для следующего вопроса

let score = 0;		// итоговый результат теста

const correctAnswer = document.getElementById('correct_answer');
const numberOfAllQuestion2 = document.getElementById('number_of_all_question2');
const btnTryAgain = document.getElementById('btn_try_again');

const questions = [			// список наших вопросов
	{
		question: 'Язык JavaScript является подвидом языка Java — верно?',
		options: [
			'Да',
			'Нет',
			'Наоборот, Java – подвид JavaScript',
			'Я не знаю',
		],
		rightAnswer: 1
	},
	{
		question: 'За сколько дней был разработан LiveScript — первая версия языка JavaScript?',
		options: [
			'1',
			'10',
			'100',
			'1000',
		],
			rightAnswer: 1
	},
	{
		question: 'Какая арифметическая операция приводит к ошибке в javascript?',
		options: [
			'Деление на ноль',
			'Умножение числа на строку',
			'Корень из отрицательного числа',
			'Никакая из вышеперечисленных',
		],
			rightAnswer: 3
	},	
	{
		question: 'Как определить в каком браузере запущен сайт у пользователя?',
		options: [
			'Это невозможно средствами JavaScript',
			'Используя объект navigator',
			'Используя объект window',
			'Используя объект document',
		],
		rightAnswer: 1
	},
	{
		question: 'Где верно указан вывод данных?',
		options: [
			'documentWrite("Hello");',
			'prompt("Hello")',
			'console.log("Hello");',
			'write("Hello");',
		],
		rightAnswer: 2
	},
	{
		question: 'Какие циклы есть в языке JavaScript?',
		options: [
			'for, forMap, forEach, while',
			'for, forMap, forEach, while, do while',
			'for, while, do while, forEach',
			'for, while, do while',
		],
		rightAnswer: 3
	}, 
	{
		question: 'Какие значения можно хранить в переменных?',
		options: [
			'Только числа и строки',
			'Строки, числа с точкой и простые числа',
			'Строки, числа с точкой, булевые выражения',
			'Строки, числа с точкой, простые числа и булевые выражения',
		],
		rightAnswer: 3
	},
	{
		question: 'В чем отличие между локальной и глобальной переменной?',
		options: [
			'Глобальные можно переопределять, локальные нельзя',
			'Локальные можно переопределять, глобальные нельзя',
			'Глобальные видны повсюду, локальные только в функциях',
			'Отличий нет',
		],
		rightAnswer: 2
	},	
]

numberOfAllQuestion.innerHTML = questions.length;		// выводим количество всех вопросов

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;		// сам наш вопрос

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;		// установка номера текущей страницы
	indexOfPage++;		// увеличение индекса страницы
}; 

let completedAnswers = [];		// в этот массив будут помещаться вопросы которые уже были

const randomQuestion = () => {		// фунция которая при каждом обновлении страницы меняет местами наши вопросы
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if(indexOfPage == questions.length) {		
		testOver();		// если вопрос последний запускаем функцию которая показывает модальное окно чтобы начать тест заново
	} else {
		if(completedAnswers.length > 0) {		// если наш вопрос прошел он входит в массив с индексом 
			completedAnswers.forEach(item => {
				if(item == randomNumber) {
					hitDuplicate = true;
				}
			});
			if(hitDuplicate) {		
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		};
		if(completedAnswers == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	};
	completedAnswers.push(indexOfQuestion);
};

const checkAnswer = elem => {			// функция которая проверяет правильный или неправильный ответ
	if(elem.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
		elem.target.classList.add('correct');		// добавляем класс с зеленым цветом(т.е. ответ правильный)
		updateAnswerTracker('correct');
		score++;		// добавляем в наш счетчик количество правильных ответов
	} else {
		elem.target.classList.add('wrong');			// добавляем класс с красным цветом(т.е. ответ неправильный)
		updateAnswerTracker('wrong');
	}
	disabledOptions();		
};

const disabledOptions = () => {			// функция которая задизэйблид остальные кнопки после нажатия любого ответа
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {  
			item.classList.add('correct');		// если наш атрибут data равен правильному ответу добавляем зеленый цвет
		}
	})
};

const enableOptions = () => {			// функция которая удалит наши классы при переходе на следующий вопрос
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	})
};

const answerTracker = () => {		// при помощи forEach добавляем div'ки на каждый наш кругляшок 
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	})
};	

const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`); // добавляем на наш кругляшок либо зеленый либо красный цвет
};

const validate = () => {		// функция которая не будет пускать нас дальше пока мы не выбрали вариант ответа 
	if(!optionElements[0].classList.contains('disabled')) {		// если хоть один ответ будем задизэйблен мы будем понимать, что выбрать один из вариантов ответа
		alert('Выберите один из вариантов ответа!');
	} else {
		randomQuestion();
		enableOptions();
	}
};

btnNext.addEventListener('click', validate);	// событие на кнопке NEXT (если не будет выбран вариант ответа всплывает модальное окно) 

for(option of optionElements) {
	option.addEventListener('click', event => {
		checkAnswer(event);
	})
};

const testOver = () => {		// функция которая показывает нам модальное окно с результатами
	document.querySelector('.test_over_modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {		// функция которая запускает наш тест заново после нажатия кнопки 'Попробуй снова'
	window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain)

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
});