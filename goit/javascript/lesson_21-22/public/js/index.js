let data, GoApp;

function showModal(title, body) {
    var theDiv = document.createElement('div');
    theDiv.id = 'modal';
    theDiv.innerHTML = tmpl('modalDialog', {
        title: title,
        body: body
    });
    document.body.appendChild(theDiv);
    document.querySelector('.m-dialog__close').addEventListener('click', (e) => {
        closeModal(e.target);
    });
    document.querySelector('.m-dialog__OK').addEventListener('click', (e) => {
        closeModal(e.target);
    });
}

function closeModal(target) {
    target.removeEventListener();
    document.body.removeChild(document.getElementById('modal'));
    localStorage.clear();
}


document.addEventListener('DOMContentLoaded', () => {
    data = {
        questions: [
            {
                id: 1,
                question: 'Вопрос №1',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: 0
            },
            {
                id: 2,
                question: 'Вопрос №2',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: [0, 2]
            },
            {
                id: 3,
                question: 'Вопрос №3',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: 2
            }
        ]
    };
    GoApp = new GoItTest(localStorage);
    GoApp.init(data);
    GoApp.innerHTML('idFormBody', (id, data) => {
        document.getElementById(id).innerHTML = tmpl('tQuestion', data);
    });

    document.querySelector('#checkMyResults').addEventListener('click', (event) => {
        event.preventDefault();
        let formsElements = document.forms[0].elements,
            elements = [];
        for (let i = 0; i < formsElements.length; i++) {
            if (formsElements[i].type === 'radio' || formsElements[i].type === 'checkbox') {
                elements.push({
                    name: formsElements[i].name,
                    checked: formsElements[i].checked,
                    value: formsElements[i].value
                });
            }
        }
        showModal('Result', GoApp.checkResults(elements) ? 'Вы сдали!' : 'Вы не сдали!');
    });
});
