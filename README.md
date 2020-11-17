# MicroPublicaciones
App para hacer publicaciones como en una red social usando un falso servidor (json server)

Es una aplicacion CRUD usando webpack para el manejo de paquetes y babel para convertir el codigo javascript ES6 a versiones anteriores por compatibilidad.
Tambien es compatible con async/await usando babel polyfill
Como la app se maneja con requests HTTP, se utiliza json server para que haga de falso servidor.

Para utilizar

1-descargar/clonar el repo
2-con una terminal, instalar los paquetes usando npm install
3-luego ejecutar npm start para poder usar el navegador para ver la app (usa webpack-dev-server)
4-en otra terminal, ejectuar npm run json:server para habilitar el falso servidor

