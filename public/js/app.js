const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationSpan = document.querySelector('#location')
const messageSpan = document.querySelector('#message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchLocation = search.value

    locationSpan.textContent = ''
    messageSpan.textContent = ''

    messageSpan.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + searchLocation)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                messageSpan.textContent = 'Error: ' + data.error
            } else {
                locationSpan.textContent = data.location
                messageSpan.textContent = data.message
            }
        })
})