let button = document.getElementById("ok")
button.addEventListener("click", function (e){
    e.preventDefault();
    
    let b = [0,0,0,0,0]
    b[0] = parseFloat(document.querySelector('input[id="b1"]').value)
    b[1] = parseFloat(document.querySelector('input[id="b2"]').value)
    b[2] = parseFloat(document.querySelector('input[id="b3"]').value)
    b[3] = parseFloat(document.querySelector('input[id="b4"]').value)
    b[4] = parseFloat(document.querySelector('input[id="b5"]').value)
    let l = parseFloat(document.querySelector('input[id="l"]').value)
    let g = document.getElementById("g")

    g.innerHTML=""
    for(let i=0; i < 5; i++){
        g.innerHTML +="<div class=\"barra\" style=\"height:"+b[i]+"px; width:"+l+"px;\"></div>"
    }
    
})

