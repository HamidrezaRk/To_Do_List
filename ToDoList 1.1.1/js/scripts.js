const btn = document.getElementById("add-btn");
const input = document.querySelector(".txt-input");
const teamswich = document.getElementById("theme-switcher");
const bodytag = document.querySelector("body");
const image_Swicher = document.getElementById("image_Swicher");
const list =document.querySelector('.todos');

// Vriabel
let db;

function main () 
{
  // Start Light Dark Mode
  teamswich.addEventListener("click" ,() =>{
    bodytag.classList.toggle("light");
    const imgswicher =teamswich.children[0];

    //icon sun to moon
    const image_swich = teamswich.children[0];
    image_swich.setAttribute("src",
    image_swich.getAttribute("src") === "./assets/images/icon-sun.svg" 
    ?"./assets/images/icon-moon.svg"
    :"./assets/images/icon-sun.svg" 
    );
  });
   // End Light Dark Mode
   //Drag Drop
    list.addEventListener("dragover",(e)=>{
     console.log(e.target);
    });
   //Drag Drop
   
   //Start 

   window.onload = () =>
   {
     let Dbtodo = indexedDB.open('DetailsTodo',1);

     Dbtodo.onerror = () =>
     {
      console.log("The database error!!!"); 
     }

     Dbtodo.onsuccess = () =>
     {
      console.log("The database created"); 
      db = Dbtodo.result;
      DisplayData();
     }
   

   //Creat Schema Database
   Dbtodo.onupgradeneeded = (e) =>
   {
      let db = e.target.result;

      // Creat Primary Key
      let objectStore = db.createObjectStore("DetailsTodo",
      {
      keyPath: "Id",
      autoIncrement: true
      });

      // Creat index
      objectStore.createIndex('TitleTodo','TitleTodo',
      {
        unique: false
      });

      console.log("Database Setup Successfully...");
   }
  }
  //Send Data To Database

  const AddData = (e) =>
  {
    e.preventDefault();
    
    //Creat Object
    const ToDo =
    {
      TitleTodo:input.value
    }
    //Creat Transaction
    //Send Object(ToDo) for Transaction
    let transaction = db.transaction(["DetailsTodo"],"readwrite")
    let request=transaction.objectStore("DetailsTodo").add(ToDo);

    request.onsuccess = () =>
    {
      input.value="";
    }
    
    transaction.oncomplete = () =>
    {
      console.log("on Complietd");
      DisplayData();
      
    }

    transaction.onerror = () =>
    {
      console.log("not Complietd");
    }
  }

  //Display Data
  const DisplayData = () =>
{
    //Clear List 
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    //get database
    let objectStore = db.transaction('DetailsTodo').objectStore('DetailsTodo');
    
    //Curser for example point
    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;

        if (cursor) {
          
            //Create Html Elements Of Todo
            const card = document.createElement("li");
            const cbContainer = document.createElement("div");
            const cbInput = document.createElement("input");
            const checkSpan = document.createElement("span");
            const item = document.createElement("p");
            const clearBtn = document.createElement("button");
            const img = document.createElement("img");

            //Add Classes
            card.classList.add("card");
            cbContainer.classList.add("cb-container");
            cbInput.classList.add("cb-input");
            checkSpan.classList.add("check");
            item.classList.add("item");
            clearBtn.classList.add("clear");
            //Add Attributes
            card.setAttribute("draggable", true);
            cbInput.setAttribute("type", "checkbox");
            img.setAttribute("src", "./assets/images/icon-cross.svg");
            img.setAttribute("alt", "Clear It");

            card.addEventListener("dragstart", () =>{
              card.classList.add("dragging");
            });
            card.addEventListener("dragend", () =>{
              card.classList.remove("dragging");
            });
            //Create Html Elements Of Todo

            item.textContent = cursor.value.TitleTodo;

            clearBtn.appendChild(img);
            cbContainer.appendChild(cbInput);
            cbContainer.appendChild(checkSpan);

            card.append(cbContainer,item,clearBtn)
            list.appendChild(card);

            card.setAttribute('data-todo-id', cursor.value.Id);

            //Ctr Btn delet
            clearBtn.addEventListener("click",DeleteTodo);
            //Ctr Btn delet

            cursor.continue();
        } 
        // 

    }
}
// Delete Doto
const DeleteTodo = (e) =>
{
  // Refrish page
  location.reload();
  let Todoid =Number(e.target.parentElement.parentElement.getAttribute("data-todo-id"));
    //Delete Person in Indexed Db
    let transaction = db.transaction(["DetailsTodo"], "readwrite");
    let request = transaction.objectStore('DetailsTodo').delete(Todoid);

    request.onsuccess =() =>
    {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        
    };
}

btn.addEventListener("click",AddData);

};

document.addEventListener("DOMContentLoaded",main);