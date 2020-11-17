class UI {
    //capturo los elementos del html en variables
    constructor(){
        this.publicacionesUI = document.querySelector("#publicaciones");
        this.contenedorPub = document.querySelector("#contenedorPub");
        this.formTarjeta = document.querySelector("#formTarjeta");
        this.idInput = document.querySelector("#id");
        this.cuerpoInput = document.querySelector("#cuerpo");
        this.tituloInput = document.querySelector("#titulo");
        this.btnEnviar = document.querySelector("#btn-enviar");
        this.estado = "agregar";
    }
    //por cada publicacion del array recibido por parametro, creo un nuevo elemento html usando teamplate strings
    mostrarPublicaciones(publiaciones){
        let salida = "";
        publiaciones.forEach((publicacion) => {
            salida += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${publicacion.titulo}</h4>
                    <p class="card-text">${publicacion.cuerpo}</p>
                    <a href="#" class="editar card-link" data-id="${publicacion.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="borrar card-link" data-id="${publicacion.id}">
                    <i class="fa fa-remove"></i>    
                    </a>
                </div>
            </div>`
        })
        this.publicacionesUI.innerHTML = salida;
    }
    //asigno a los inputs los datos de la publicacion que recibo por parametro y cambio el estado
    rellenarCampos(datos){
        this.tituloInput.value = datos.titulo;
        this.cuerpoInput.value = datos.cuerpo;
        this.idInput.value = datos.id;
        this.estado = "editar";
        this.cambiarEstado(this.estado);
    }
    //este metodo cambia el estado de la interfaz. en el estado "agregar", que es el default, se pueden agregar nuevas publicaciones
    //en el estado "editar", se actualizan las publicaciones.
    //el cambio de estado se hace creando un nuevo boton (volver) y cambiando texto y color del boton ya existente
    cambiarEstado(tipo){
        if (tipo === "editar"){
            this.btnEnviar.textContent = "Actualizar Publicación";
            this.btnEnviar.classList ="btn btn-block btn-warning";
            
            const btnVolver = document.createElement("button");
            btnVolver.className = "btn btn-block btn-secondary mt-2 cancelar-Edicion";
            btnVolver.setAttribute("id", "btnVolver");
            btnVolver.textContent = "Volver";
            this.formTarjeta.appendChild(btnVolver);
        //si el estado que recibo por parametro es agregar, entonces quito los cambios hechos por el estado editar y limpio los campos
        }else{
            this.btnEnviar.textContent = "Publicalo!";
            this.btnEnviar.classList ="btn btn-block btn-primary";
            if (document.getElementById("btnVolver")){
                document.getElementById("btnVolver").remove();
            }
            this.limpiarCampos();
            
        }
    }
    //Muestro un mensaje de alerta, creando un nuevo elemento html e insertandolo
    mostrarAlerta(msj, clase) {
        this.removerAlerta();
        const divAlerta = document.createElement("div");
        divAlerta.className = clase;
        divAlerta.appendChild(document.createTextNode(msj));
        this.contenedorPub.insertBefore(divAlerta, this.publicacionesUI);
        
        //quito la alarma a los 3 segundos
        setTimeout(() => {
          this.removerAlerta();
        }, 3000);
      }
      //quitar alerta. busco si existe un elemento con clase alerta y lo quito
      removerAlerta() {
        const msjAlerta = document.querySelector(".alert");
        if (msjAlerta) {
          msjAlerta.remove();
        }
      }
    //limpio los inputs, incluyendo el input invisible "id"
    limpiarCampos(){
        this.tituloInput.value = "";
        this.cuerpoInput.value = "";
        this.idInput.value = "";
    }
}

export const ui = new UI();
