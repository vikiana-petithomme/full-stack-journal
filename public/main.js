let addEntry = document.querySelector('#addEntry')

addEntry.addEventListener('click', createEntry)

function createEntry(){
    let journalEntry = document.querySelector('.journalEntry')

    journalEntry.classList.toggle('hide')
    addEntry.classList.add('hide')
}


Array.from(document.getElementsByClassName('material-symbols-outlined')).addEventListener('click', deleteEntry)

function deleteEntry(){

    let deleteEntry =  document.getElementsByClassName('material-symbols-outlined').innerText

        fetch('trash', {
            method: 'delete',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            'task': deleteEntry,
            })
        }).then(function (response) {
            window.location.reload()
        })
    
}

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

