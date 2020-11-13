const filterByType = (type, ...values) => values.filter(value => typeof value === type),// функция отфильтровывания данных по типу, 
	//принимает тип данных и массив с данными и возвращает отфильтрованные данные

	hideAllResponseBlocks = () => {  // функция поля очистки блока вывода результатов
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));// получение всех div в массив
		responseBlocksArray.forEach(block => block.style.display = 'none');// перебор имассива и добавление style='none'
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {  // функция вывода результатов
		hideAllResponseBlocks();																				// вызов функции очистки поля результатов
		document.querySelector(blockSelector).style.display = 'block'; // добавляет определённому блоку стиль block для его видимости
		if (spanSelector) {													// если spanSelector true 
			document.querySelector(spanSelector).textContent = msgText; // то выводится сообщение с отфильтрованными данными, 
			//либо сообщение об их отсутствии
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),//функция ошибки, принимает текст сообщения и 
	//вызывает функцию блока вывода сообщения , куда передает class элемента, текст сообщения и id

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//функция успешной фильтрации, принимает текст сообщения 
	// и вызывает функцию блока вывода сообщения , куда передает class элемента, текст сообщения и id

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // функция отутствия результатов,
	// вызывает функцию блока вывода сообщения , куда передает class элемента

	tryFilterByType = (type, values) => {  // функция фильтрации по типу
		try {                                 // тело функции с перехватом ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");// выполнение строки кода, вызывает функцию фильтра по типу
			// и записывает данные в массив через ,
			const alertMsg = (valuesArray.length) ?  		// перебор отфильтрованного массива тернарным оператором 
				`Данные с типом ${type}: ${valuesArray}` :  // запиь в переменную alertMsg строки вывода
				`Отсутствуют данные типа ${type}`;			// запиь в переменную alertMsg, если данных нет
			showResults(alertMsg);								// вызов функции вывода результата
		} catch (e) {							// выполнение кода усли в теле try есть ошибки
			showError(`Ошибка: ${e}`);  // вызов функции ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получение кнопки 'фильтровать' по селектору с id=filter-btn

filterButton.addEventListener('click', e => {  // слушатель события 'click' на кнопке filterButton
	const typeInput = document.querySelector('#type');  // получение переменных typeInput и dataInput по
	const dataInput = document.querySelector('#data'); // селектору с id=type и id=data

	if (dataInput.value === '') {  // проверка на пустой ввод
		dataInput.setCustomValidity('Поле не должно быть пустым!');// метод сообщения об ошибке
		showNoResults(); // вызов функции showNoResults
	} else {                         // если поле не пустое
		dataInput.setCustomValidity('');// метод сообщения об ошибке без ошибки
		e.preventDefault();   // отмена перезагрузки страницы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызов функции фильтрации по типу данных с передачей данных с обрезанными пробелами в начале и конце

	}
});

