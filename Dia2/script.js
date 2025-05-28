function BuscarPoke(){
    let pokes = new XMLHttpRequest();
    let numPokemon = document.getElementById("fondo__formBusqueda--formtext").value;
    let link= `https://pokeapi.co/api/v2/pokemon/${numPokemon}`;
    if (numPokemon==0){
        numPokemon=1
        link= `https://pokeapi.co/api/v2/pokemon/${numPokemon}`;
        pokes.open('GET',link,true);
        pokes.onreadystatechange = function(){
        if(this.readyState === 4 && this.status ===200 ){
            let respuesta = JSON.parse(this.responseText);
            console.log(respuesta["sprites"]["other"]["showdown"]["front_default"]);
            printPoke(respuesta);
        }else{
            printPoke({ response: "error" });  
        }
    };
    pokes.send();
    }
    else
    {
        pokes.open('GET',link,true);
        pokes.onreadystatechange = function(){
            if(this.readyState === 4 && this.status ===200 ){
                let respuesta = JSON.parse(this.responseText);
                console.log(respuesta["sprites"]["other"]["showdown"]["front_default"]);
                printPoke(respuesta);
            }else{
                printPoke({ response: "error" });  
            }
        };
        
        pokes.send();
    }
}

BuscarPoke();

function MenosId(){
    let input = document.getElementById("fondo__formBusqueda--formtext");
    let numPokemonoculto = parseInt(input.value);
    if(numPokemonoculto > 1) {
        numPokemonoculto -= 1;
        input.value = numPokemonoculto;
        BuscarPoke();
    }
}

function MasId(){
    let input = document.getElementById("fondo__formBusqueda--formtext");
    let numPokemonoculto = parseInt(input.value, 10);
    numPokemonoculto += 1;
    input.value = numPokemonoculto;
    BuscarPoke();
}

function printPoke(data){
    let informacionHTML = document.getElementById('fondo__poquemonInfo--name&image');
    if(data.response == "error"){
        informacionHTML.innerHTML=`<p class="nada">Error este pokemon no existe</p>`
    }else{
        informacionHTML.innerHTML=`
        <img class="foto" src=${data["sprites"]["other"]["showdown"]["front_default"]} />
        <p id="id">${data["id"]}-</p>
        <p class="name"> ${data["name"]}</p>`
        numPokemonoculto=document.getElementById("id");
    }
}
const input= document.getElementById("fondo__formBusqueda--formtext");
input.addEventListener("keydown",function(event){
    if (event.key==="Enter"){
        BuscarPoke()
        
    }

})

const inputs= document.getElementById("fondo__formBusqueda--prev");
inputs.addEventListener("click",function(){
     MenosId()
})

const inputss= document.getElementById("fondo__formBusqueda--next");
inputss.addEventListener("click",function(){
     MasId()
})
