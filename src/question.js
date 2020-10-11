 export class Question {
    static creacte(question){
        return fetch('https://my-app-questionnaire.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
        .then( response => {
            question.id = response.name
            return question
        } ).then(addToLocalStarage)
        .then(Question.renderList)
    }

    static renderList(){
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ? questions.map(toCard).join('')
            :`<div class="mui--text-headline">MUI Acquires New Features</div>`
        const list = document.querySelector('.list')
        const q = document.querySelector('.questions')
        list.innerHTML = html
    }

    static fetch(token){
        return fetch(`https://my-app-questionnaire.firebaseio.com/question.json?auth=${token}`).then(response => response.json())
        .then(questions => {
            return questions ? Object.keys(questions).map(key => ({
                ...questions[key],
                id: key
            }))
            : []
        })
    }

    static listToHtml(questions){
        return questions && questions.length
            ? `<ul class="question__list">${questions.map( q => `<li class="question__list__item">${q.text}
                <button type="button" class="question__button">&times;</button></li>`).join('')}</ul>`
            : `<p>Впросов пока нет</p>`
    }
}

function addToLocalStarage(question){
    let all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
    console.log(all);
}

function getQuestionsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question){
    return `
        <div class="mb-15 list__item" >
            <div class="mui--text-black-54">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div>${question.text}</div>
        </div>
    
    `

}