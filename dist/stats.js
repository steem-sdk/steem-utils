!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.steemutils=e():t.steemutils=e()}("undefined"!=typeof self?self:this,(function(){return("undefined"!=typeof self?self:this.webpackJsonpsteemutils="undefined"!=typeof self?self:this.webpackJsonpsteemutils||[]).push([[5],{1:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return o}));var n=function(t){return Array.isArray(t)?"array":"[object Object]"===Object.prototype.toString.call(t)?"object":"string"==typeof t.valueOf()?"string":"number"==typeof t.valueOf()?"number":"boolean"==typeof t.valueOf()?"boolean":void 0},o=function(t){if(!Array.isArray(t)&&"[object Object]"===!Object.prototype.toString.call(t))throw new Error("Invalid parameter");if("[object Object]"===Object.prototype.toString.call(t)&&(t=t.active_votes,!Array.isArray(t)))throw new Error("Invalid parameter");return t}},74:function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return i})),r.d(e,"voteStats",(function(){return o}));var n=r(1),o=function(t){return{total:(t=Object(n.b)(t)).length,upVotes:t.filter((function(t){return t.percent>0})).length,downVotes:t.filter((function(t){return t.percent<0})).length,removedVotes:t.filter((function(t){return 0===t.percent})).length}},i={voteStats:o}}},[[74,0]]])}));