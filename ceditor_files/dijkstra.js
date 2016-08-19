var model = {
    "n7": {
        "title": "gap ",
        "loc": "473@48"
    },
    "n12": {
        "title": " low cost",
        "loc": "894@57"
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
        "title": " postpone upgrade",
        "loc": "247@398"
    },
    "n131": {
        "title": " direct data manipulation",
        "loc": "496@424"
    },
    "n136": {
        "title": " lightweight development",
        "loc": "593@359"
    },
    "n141": {
        "title": " consultant development",
        "loc": "871@312"
    },
    "n146": {
        "title": " joint-testing",
        "loc": "736@346"
    },
    "n151": {
        "title": " provider-side testing",
        "loc": "1265@295"
    },
    "n156": {
        "title": " postpone upgrade",
        "loc": "415@513"
    },
    "n161": {
        "title": " reuse and partner app",
        "loc": "808@411"
    },
    "n166": {
        "title": " code policing",
        "loc": "1232@406"
    },
    "n171": {
        "title": " minor customisation",
        "loc": "665@500"
    },
    "n180": {
        "title": " ground rules and boudaries",
        "loc": "960@706"
    },
    "n128": {
        "title": " direct code access",
        "loc": "279@612"
    },
    "n133": {
        "title": " direct database access",
        "loc": "186@718"
    },
    "n138": {
        "title": " reuse support",
        "loc": "741@615"
    },
    "n143": {
        "title": " DSL",
        "loc": "719@723"
    },
    "n148": {
        "title": " automatic testing",
        "loc": "1009@546"
    },
    "n153": {
        "title": " develop for one customer",
        "loc": "439@323"
    },
    "n158": {
        "title": " version master",
        "loc": "1229@504"
    },
    "n163": {
        "title": " source code management",
        "loc": "861@824"
    },
    "n168": {
        "title": " development environment",
        "loc": "664@886"
    },
    "n173": {
        "title": " agile testing environment",
        "loc": "957@946"
    },
    "n178": {
        "title": " preview environment",
        "loc": "1166@862"
    },
    "n183": {
        "title": " agile partner",
        "loc": "782@49"
    },
    "n188": {
        "title": " dashboard for all tenants",
        "loc": "1244@950"
    },
    "n217": {
        "title": " close relationship",
        "loc": "636@58"
    },
    "n342": {
        "title": " continuos upgrade",
        "loc": "1381@563"
    },
    "n347": {
        "title": " ",
        "loc": "1033@69"
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
    "n126": [
        "n12"
    ],
    "n153": [
        "n7",
        "n183"
    ],
    "n136": [
        "n183",
        "n12"
    ],
    "n146": [
        "n217"
    ],
    "n131": [
        "n12",
        "n121"
    ],
    "n171": [
        "n183",
        "n12"
    ],
    "n141": [
        "n12",
        "n183"
    ],
    "n161": [
        "n12"
    ],
    "n148": [
        "n12",
        "n51",
        "n151"
    ],
    "n166": [
        "n51"
    ],
    "n151": [
        "n51"
    ],
    "n7": [],
    "n17": [],
    "n88": [],
    "n12": [],
    "n183": [],
    "n217": [],
    "n121": [],
    "n156": [],
    "n180": [],
    "n128": [],
    "n133": [],
    "n138": [],
    "n143": [],
    "n158": [],
    "n163": [],
    "n168": [],
    "n173": [],
    "n178": [],
    "n188": [],
    "n342": [],
    "n347": []
}
var dlinks = [
    "n126@n12",
    "n148@n151"
]

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
        '.connection': { stroke: '#6a6c8a', 'stroke-width': 1, 'decreasing': false }
    },
    linkDefaultDirected: {
        '.marker-target': { d: 'M 6 0 L 0 3 L 6 6 z' }
    },
    linkHighlighted: {
        '.connection': { stroke: '#33334e', 'stroke-width': 3 }
    },
    linkDecrease: {
        '.connection': { stroke: '#6a6c8a', 'stroke-width': 1, 'stroke-dasharray': '5.5', 'decreasing': true }
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
    var link = (new joint.dia.Link({
        id: [s,t].sort().join(),
        source: { id: s },
        target: { id: t },
        z: -1,
        attrs: attrs.linkDefault
    }))
    link.addTo(graph);
    if($.inArray(s+'@'+t, dlinks) != -1){
      console.log("I'm going to change")
      link.removeAttr(".connection")
      link.attr(attrs.linkDecrease)
    }
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

paper.on('link:options', function (evt, cellView, x, y) {
  console.log("something");
  if ($('#opt-change-link').is(':checked')){
      console.log(cellView.model.attr('.connection/decreasing'))
      if(cellView.model.attr('.connection/decreasing') == false){
        cellView.model.removeAttr('.connection')
        cellView.model.attr(attrs.linkDecrease)
      }
      else if(cellView.model.attr('.connection/decreasing') == true){
        console.log("i'm true")
        cellView.model.removeAttr('.connection')
        cellView.model.attr(attrs.linkDefault)
      }
  }
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

var changeLinkMode;
$('#opt-change-link').on('change', function(evt){
    changeLinkMode = $(evt.target).is(':checked');
});

$('#button-save').click(function(evt){

    var outtext = "var model = " + JSON.stringify(model, null, 4);
    outtext = outtext + "\n" + "var m = " + JSON.stringify(saveLinks(), null, 4)
    outtext = outtext + "\n" + "var dlinks = " + JSON.stringify(saveDLinks(), null, 4)
    $('#out-text-area').val(outtext)
          //$('#out-text-area').val()
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

function saveDLinks(){
  var result = []
  _.each(graph.getLinks(), function(link){
    if(link.attr('.connection/decreasing')==true){

      var source = link.get('source').id;
      var target = link.get('target').id;
      result.push(source+'@'+target);
    }
  });
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


    }
});
