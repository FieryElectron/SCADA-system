function Palette(){
  var palette = [//!!!!!!!!!!
    "#000000", "#800000", "#008000", "#000080", "#808000",
		"#008080", "#808080", "#ff0000", "#00ff00",
		"#ffff00", "#0000ff", "#ff00ff", "#00ffff",
		"#ffffff", "transparent"
  ];

  var str = '<div class="palette_item transparent" data-rgb="none"></div>\
             <div class="palette_item black" data-rgb="#000000"></div>\
             <div class="palette_item white" data-rgb="#ffffff"></div>'
  palette.forEach(function(item, i){//!!!!!!!!!!
    str += '<div class="palette_item" style="margin-left:2px;width:30px;height:30px;background-color: ' + item + ';" data-rgb="' + item + '"></div>';
  });
  $('#palette').append(str);

  var toolStroke = document.getElementById('tool_stroke');
  var picking = false;

  $(document).on("mouseup", function(){picking = false;})

  $('#palette').on("mousemove mousedown touchstart touchmove", ".palette_item", function(evt){
    
    evt.preventDefault();
    if (evt.type === "mousedown" || evt.type === "touchstart") picking = true;
    if (!picking) return;

    var isStroke = toolStroke.classList.contains('active');
    var picker = isStroke ? "stroke" : "fill";
    var color = this.getAttribute('data-rgb');
    var paint = null;
    var noUndo = true;

    paint = color === 'none' 
      ? new $.jGraduate.Paint() 
      : new $.jGraduate.Paint({alpha: 100, solidColor: color.substr(1)});

    methodDraw.paintBox[picker].setPaint(paint);
    
    if (isStroke) {
      svgCanvas.setColor('stroke', color, noUndo);
      if (color != 'none' && svgCanvas.getStrokeOpacity() != 1) {
        svgCanvas.setPaintOpacity('stroke', 1.0);
      }
    } else {
      svgCanvas.setColor('fill', color, noUndo);
      if (color != 'none' && svgCanvas.getFillOpacity() != 1) {
        svgCanvas.setPaintOpacity('fill', 1.0);
      }
    }
  }).bind('contextmenu', function(e) {e.preventDefault()});
};

var palette = new Palette();


