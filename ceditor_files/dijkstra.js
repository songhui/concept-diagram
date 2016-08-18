var model = {
    "n7": {
        "title": "gap ",
        "loc": "473@48"
    },
    "n12": {
        "title": " low cost",
        "loc": "809@44"
    },
    "n17": {
        "title": " cloud trend",
        "loc": "1259@44"
    },
    "n26": {
        "title": " no cus-pro dependency",
        "loc": "99@149"
    },
    "n31": {
        "title": " partner fulfill functions",
        "loc": "616@121"
    },
    "n36": {
        "title": " partner ensure correct usage",
        "loc": "523@187"
    },
    "n41": {
        "title": " partner as a beta-customer",
        "loc": "813@122"
    },
    "n46": {
        "title": " provider facing customers",
        "loc": "1321@120"
    },
    "n51": {
        "title": " partner responsible on quality to providers",
        "loc": "1213@188"
    },
    "n88": {
        "title": " local host",
        "loc": "112@63"
    },
    "n121": {
        "title": " cus-par join resp. on quality",
        "loc": "604@243"
    },
    "n126": {
        "title": " direct code modification",
        "loc": "419@292"
    },
    "n131": {
        "title": " direct data manipulation",
        "loc": "496@379"
    },
    "n136": {
        "title": " lightweight development",
        "loc": "570@335"
    },
    "n141": {
        "title": " consultant development",
        "loc": "871@312"
    },
    "n146": {
        "title": " joint-test",
        "loc": "741@320"
    },
    "n151": {
        "title": " provider-side testing",
        "loc": "1265@295"
    },
    "n156": {
        "title": " postpone upgrade",
        "loc": "436@465"
    },
    "n161": {
        "title": " reuse and partner app",
        "loc": "808@411"
    },
    "n166": {
        "title": " code policing",
        "loc": "1142@418"
    },
    "n171": {
        "title": " minor customisation",
        "loc": "665@500"
    },
    "n180": {
        "title": " ",
        "loc": "1000@490"
    }
}
var m = {
    "n31": [
        "n7"
    ],
    "n36": [
        "n7"
    ],
    "n41": [
        "n7"
    ],
    "n46": [
        "n17"
    ],
    "n26": [
        "n88"
    ],
    "n51": [
        "n17",
        "n46"
    ],
    "n7": [],
    "n12": [],
    "n17": [],
    "n88": [],
    "n121": [],
    "n126": [],
    "n131": [],
    "n136": [],
    "n141": [],
    "n146": [],
    "n151": [],
    "n156": [],
    "n161": [],
    "n166": [],
    "n171": [],
    "n180": []
}

var allnodes = []

// Presentational attributes.
var attrs = {
    elementDefault: {
        text: { fill: 'red', style: { 'text-transform': 'capitalize' } },
        circle: { fill: '#feb663', stroke: 'white' }
    },
    elementSelected: {
        circle: { fill: '#9687fe' }
    },
    elementHighlighted: {
        circle: { fill: '#31d0c6' }
    },
    linkDefault: {
        '.connection': { stroke: '#6a6c8a', 'stroke-width': 1 }
    },
    linkDefaultDirected: {
        '.marker-target': { d: 'M 6 0 L 0 3 L 6 6 z' }
    },
    linkHighlighted: {
        '.connection': { stroke: '#33334e', 'stroke-width': 3 }
    }
};

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({ el: $('#paper'), width: 1600, height: 1200, gridSize: 1, model: graph });

// Create a node with `id` at the position `p`.
function n(id, p) {
    //alert(p)
    var node = (new joint.shapes.basic.Circle({
        id: id,
        position: { x: g.point(p).x, y: g.point(p).y },
        size: { width: 40, height: 40 },
        attrs: attrs.elementDefault
    })).addTo(graph);
    node.attr('text/text', model[id].title);
    //node['myid'] = id
    //console.log(JSON.stringify(node, null, 4))
    return node;
}

// Create a link between a source element with id `s` and target element with id `t`.
function l(s, t) {
    (new joint.dia.Link({
        id: [s,t].sort().join(),
        source: { id: s },
        target: { id: t },
        z: -1,
        attrs: attrs.linkDefault
    })).addTo(graph);
}

// Create a random point in the specified area.
function r() {
    return g.point.random(30, 600, 30, 300) + '';
}

// Construct nodes and links based on teh adjancy list.
_.each(m, function(adjs, parent) {
    loc = model[parent]['loc']
    console.log(loc)
    if(loc == undefined){
      loc = r();
    }
    n(parent, loc);
    _.each(adjs, function(adj) {
        // Do not create the node if it's already in the graph.
        if (!graph.getCell(adj)) {
          var subloc = model[adj]['loc']
          if(subloc == undefined) subloc = r();
          n(adj, subloc);
        }
        l(parent, adj);
    });
});

