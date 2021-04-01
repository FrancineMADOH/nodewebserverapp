
//console.log('client side js loaded...')
/*fetch('http://puzzle.mead.io/puzzle').then( (response)=>{
    response.json().then(data) => {
        console.log(data);
    }
})*/

/*fetch('http://localhost:3000/weather?adress=yaounde').then( (response)=>{
    response.json().then(data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast);
        }
    }
})*/

/*fetching the forecast data
fetch('http://localhost:3000/weather?adress=yaounde')
  .then(response => response.json())
  .then(data =>{
    if(data.error){
        console.log(data.error);
    }else{
        console.log(data.location);
        console.log(data.forecast);
    }
})*/

//fetch api


//selectiong the form
const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',function(e){
    e.preventDefault() 
    const location= searchTerm.value
    messageOne.textContent = "loading..."
    messageTwo.textContent = "..."
    //alert('your location is ' + location)
    fetch('http://localhost:3000/weather?adress='+location)
  .then(response => response.json())
  .then(data =>{
    if(data.error){
        messageOne.textContent = data.error
        console.log(data.error);

    }else{
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast 
        console.log(location);
        console.log(data.forecast);
    }
})
})
