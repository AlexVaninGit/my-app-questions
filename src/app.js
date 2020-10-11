import './style.css'
import { createModal, isValid } from './utils'
import { Question } from './question'
import { authWithEmailAndPassword, getAuthForm } from './auth'

const form = document.querySelector('.mui-form')
const modalBtn = document.querySelector('.floating-btn')
const input = form.querySelector('#question-input')
const buttonSubmit = form.querySelector('#question-button')

buttonSubmit.disabled = false

window.addEventListener('load', Question.renderList)

const list = document.querySelector('.mb-15')
console.log(list);

modalBtn.addEventListener('click', () => {
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const email = e.target.querySelector('#email').value
        const password = e.target.querySelector('#password').value
        authWithEmailAndPassword(email, password).then(Question.fetch)
        .then(renderModalContent)
        .then(response => console.log(response))
    }, {once: true})
})

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    !input.value ? buttonSubmit.disabled = true : 
    buttonSubmit.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        buttonSubmit.disabled = true
        // Async request to server
        Question.creacte(question).then( () => {
            input.value = ''
            buttonSubmit.disabled = false 
        } )


    }
} 


function renderModalContent(content){
    createModal('Список вопросов', Question.listToHtml(content))
}