// When a new link is created via UI (in Edit mode), remove the previous link
// and create a new one that has the ID constructed as "nodeA,nodeB". The
// reason we're removing the old link below is that it is not a good idea
// to change ID's of any model in JointJS.
graph.on('change:source change:target', function(link, collection, opt) {

    var sourceId = link.get('source').id;
    var targetId = link.get('target').id;
    if (opt.ui && sourceId && targetId) {

        var newId = [sourceId, targetId].sort().join();
        link.remove();
        l(sourceId, targetId);

    }
});

graph.on('change:position', function(elem){
    if (editMode || elem.isLink()) return;
    console.log(elem.id)
    //console.log(JSON.stringify(elem.get('position'), null, 4))
    pos = elem.get('position')
    var loc = pos.x + '@' + pos.y
    model[elem.id]['loc'] = loc
    console.log(loc);

});

// Interaction.
// ------------

function saveTitle(selected){
    var id = selected.id
    model[id]['title'] = $('#concept-title').val()
    selected.attr('text/text', model[id]['title'])
}

function showTitle(selected){
    $('#concept-title').val(model[selected.id]['title'])
    $('#concept-title').focus()
}

// Select source.
var selected;

function selectCellView(cellViewModel){
  if (selected) {
    selected.attr(attrs.elementDefault);
    saveTitle(selected);
  }
  (selected = cellViewModel).attr(attrs.elementSelected);
  showTitle(selected)
  console.log(selected.id)
}

paper.on('cell:pointerdown', function(cellView) {
    if (editMode || cellView.model.isLink()) return;
    console.log(cellView.model)
    selectCellView(cellView.model);

});

// Hover an element to select a target.
paper.on('cell:mouseover', function(cellView, evt) {
    if (editMode || cellView.model.isLink() || cellView.model === selected) return;
    if (selected) {
        var path = graph.shortestPath(selected, cellView.model, { directed: directed });
        showPath(path);
        cellView.model.attr(attrs.elementHighlighted);
    }
});

// Deselect target.
paper.on('cell:mouseout', function(cellView, evt) {
    if (editMode || cellView.model.isLink() || cellView.model === selected) return;
    cellView.model.attr(attrs.elementDefault);
    hidePath();
});

// Helpers.

var pathLinks = [];

function hidePath() {
    $('#path').text('');
    _.each(pathLinks, function(link) {
        link.attr(attrs.linkDefault);
        link.set('labels', []);
    });
}

function showPath(path) {

    $('#path').text(path.join(' -> '));
    for (var i = 0; i < path.length; i++) {
        var curr = path[i];
        var next = path[i + 1];
        if (next) {
            var link = graph.getCell([curr, next].sort().join());
            link.label(0, { position: .5, attrs: {
                text: { text: ' ' + (i + 1) + ' ', 'font-size': 10, fill: 'white' },
                rect: { rx: 8, ry: 8, fill: 'black', stroke: 'black', 'stroke-width': 5 }
            } });
            pathLinks.push(link.attr(attrs.linkHighlighted));
        }
    }
}

// UI.

var directed = false;
$('#opt-directed').on('change', function(evt) {
    directed = $(evt.target).is(':checked');
    _.each(graph.getLinks(), function(link) {
        if (directed) {
            link.attr(attrs.linkDefaultDirected);
        } else {
            link.removeAttr('.marker-target');
        }
    });
});

var editMode;
$('#opt-edit').on('change', function(evt) {
    editMode = $(evt.target).is(':checked');
    _.each(graph.getElements(), function(el) {
        if (editMode) {
            el.attr('circle/magnet', true).attr('text/pointer-events', 'none');
        } else {
            el.removeAttr('circle/magnet').removeAttr('text/pointer-events');
        }
    });
});

function saveLinks(){
  result = {}
  _.each(graph.getLinks(), function(link){
      var source = link.get('source').id;
      var target = link.get('target').id;
      if(result[source]==undefined){
          result[source]=[];
      }
      if($.inArray(target, result[source])==-1){
          result[source].push(target);
      }
  });
  _.each(graph.getElements(),function(elm){
    var id = elm.id;
    console.log(id)
    if(result[id]==undefined){
      result[id] = []
    }
  })
  return result;
}

paper.on('blank:pointerdblclick', function(evt, x, y) {

    if (editMode) {
        var uid = _.uniqueId('n')
        var loc = x + '@' + y
        model[uid] = {'title':' ', 'loc': loc}
        var node = n(uid, loc);
        node.attr('circle/magnet', true).attr('text/pointer-events', 'none');
        selectCellView(node)

        var outtext = "var model = " + JSON.stringify(model, null, 4);
        outtext = outtext + "\n" + "var m = " + JSON.stringify(saveLinks(), null, 4)
        $('#out-text-area').val(outtext)
        //$('#out-text-area').val()

    }
});
