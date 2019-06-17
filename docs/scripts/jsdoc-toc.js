(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"module-collections.html\">collections</a>","id":"module:collections","children":[]},{"label":"<a href=\"module-concurrency.html\">concurrency</a>","id":"module:concurrency","children":[]},{"label":"<a href=\"module-conversions.html\">conversions</a>","id":"module:conversions","children":[]},{"label":"<a href=\"module-fp.html\">fp</a>","id":"module:fp","children":[]},{"label":"<a href=\"module-io.html\">io</a>","id":"module:io","children":[]},{"label":"<a href=\"module-logic.html\">logic</a>","id":"module:logic","children":[]},{"label":"<a href=\"module-types.html\">types</a>","id":"module:types","children":[]}],
        openedIcon: ' &#x21e3;',
        saveState: true,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
