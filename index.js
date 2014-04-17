/*!
 *
 * tabs
 *
 * MIT licence
 *
 */

var Emitter = require('component-emitter')
var Sortable = require('chemzqm-sortable');
var domify = require('component-domify');
var events = require ('component-events');
var classes = require ('component-classes');
var slice = Array.prototype.slice;

/**
 * Exports.
 */

module.exports = Tabs;

/**
 * Init the dom structor with parent node.
 *
 * @param {Element} parent
 * @api public
 */
function Tabs (parent) {
  if(! this instanceof Tabs) return new Tabs(parent);
  var header = this.header = domify('<ul class="tabs-header"></ul>');
  var body = this.body = domify('<div class="tabs-body"></div>');
  parent.appendChild(header);
  parent.appendChild(body);
  this.events = events(header, this);
  this.events.bind('click .close', '_close');
  this.events.bind('click li', '_click');
}

Emitter(Tabs.prototype);

/**
 * Destroy all the tabs
 * @api public
 */
Tabs.prototype.remove = function() {
  this.events.unbind();
  this.body.parentNode.removeChild(this.body);
  this.header.parentNode.removeChild(this.header);
}

/**
 * Make tabs closable
 *
 * @api public
 */
Tabs.prototype.closable = function() {
  this._closable = true;
  return this;
}

/**
 * Make tabs sortable
 * @api public
 */
Tabs.prototype.sortable = function() {
  var sortable = Sortable(this.header)
  sortable.bind('li');
  sortable.on('update', function() {
    var lis = this.header.childNodes;
    this.emit('sort', slice.call(lis));
  }.bind(this));
  return this;
}

/**
 * Add tab with `title` string and related dom node
 *
 * @param {String} title
 * @param {Element} node
 * @api public
 */
Tabs.prototype.add = function(title, node) {
  var tab = domify('<li>' + title + '</li>');
  node = (typeof node === 'string') ? domify(node) : node;
  this.header.appendChild(tab);
  if (this._closable) {
    var close = domify('<a href="#" class="close">×</a>');
    tab.appendChild(close);
  }
  tab.__target = node;
  this.body.appendChild(node);
  this.active(tab);
  return this;
}

/**
 * Active a tab by selector or tab element
 * @param {String|Element} el
 * @api public
 */
Tabs.prototype.active = function(el) {
  if (typeof el === 'string') {
    el = this.header.querySelector(el);
  }
  if (el === this._active) return;
  var lis = this.header.childNodes;
  for (var i = 0; i < lis.length; i++) {
    classes(lis[i]).remove('active');
  }
  classes(el).add('active');
  var nodes = this.body.childNodes;
  for ( i = 0; i < nodes.length; i++) {
    classes(nodes[i]).add('hide');
  }
  classes(el.__target).remove('hide');
  this._active = el;
  this.emit('active', el);
}

Tabs.prototype._click = function (e) {
  var el = e.target;
  if (classes(el).has('close')) return;
  e.stopPropagation();
  this.active(el);
}

Tabs.prototype._close = function (e) {
  var el = e.target;
  e.preventDefault();
  e.stopPropagation();
  var li = el.parentNode;
  var prev = li.previousElementSibling;
  var next = li.nextElementSibling;
  var target = li.__target;
  target.parentNode.removeChild(target);
  li.parentNode.removeChild(li);
  if (this.body.childNodes.length === 0) return this.emit('empty');
  if (this._active !== li) return;
  if (prev) return this.active(prev);
  if (next) return this.active(next);
}
