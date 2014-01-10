# tabs

Dynamic tabs component with add, remove and order support.
If you just just want to convert tabs from static html, consider use [stagas/tabify](https://github.com/stagas/tabify).

## Install

    component-install chemzqm/tabs

## Usage

```js
var Tabs = require('tabs')

var parent = document.getElementById('tabs');
var tabs = new Tabs(parent);
tabs.closable();
tabs.sortable();
var contents = document.querySelectorAll('.tabs');
for (var i = 0; i < contents.length; i++) {
  var title = contents[i].getAttribute('data-title');
  tabs.add(title, contents[i]);
}
```
## events

* `active` emitted with activated nav element
* `sort` emitted when the tabs get reordered
* `empty` emitted when all tabs removed

## API

### new Tabs(parent)

Init tabs inside parent node.

### .closable()

Add close icon to the tab navs to make the tabs closable.

### .sortable()

Make the tab navs sortable

### .add(title, node)

Add a tab with title string and associate dom node.

### .active(el|query)

Active the tab by css query(querySelector inside) or tab element.

### .remove()

Destroy this tabs instance.

## License

MIT
