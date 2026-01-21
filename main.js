// API_ADD = "https://696e3d79d7bacd2dd7163474.mockapi.io/hw4"
//
//

// let form = document.querySelector("#form")
// let lists = document.querySelector(".lists")

// let todo = JSON.parse(localStorage.getItem("todo")) || [ ]

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let newTodo = {
//         id: todo[todo.length - 1]?.id + 1 || 1,
//         text: form.text.value,
//         time: new Date().toLocaleString(),
//     }

//     todo = [...todo, newTodo]
//     localStorage.setItem("todo", JSON.stringify(todo))
//     form.text.value = "";

//     addItem(todo)

// })

// function addItem (todo){
//     lists.innerHTML = "";
//     todo.forEach(value => {
//         let list = document.createElement("div")
//         list.innerHTML = `
//         <div class= "list alert alert-primary d-flex justify-content-between align-items-start">
//         <div>
//             <div>${value.text}</div>
//             <small class="text-muted">${value.time}</small>
//         </div>
//         <button id = ${value.id} class = "btn btn-danger btn-sm">Remove</button></div>`
//         lists.prepend(list)
//     });
//     lists.addEventListener("click", (v) => {
//         if(v.target.id){
//             removeItem(v.target.id)
//         }
//     })

// }

// function removeItem(id) {
//     todo = todo.filter((value) => value.id !== Number(id) );
//     localStorage.setItem("todo", JSON.stringify(todo));
//     addItem(todo);
// }

// addItem(todo)










const API_ADD = "https://696e3d79d7bacd2dd7163474.mockapi.io/hw4";
let form = document.getElementById("form");
let lists = document.querySelector(".lists");
function fetchItems() {
  fetch(API_ADD)
    .then((res) => res.json())
    .then((data) => getData(data))
    .catch((err) => console.log("error"));
}

fetchItems();

function POST(e) {
  e.preventDefault();
  let text = document.getElementById("text").value
  let newItem=null
  if(text.trim()){
    newItem = {
    title: text,
    time: new Date().toLocaleString(),
  };
}else{
        alert("nimadur kirit")
        return;
}
  
  fetch(API_ADD, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },

    body: JSON.stringify(newItem),
  })
    .then((res) => console.log(res))
    .then(() => {
      fetchItems();
      form.reset();
    })
    .catch((err) => console.log("error"));
}

form.addEventListener("submit", POST);

function getData(data) {
  lists.innerHTML = "";
  data.forEach((value) => {
    let list = document.createElement("div");
    list.innerHTML = `
        <div class= "list alert alert-primary d-flex justify-content-between align-items-start">
            <div>
            <div>${value.title}</div>
            <small class"text-muted>${value.time}</small>
            </div>

            <button onclick="removeItem('${value.id}')" class = "btn btn-danger btn-sm">Remove</button>
            
        </div>`;

    lists.prepend(list);
  });
}

function removeItem(id) {
  fetch(`${API_ADD}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) fetchItems();
    })
    .catch((err) => console.log("error"));
}
