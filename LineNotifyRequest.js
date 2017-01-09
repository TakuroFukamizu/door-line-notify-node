'use stict';

const querystring = require('querystring');
const request = require('request');

class LineNotifyRequest {
  constructor() {
    this.notifyApiUrl = 'https://notify-api.line.me/api/notify';
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
    const _this = this;
    return new Promise((resolve, reject) => {
      let options = {
        url: _this.notifyApiUrl,
        method: 'POST',
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': `Bearer ${_this._apiToken}`
        },
        formData: {
          message: _this._message
        }
      };

      request(options, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(err);
        }
      })

    });
  }
}

//default class LineNotifyRequest;
module.exports = LineNotifyRequest;
