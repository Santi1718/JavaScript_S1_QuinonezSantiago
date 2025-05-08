let link = `https://6818a32f5a4b07b9d1d01baa.mockapi.io/api/v1/Api`
function api(){
    axios.get(link)
    .then((response)=>{
        console.log(response["data"])
    })
}
function añadir(personaje,actor,edad,ubicacion,imagen,fecha,productora){
    axios.post(link,{
        "personaje":personaje,
        "actor":actor,
        "edad":edad,
        "ubicacion":ubicacion,
        "imagen:poster":imagen,
        "fecha":fecha,
        "productora":productora
    })
}
api()
document.getElementById("guardar").addEventListener("click", function(e){
    e.preventDefault();

    let personaje = document.getElementById("nombre_personaje").value
    let actor = document.getElementById("nombre_actor").value
    let edad = document.getElementById("edad_actor").value
    let ubicacion = document.getElementById("ubicacion").value
    let imagen = document.getElementById("poster").value
    let fecha = document.getElementById("fecha").value
    let productora = document.getElementById("productora").value

    añadir(personaje,actor,edad,ubicacion,imagen,fecha,productora)
})
document.getElementById("trajecitos").addEventListener("click", function(e){
    e.preventDefault();

    let añadir = document.getElementById("añadir_trajes")

    añadir.innerHTML += `<p>holaaaa</p>`
})