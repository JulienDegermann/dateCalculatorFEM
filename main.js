// querySelector
const day = document.querySelector('#day')
const month = document.querySelector('#month')
const year = document.querySelector('#year')
const dayOut = document.querySelector('#day-output')
const monthOut = document.querySelector('#month-output')
const yearOut = document.querySelector('#year-output')
const form = document.querySelector('form')
const submit = document.querySelector('#submit')
const input = document.querySelectorAll('input')


// New elements
const invalidDate = document.createElement('p')
let fullDate // date created with input value

// functions
const inputError = (element) => { // add style if error in inputs
  element.style.outline = "hsl(0, 100%, 67%) 1px solid"
  element.style.color = "hsl(0, 100%, 67%)"
  element.parentNode.style.color = "hsl(0, 100%, 67%)"
  element.style.transition = "all ease .5 s"
  element.parentNode.style.transition = "all ease .5s"
  submit.disabled = true 
  submit.style.background = 'hsl(0, 100%, 67%)'  
}
const inputErrorReverse = (element) => { // remove style error rectified in inputs
  element.style.outline = ""
  element.style.color = ""
  element.parentNode.style.color = ""
  element.style.transition = "all ease .5s"
  element.parentNode.style.transition = "all ease .5s"
  submit.disabled = false
}


input.forEach((element) => { // check if input.values are correct (eventListener 'input')
  // add 
  let error = ''
  let errorMessage = document.createElement('p')
  errorMessage.classList.add('errorMessage')
  element.parentNode.append(errorMessage)


  element.addEventListener('input', () => { // live correction listening

    if (element.value === '') { // empty input
      error = ''
      errorMessage.innerText = ''
    } else if (!Number.isInteger(parseInt(element.value))) { // check if is a number // add function for add error if contains letter
      error = `ce n'est pas un nombre`
    } else if (element.getAttribute('id') === 'day') { // check values for day
      if (parseInt(day.value) > 0 && (day.value) < 32) {
        return
      } else {
        error = "jour incorrect"
      }
    } else if (element.getAttribute('id') === 'month') { // check values for month
      if (parseInt(month.value) > 0 && (month.value) < 12) {
        return
      } else {
        error = 'mois incorrect ' 
      }
    } else if (element.getAttribute('id') === 'year') { // check values for year
      if (parseInt(year.value) > 0) {
        return 
      } else {
        return
      }
    } else {
        error = ''
        errorMessage.innerText = ''
    }
    if (error !== '') { // add option to check other error
      console.error(error)
      errorMessage.innerText = error
      console.log(errorMessage.innerText)
      inputError(element)
      element.parentNode.style.opacity = "1"
      // submit.style.background = 'hsl(0, 100%, 67%)'  

      element.parentNode.style.transition = "all ease .5 s"
      // submit.style.transition = "all ease .5s"
    } else { 
      // errorMessage.style.opacity = "0"
      inputErrorReverse(element)
      // errorMessage.style.transition = "all ease .5s"
    }

    // get all error message and convert the object (html collection, seems array but is nt)
    let all = document.getElementsByClassName('errorMessage')
    all = [...all]

    if (all.every(element => element.innerText==='')) {
      submit.style.background = ""
      submit.diabled = false

      submit.style.background = ""
      submit.style.transition = "all ease .5s"
      return
    }
  })
})

const fullDateCheck = () => { // 
  fullDate = new Date(year.value, month.value - 1, day.value)
  if (parseInt(day.value) === fullDate.getDate() &&
    parseInt(month.value) === fullDate.getMonth() + 1 &&
    parseInt(year.value) === fullDate.getFullYear()) {
    return true
  } else {
    return false
  }
}

function calculate(event) {
  event.preventDefault()
  let error = ""
  invalidDate.innerText = ""
  input.forEach((element) => {
    inputErrorReverse(element)
  })
  //check date input is valid
  if (fullDateCheck()) {
    const today = new Date()
    let theDate = new Date()
    if (today.getFullYear() === fullDate.getFullYear() && today.getMonth() === fullDate.getMonth() && today.getDate() === fullDate.getDate()) {
      dayOut.innerText = monthOut.innerText = yearOut.innerText = '0'
      return
    }
    if (today.getTime() > fullDate.getTime()) { // today apres
      theDate.setFullYear(today.getFullYear() - fullDate.getFullYear(), today.getMonth() - fullDate.getMonth(), today.getDate() - fullDate.getDate())
    } else {
      theDate.setFullYear(fullDate.getFullYear() - today.getFullYear(), fullDate.getMonth() - today.getMonth(), fullDate.getDate() - today.getDate())
    }
    dayOut.innerText = theDate.getDate()
    monthOut.innerText = theDate.getMonth()
    yearOut.innerText = theDate.getFullYear()
  } else {
    error = `la date n'est pas valide`
    input.forEach(element => inputError(element))
    invalidDate.innerText = error
    invalidDate.classList.add('errorMessage', "dateError")
    invalidDate.style.opacity = "1"
    invalidDate.style.transition = "all .5s ease"
    submit.parentNode.append(invalidDate)
    input.forEach((element) => {
      inputError(element)
    })


  }
}

form.addEventListener('submit', calculate)




