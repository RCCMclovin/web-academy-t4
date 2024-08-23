let button = document.getElementById("ok")
button.addEventListener("click", function (e){
    e.preventDefault();
    let raio = parseFloat(document.querySelector('input[name="raio"]').value)
    document.querySelector('input[name="area"]').value = (Math.PI*raio*raio).toFixed(2)
    document.querySelector('input[name="circ"]').value = (2*Math.PI*raio).toFixed(2)
})

