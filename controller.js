"use strict";

const {
  service
} = require('noctjs');
const fs = require("fs");
const render = require('./render');

/**
 * 控制器抽象基类
 */
module.exports = class controller extends service {

  constructor({
    event,
    context,
    noct
  }) {
    super({
      event,
      context,
      noct
    });

    this.view = (model) => {
      let html = fs.readFileSync(this.noct.config.baseDir + `/views/${this.noct.request.service}/${this.noct.request.action}.html`).toString();
      if (model) {
        html = render(html, model);
      }
      this.noct.response.headers["content-type"] = "text/html";
      return html;
    }

    this.redirect = (url, statusCode = 302) => {
      this.noct.response.statusCode = statusCode;
      this.noct.response.headers["content-type"] = "text/html";
      this.noct.response.headers["location"] = url;
    }
  }

}
