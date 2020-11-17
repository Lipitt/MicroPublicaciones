//imports
import { http } from "./http";
import { ui } from "./ui";

//listeners de eventos
document.addEventListener("DOMContentLoaded", traerPublicaciones);
ui.btnEnviar.addEventListener("click", enviarPublicacion);

//para los 3 listeners de abajo utilizo delegacion de eventos ya que son elementos que no necesariamente estan presentes desde la compilacion
//y que pueden generarse en tiempo de ejecucion
ui.publicacionesUI.addEventListener("click", borrarPublicacion);
ui.publicacionesUI.addEventListener("click", mostrarEdicion);
ui.formTarjeta.addEventListener("click", cancelarEdicion)

//traigo las publicaciones del falso servidor json y las envio al controlador de UI para que las muestre en la interfaz
function traerPublicaciones(){
    http.get("http://localhost:3000/posts")
    .then(datos => ui.mostrarPublicaciones(datos))
    .catch(err => console.log(err));
}

function enviarPublicacion(e){
    e.preventDefault();
    //capturo los valores de los inputs
    const titulo = ui.tituloInput.value;
    const cuerpo = ui.cuerpoInput.value;
    const id = ui.idInput.value;

    //los guardo en un objeto
    const datos = {
        titulo,
        cuerpo,
        id
    }
     
    //pregunto si los valores de los inputs estan vacios. si no lo estan, creo o actualizo una publicacion
    if( titulo !== "" && cuerpo !== ""){
        //si el input invisible "id" esta vacio, es porque es una nueva publicacion. 
        if(id === ""){
            //creo un nueva publicacion en el servidor
            http.post("http://localhost:3000/posts", datos)
            .then(data => {
                //limpio los campos, muestro mensaje y vuelvo a cargar las publicaciones del servidor
                ui.limpiarCampos();
                ui.mostrarAlerta("Publicación agregada", "alert alert-success");
                traerPublicaciones()})
            .catch(err => console.log(err));
        //si "id" tiene un valor asignado, es una actualizacion
        }else{
            //actualizo la informacion de la publicacion seleccionada. uso la propiedad id como referencia
            http.put(`http://localhost:3000/posts/${id}`, datos)
            .then(data => {
                //muestro mensaje y vuelvo a cargar publicaciones
                ui.mostrarAlerta("Publicación actualizada", "alert alert-success");
                traerPublicaciones()})
            .catch(err => console.log(err));
            //cambio el estado a "agregar" para permitir que se sigan haciendo nuevas publicaciones 
            ui.cambiarEstado("agregar");
        }
    //si los campos estan vacios, muestro un mensaje de alerta
    }else{
        ui.mostrarAlerta("Ingrese todos los campos", "alert alert-danger");
    }
}
//si el objetivo del evento contiene la clase editar, se capturan la informacion de la publicacion donde se disparo el evento 
//se los guarda en un objeto y se los envia al metodo rellenar campos del a interfaz 
function mostrarEdicion(e){
    e.preventDefault(e);
    if (e.target.parentNode.classList.contains("editar")){
        const id = e.target.parentNode.dataset.id;
        const titulo = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const cuerpo = e.target.parentElement.previousElementSibling.textContent;
        const datos = {
            id,
            titulo,
            cuerpo
        }
        ui.rellenarCampos(datos);
    }
}

//cancelo estado edicion preguntando si el elemento del evento tiene una clase en particular. si la tiene, llamo al metodo cambiar estado
//con el parametro necesario para el cambio
function cancelarEdicion(e){
    e.preventDefault();
    if (e.target.classList.contains("cancelar-Edicion")){
        ui.cambiarEstado("agregar");
    }
}
//metodo para borrar una publicacion. pregunto si el padre del elemento que disparo el evento contiene la clase borrar,
//y si es asi, borro la publicacion, muestro alerta y vuelvo a cargar las publicaciones
function borrarPublicacion(e){
    e.preventDefault();
    if (e.target.parentNode.classList.contains("borrar")){
        const id = e.target.parentNode.dataset.id;
        if(confirm("Esta seguro?")){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(datos => {
                ui.mostrarAlerta("Publicación borrada", "alert alert-primary");
                traerPublicaciones();
            })
            .catch(err => console.log(err));
        }
    }
}
