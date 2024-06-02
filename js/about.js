var siteName = document.getElementById('wName')
var webUrl = document.getElementById('wUrl')
var datalist = []

var btn = document.querySelector('#btnn')

btn.addEventListener('click',function addItem() {
    var items = {
        siteName:siteName.value,
        webUrl:webUrl.value 
    }
    console.log(items)
    datalist.push(items)
    localStorage.setItem('items',JSON.stringify(datalist))
    display()
    resetform() 
    console.log(datalist)
})


if(localStorage.getItem('items') !==null ) {
    datalist = JSON.parse(localStorage.getItem('items'))
    display()
}else {
    datalist =[]
}

function display() {
    var cartona = `` ;
    for (i=1 ; i<datalist.length ; i++) {
        cartona += `
        <tr>
            <td><div>${i}</div></td>
            <td><div>${datalist[i].siteName}</div></td>
            <td><button onclick="visit(${i})" class="eye btn"><i class=" fa-solid fa-eye px-2"></i>visit</button></td>
            <td><button onclick="deleteit(${i})"   class="trash btn btn-danger "><i class="fa-solid fa-trash px-2"></i>Delete</button></td>
        </tr>`
        
    }
    document.getElementById("rowBody").innerHTML=cartona;
}



function deleteit(index) {
    datalist.splice(index,1)
    localStorage.setItem('items',JSON.stringify(datalist))
    display()
} 


function visit(index){
    console.log(index)
    open(`${datalist[index].webUrl}`)
}

function resetform() {
    siteName.value = null ; 
    webUrl.value = null ;
}

var selected = document.querySelectorAll('.selectedInput')
for (var i=0 ; i<selected.length ; i++ ) {
    selected[i].addEventListener('input',function(e){
        var elm =e.target;
        validation(elm.id,elm.value)
        console.log(e.target)
    })
}
function  validation(elemId,elemValue) {
    var regex = {
        wName:/^[A-Z][a-z]{3,10}$/,
        wUrl:/^(ftp|http|https):\/\/[^ "]+$/,
    }
    var elm = document.getElementById(elemId);
    if(regex[elemId].test(elemValue)) {
        elm.classList.add('is-valid')
        elm.classList.remove('is-invalid')
        return true ;
    }else {
        elm.classList.add('is-invalid')
        elm.classList.remove('is-valid')
        return false ;
    }

}



