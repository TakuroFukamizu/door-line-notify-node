'use stict';

const querystring =require('querystring');
const http =require('http');

class LineNotifyRequest {
    constructor() {
        this._hostname = 'notify-api.line.me';
        this._path = '/api/notify';
        this._apiToken = null;
        this._message = null;
        return this;
    }
    setToken(token) {
        this._apiToken = token;
        return this;
    }
    setMessage(message) {
        this._message = message;
        return this;
    }
    sendAsync() {
        return new Promise((resolve, reject) => {
            let postData = querystring.stringify({
                'message' : this._message
            });

            let options = {
                hostname: this._hostname,
                port: 443,
                path: this._path,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this._apiToken}`/*,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData)*/
                }
            };
            console.log(options);
            console.log(postData);
            let req = http.request(options, (res) => {
                let responses = {};
                console.log(`STATUS: ${res.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log(`BODY: ${chunk}`);
                    responses = responses + chunk;
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                    resolve(responses);
                });
            });

            req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
                reject(e);
            });

            // write data to request body
            req.write(postData);
            req.end();
        });
    }
}

//default class LineNotifyRequest;
module.exports = LineNotifyRequest;
