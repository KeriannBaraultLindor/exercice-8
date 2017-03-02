var http = require('http');
var fs = require('fs');
var url = require('url');


// Création du serveur
//fontion executée losqu'on accede au localhost
http.createServer( function (request, response) {  
   // On extrait le chemin qui nous permet d'obtenir le nom du fichier
   var pathname = url.parse(request.url).pathname;
   //test
   console.log("hfg");

   for (p in request){
      //test de console pour savoir si on rentre dans le for
      console.log("attribut de request = " + p);
   }
   
 
   console.log("request.url = " + request.url)
   console.log("url.parse(request.url).pathname = " + url.parse(request.url).pathname)
  // affiche le nom du fichier pour laquelle la requête a été généré
   console.log("Request for " + pathname + " received.");
   

   // Lire par le «fs» (file système) le fichier de la requête 
   // le slice(1) permet de retirer le premier caractère
   //on rajoute l'extension .json au nom tapé dans l'url
   //data = contenu du fihcier json
   fs.readFile(pathname.slice(1) + ".json", function (err, data) {
      if (err) {
         //affiche le status d'erreur
         console.log(err);
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else { 
         var obj = JSON.parse(data); //convertir le contenu du fichier, qui est une chaine de caracteres, en JSON
         var tableauProvince = ""; //tableau pour conserver les provinces

         for (propriete in obj){

            //ajoute les provinces dans un td
            tableauProvince += ("<td>"+ propriete + '-' + obj[propriete] + "</td>");
      
         }
         
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});  
         
         // affiche le contenu du fichier json dans la page HTML, sous forme de tableau
         response.write("<table><tr>" + tableauProvince + "</tr></table>");   
      }
      // reponse  
      response.end();
   });   
}).listen(8081);//localhost

// message test de console
console.log('Serveur se trouvant à http://127.0.0.1:8081/');

