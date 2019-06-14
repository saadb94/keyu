(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"module-collections.html\">collections</a>","id":"module:collections","children":[]},{"label":"<a href=\"module-concurrency.html\">concurrency</a>","id":"module:concurrency","children":[]},{"label":"<a href=\"module-fp.html\">fp</a>","id":"module:fp","children":[]}],
        openedIcon: ' &#x21e3;',
        saveState: true,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
