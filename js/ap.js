let btnadd = document.querySelector(".btnadd")
let input = document.querySelector("input")
let clearbtn = document.querySelector(".btndel")
let boxAll = document.querySelector(".boxAll")

let ary = []

let inp
let newdiv
let newspantext
let newtext
let newbtbox
let newbtcom
let newbtdel



function funadd(){
 input.focus()   
 inp = input.value
 if(inp){
     localdata(inp)
     uilisttodo(inp)
     input.value = ''
 }

}
function localdata(rt){
    let obj = {id:ary.length+1 , title:rt , vaz:false}
    ary.push(obj)
    localStorage.setItem("final",JSON.stringify(ary))

}


function uilisttodo(rt){
    let rp = JSON.parse(localStorage.getItem("final"))
    let ipp = ary.find(function(esf){
        return esf.title === rt
    })
    
    
    newdiv = document.createElement("div")
    newdiv.classList.add("box")
    newspantext = document.createElement("span")
    newspantext.classList.add("spbox")
    newtext = document.createElement("p")
    newtext.innerHTML = rt
    newbtbox = document.createElement("span")
    newbtbox.classList.add("boxbt")
    newbtcom = document.createElement("button")
    newbtcom.classList.add("combtm")
    newbtcom.innerHTML = ipp.vaz
    newbtcom.setAttribute("onclick","funbtcom(event)")
    newbtdel = document.createElement("button")
    newbtdel.classList.add("debtn")
    newbtdel.innerHTML = "Delete"
    newbtdel.setAttribute("onclick","fundelbt(event)")

    if(ipp.vaz){
        newbtcom.style.backgroundColor = "green"
        newbtcom.style.borderColor = "green"
        newdiv.style.backgroundColor = "chartreuse"
        newtext.style.color = "gray"
    }

    newbtbox.append(newbtcom,newbtdel)
    newspantext.append(newtext)
    newdiv.append(newspantext,newbtbox)
    boxAll.append(newdiv)
}

function funenad(event){
    if(event.keyCode === 13){
        funadd()
    }
    
}

function funclear(){
    ary = []
    boxAll.innerHTML = '' 
    localStorage.removeItem("final")
}

function funbtcom(event){
    let io = event.target.parentElement.previousElementSibling.firstElementChild.innerHTML
    let ip = ary.findIndex(function(esf){
         return esf.title === io
        })
    if(ary[ip].vaz){
        ary[ip].vaz = false
    }else{
        ary[ip].vaz = true
    }
    
    localStorage.setItem("final",JSON.stringify(ary))
    boxAll.innerHTML = ''
    funlod()
    
}





function fundelbt(event){
    let io = event.target.parentElement.previousElementSibling.firstElementChild.innerHTML
    let ip = ary.findIndex(function(esf){
        return esf.title === io
    })
    ary.splice(ip,1)
    localStorage.setItem("final",JSON.stringify(ary))
    boxAll.innerHTML = ''
    funlod()
    
}


function funlod(){
    let pp = JSON.parse(localStorage.getItem("final"))
    if(pp){
        ary = pp
        pp.forEach(function(ert){
        
            uilisttodo(ert.title)

        })

    }else{
        ary = []
    }
}



clearbtn.addEventListener("click",funclear)

input.addEventListener("keydown",funenad)

window.addEventListener("load",funlod)

btnadd.addEventListener("click",funadd)
