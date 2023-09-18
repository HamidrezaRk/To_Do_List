
// Start To Date

let Time=document.getElementById("Date");
let datenow=new Date();
let Jalali=gregorian_to_jalali
(
    datenow.getFullYear(),
    datenow.getMonth(),
    datenow.getDate()
)
Time.innerHTML=Jalali[0]+' &#8725; '+Jalali[1]+' &#8725; '+Jalali[2];

// End To Date

const TextInput=document.getElementById('Input-Task');
const ListTask=document.getElementById('List_Task');

function Add_Task()
{
    if(TextInput.value ==="")
    {
        alert('لطفا کار روزانه خود را وارد کنید');
    }
    else
    {
        let Ctr_li=document.createElement('li');
        Ctr_li.innerHTML=TextInput.value;
        ListTask.appendChild(Ctr_li);
        let Ctr_span=document.createElement('span');
        Ctr_span.innerHTML="\u00d7";
        Ctr_li.appendChild(Ctr_span);
    }
    TextInput.value='';
    Save_Task();
}

ListTask.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        Save_Task();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        Save_Task();
    }
}, false);

// Function Save to Task
function Save_Task() {
    localStorage.setItem("data",ListTask.innerHTML);
}
// Function Save to Task

function show_list()
{
    ListTask.innerHTML=localStorage.getItem("data");
}
show_list()