// Client side javascript

// This script is running in client side javascript, hence, it won't run in the terminal, can only run in browser

// Make http request from client side javascript

const weatherForm = document.querySelector('#form1')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

// Add an event listener to element

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
            }
    })
})
})