let addEntry = document.querySelector('#addEntry')

addEntry.addEventListener('click', createEntry)

function getPrompt(){
    const prompt = document.getElementById('prompt')

    fetch('newPrompt', {
        method: 'put', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prompt': prompt, 
             _id
          })
    }).then(function (response) {
      window.location.reload()
    })
}

function createEntry(){
    let journalEntry = document.querySelector('.journalEntry')

    journalEntry.classList.toggle('hide')
    addEntry.classList.add('hide')
}


function removePrompt(){
    const prompt = document.getElementById('prompt')
    

}


let newPrompt = document.getElementById('newPrompt')

newPrompt.addEventListener('click', getPrompt)

let freeWrite = document.getElementById('freeWrite')

freeWrite.addEventListener('click', removePrompt)
let trash = Array.from(document.querySelectorAll('#trash'))



trash.forEach(trashcan => {
    trashcan.addEventListener('click', deleteEntry)

    function deleteEntry(){

        let deleteEntry = trashcan.parentElement.parentElement.innerText

        const _id = trashcan.parentElement.getAttribute('id')

        console.log(deleteEntry)
    
            fetch('', {
                method: 'delete',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  'task': deleteEntry, 
                   _id
                })
              }).then(function (response) {
                window.location.reload()
              })
        
    }    

})



function getDate() {
    var month_name = new Array("January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December");
    var date = new Date();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();
    var input = document.getElementById("date");
    input.value = month_name[curr_month] + "," + curr_year;
}

