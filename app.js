/**
 * 
 * @authors chandre (chandre21cn@gmail.com)
 * @date    2017-04-09 21:01:20
 * @version $Id$
 */

const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();

let  router 	= require("./router");

// 收藏图标
app.get("/favicon.ico", (req, res)  => {
	res.send("");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/" , router )

let config 	= require("./config")
// 启动HTTP服务
let server = app.listen({
	port : config.port || 3000,
	host : config.host || "0.0.0.0"
},  () => {
	console.log('HanLP Service listening at http://%s:%s', server.address().address, server.address().port);
});