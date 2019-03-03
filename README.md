# Team08-back
<img src="https://ssaenz11.github.io/images/donu.jpg">
<h1>Descripción del proyecto Donu</h1>
<p>Donu es una plataforma web que pretender facilitar el proceso de donaciones entre las personas y las ONG En esta plataforma pretendemos que tanto los usuario y las ong puedan decir los elementos que pueden donar y los que realmente necesitan. Existen también empresas que patrocinan las ONG y empresas de transporte que estarán encargadas de facilitar la transacción. Finalmente pueden observarse las evicencias de que se han hecho con las donaciones que se han dado.</p>
<br>
<img src="https://api.genmymodel.com/projects/_K1b0oD05EemQWcstM2zleA/diagrams/_K1b0oz05EemQWcstM2zleA/svg">

<h1>Instrucciones para correr el proyecto</h1>
<ol>
  <li >Descragar el proyecto </li>
  <li >hacer npm install </li>
  <li >hacer npm nodemo </li>
  <li >abrir en un navegador con la url http://localhost:3000/</li>
</ol>
<h1>Puntos a tener en cuenta</h1>
<ul>
  <li value="20"><strong>AL CORRER LAS PRUEBAS DE POSTMAN ASEGURESE DE COLOCAR UN DELAY DE 1000 MS PUES LAS PETICIONES GENERARAN FALLO SI NO SE COLOCA ESTE TIEMPO. LA RAZÓN ES QUE COMO LEE Y ESCRIBE SOBRE ARCHIVO JSON, LAS PETICIONES DE POSTMAN PUEDEN SER MUY RÁPIDAS Y PUEDEN GENERAR ERROR </strong></li>
  <li value="20">RECUERDE QUE PARA LAS PRUEBAS DE DELETE CORRERAN CORRECTAMENTE SOLO UNA VEZ, PUESTO QUE LUEGO ESTARÁN BORRADOS LOS ELEMENTOS</li>
</ul>

<h2>Rutas de peticiones ejemplos</h2>
<ul>
  <li > GET: http://localhost:3000/solicitud</li>
   <li >GET: http://localhost:3000/ong </li>
   <li >GET: http://localhost:3000/sponsor </li>
   <li >POST: http://localhost:3000/solicitud </li>
   <li >POST: http://localhost:3000/ong </li>
   <li >POST: http://localhost:3000/sponsor </li>
   <li >PUT: http://localhost:3000/solicitud/17 </li>
   <li >PUT: http://localhost:3000/ong/17 </li>
   <li >PUT:http://localhost:3000/sponsor/17 </li>
  <li >DELETE:http://localhost:3000/solicitud/17 </li>
  <li >DELETE:http://localhost:3000/ong/17 </li>
  <li >DELETE:http://localhost:3000/sponsor/17 </li>
 
 </ul>


