'use stict';

//import LineNotifyRequest from 'LineNotifyRequest';
const LineNotifyRequest  = require('./LineNotifyRequest.js');

let api_token = 'YOUR TOKEN';

let req = new LineNotifyRequest().setToken(api_token);
req.setMessage('hogehoge');
req.sendAsync().then((res) => {
    console.log(res);
}).catch((e) => { 
    console.error(e);
});