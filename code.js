$(function(){

var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
  .selector('core')
    .css({
    'active-bg-color':'#fff',
    'active-bg-opacity':0.333
  })
    .selector('node')
      .css({
        'height': 80,
        'width': 80,
        'font-size':20,
        'font-weight':'bold',
        'content':'data(id)',
        'text-wrap':'wrap',
        'text-valign': 'center',
      	'text-halign': 'center',
        'text-outline-color':'#fff',
        'text-outline-opacity':1,
        'text-outline-width':2,
        'overlay-color':'#fff',
        'background-color':'#FACD37'
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'text-rotation':'autorotate',
        'font-size':10
      })
      .selector('.faded')
        .css({
          'opacity':0.1,
          'text-opacity':0
        }),

    elements: retagEle,
      layout: {
        name: 'grid',
        directed: true,
        padding: 10
      }
    });

    function panIn(target) {
        cy.animate({
          fit: {
          eles: target,
          padding: 100
          }
        });
    }

var advanceButton = document.getElementById('start');
advanceButton.addEventListener('click',function(){
  var inputtext=document.getElementById('search').value;
 var target=cy.nodes('#'+inputtext);

target.select();
cy.center(target);
var len=cy.nodes().length;
var allnodes=cy.nodes();

    var node= target;
    var n=[];
    for(var i=1;i<10;i++){
      n[0]=node;
      n[i]=n[i-1].neighborhood().add(node);
    }
    cy.elements().addClass('faded');
    n[9].removeClass('faded');
    n[9].unlock();
    var layout = n[9].layout({name:'cose-bilkent'});
    layout.run();
    panIn(n[9]);
    //highlight selected node and its neighbours

//var target=allnodes[30];
  //the 31th node
// var text=target.id();
  // get the text value of a node
})


    cy.on('tap','node',function(e){
      var node= this;
      var n=[];

      for(var i=1;i<10;i++){
        n[0]=node;
        n[i]=n[i-1].neighborhood().add(node);
      }

      cy.elements().addClass('faded');
      n[9].removeClass('faded');
      n[9].unlock();
      var layout = n[9].layout({name:'cose-bilkent'});
      layout.run();
      panIn(n[9]);
    });

  }); // on dom ready
