/* global document */

 const $ = require('jquery');

(function () {
	$('.dropdown').each(function () {
		//переменная для поля вывода
		var outputFieldValue = {};
		// заполняем поле вывода
		$(this).find('.dropdown__content-text').each(function (i) {
			outputFieldValue[$(this).text()] = $(this).next().find('.dropdown__content-select-value').text();
		});

		// обработчик клика на поле
		$(this).find('.dropdown__output-field').click(function () {
			$(this).find('.dropdown__button-down').toggleClass('dropdown__button-down_undroped')
				.toggleClass('dropdown__button-down_droped');
			$(this).next('.dropdown__content-field').toggleClass('dropdown__content-field_visible');
			$(this).toggleClass('dropdown__output-field_droped');
		});

		// обработчик клика по кнопке ОЧИСТИТЬ
		if ($(this).hasClass('dropdown_guest')) {
			$(this).find('.dropdown__button-clear').click(function () {

				// сбрасываем элементы на 0
				$(this).closest('.dropdown').find('.dropdown__content-select-value').each(function () {
					$(this).html(0);
					eventValue($(this));
				});

				// обновляем поле вывода

				// сворачиваем дроп
			});
		};

		// ховер с блока
		$(this).hover(
			function () {
				$(this).find('.dropdown__output-field').addClass('dropdown__output-field_form-hover')
			},
			function () {
				$(this).find('.dropdown__content-field').removeClass('dropdown__content-field_visible');
				$(this).find('.dropdown__button-down').addClass('dropdown__button-down_undroped')
					.removeClass('dropdown__button-down_droped');
				$(this).find('.dropdown__output-field').removeClass('dropdown__output-field_form-hover');
			}
		);

		// обработчик клика по +-
		$(this).find('.dropdown__content-inner').each(function () {
			$(this).find('.content-select-button:first').click(function (e) {
				e.preventDefault();
				let value = $(this).closest('.dropdown__content-select').find('.dropdown__content-select-value').html();
				value = +value - 1;
				if (value < 0) {
					value = 0
				};
				$(this).closest('.dropdown__content-select').find('.dropdown__content-select-value').html(value);
				eventValue($(this).closest('.dropdown__content-select').find('.dropdown__content-select-value'));
			});
			$(this).find('.content-select-button:last').click(function () {
				let value = $(this).closest('.dropdown__content-select').find('.dropdown__content-select-value').html();
				$(this).closest('.dropdown__content-select').find('.dropdown__content-select-value').html(+value + 1);
				eventValue($(this).closest('.dropdown__content-select').find('.dropdown__content-select-value'));
			});
		});

		// вызывается при изменении поля .dropdown__content-select-value
		// принимает
		// elem - объект dropdown__content-select-value
		function eventValue(elem) {
			let value = elem.text();
			if (value < 0) {
				alert('выздвали Error');
				return Error
			};
			// проверяем значение и меняем стиль кнопок
			if (value == 0) {
				elem.prev('.content-select-button').addClass('content-select-button_disabled');
			} else if (value > 0) {
				elem.prev('.content-select-button:first').removeClass('content-select-button_disabled');
			};
			// меняем поле вывода

			outputFieldValue[elem.closest('.dropdown__content-select').prev('.dropdown__content-text').text()] = value;
			outputField(elem.closest('.dropdown'));
		}

		function outputField(elem) {
			let output;
			if (elem.hasClass('dropdown_standart') === true) {
				output = '';
				for (var item in outputFieldValue) {
					if (+outputFieldValue[item] > 0) {
						output = output + item + " " + outputFieldValue[item] + ", "
					}

				};
			};
			if (elem.hasClass('dropdown_guest') === true) {
				output = 0;
				for (var item in outputFieldValue) {
					// if(+outputFieldValue[item]>0){output=output+item+" "+outputFieldValue[item]+", "}
					output = output + Number(outputFieldValue[item]);
				};
				// функция определения окончания
				let text = function (number, titles) {
					cases = [2, 0, 1, 1, 1, 2];
					return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
				}
				if (output > 0) {
					output = output + ' ' + text(output, ["гость", "гостя", "гостей"]);
				} else if (output === 0) {
					output = 'Сколько гостей'
				}
			};

			if (output == "") {
				output = 'Сколько помещений'
			}
			elem.find('.dropdown__output-field-text').text(output);
		}

	});


})();