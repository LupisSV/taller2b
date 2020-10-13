const express = require('express');
const app = express();

// app.use(express.static(__dirname + '/public/'));

// app.listen('3000', function() {
//   console.log('Servidor web escuchando en el puerto 3000');
// });

'use strict'

var http = require('http').createServer(webServer),
	form = require('fs').readFileSync('public/index.html'),
	querystring = require('querystring'),
	util = require('util'),
	dataString = ''


function webServer(req, res)
{
	if(req.method  == 'GET')
	{
		res.writeHead(200, {'Content-Type' : 'text/html'})
		res.end(form)

		app.get("/:id", async (req, res) =>{
			try{
				let id = req.params.id;
				let usuario = await db.Usuario.findByPK(id);
				res.status(200).send(usuario);
			} catch (error) {
				res.status(400).send("No se pudo obtener el dato");
			}
		});
	}

	if(req.method == 'POST')
	{
		req
			.on('data', function (data){
				dataString += data
			})
			.on('end', function (){
				var dataObject = querystring.parse(dataString),
					dataJSON = util.inspect(dataObject),
					templateString = `
Los datos que enviaste por POST como string son: ${dataString}
				`
//Los datos que enviaste por POST como objeto son: ${dataObject}
//Los datos que enviaste por POST como JSON son: ${dataJSON}
				console.log(templateString)
				res.end(templateString)
			})
	}

	if(req.method == 'PUT')
	{
		app.put("/:id", async (req, res) =>{
			try{
				let id = req.params.id;
				let { sexo, actividades } = req.body;
				await db.Usuario.update(
					{ sexo, actividades},
					{
						where: {
							id,
						},
					}
				);
			} catch (error) {
				res.status(400).send("No se pudo actualizar el dato");
			}
		});
	}

	if(req.method == 'DELETE')
	{
		app.delete("/:id", async (req, res) =>{
			try{
				let id = req.params.id;
				await db.Usuario.destroy(
					{
						where: {
							id,
						},
					}
				);
			} catch (error) {
				res.status(400).send("No se pudo eliminar el dato");
			}
		});
	}
}


http.listen(3000)

console.log('Servidor corriendo en http://localhost:3000/')