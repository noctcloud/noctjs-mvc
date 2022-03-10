"use strict";

const _ = require("lodash.template");

module.exports = function(tpl, variables) {
  return _(tpl)(variables);
}
