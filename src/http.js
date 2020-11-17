/*
Pequeña biblioteca para hacer request de HTTP
*/

class EasyHTTP {
  
    //hacer request HTTP GET
    async get(url) {
      const respuesta = await fetch(url);
      const datosRes = await respuesta.json();
      return datosRes;
    }

    //hacer request HTTP POST 
    async post(url, data) {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datosRes = await respuesta.json();
      return datosRes;
    }

    //hacer request  HTTP PUT
    async put(url, data) {
      const respuesta = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datosRes = await respuesta.json();
      return datosRes;
    }
  
    //hacer request HTTP DELETE  
    async delete(url) {
      const respuesta = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const datosRES = await "Recurso borrado"
      return datosRES;
    }
  }
  
  export const http = new EasyHTTP();