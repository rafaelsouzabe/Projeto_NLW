
import  Modal  from './modal.js'

const modal = Modal()


const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')



//pegar todos os botòes que existem com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button => {
    //adcionar a escuta
    button.addEventListener("click", event => {

        const roomID = document.querySelector("#room-id").dataset.id
        const questionID = event.target.dataset.id
        const form = document.querySelector(".modal form")
        form.setAttribute("action", `/question/${roomID}/${questionID}/check`)


        modalTitle.innerHTML = "Marcar como lida"
        modalDescription.innerHTML = "Tem certeza que deseja marcar como lida esta pergunta?"
        modalButton.innerHTML = "Sim, marcar como lida"
        modalButton.classList.remove("red")
        event.preventDefault()

        //abrir a modal
        modal.open()
        
    })
})

// Quando o botao delete for clicado ele abre a modal
const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", event => {
        
        const roomID = document.querySelector("#room-id").dataset.id
        const questionID = event.target.dataset.id
        const form = document.querySelector(".modal form")
        form.setAttribute("action", `/question/${roomID}/${questionID}/delete`)


        modalTitle.innerHTML = "Excluir essa pergunta"
        modalDescription.innerHTML = "Tem certeza que deseja excluir esta pergunta?"
        modalButton.innerHTML = "Sim, excluir"
        modalButton.classList.add("red")
        event.preventDefault()


        modal.open()
    })
})
