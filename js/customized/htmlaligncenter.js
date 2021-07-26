function windowResize() {
    winW = window.innerWidth;
    winH = window.innerHeight;


/*
var w = window.innerWidth;
var h = window.innerHeight;

if (document.body && document.body.offsetWidth) {
   w = document.body.offsetWidth; 
   h = document.body.offsetHeight;
}

if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) { 
   w = document.documentElement.offsetWidth; 
   h = document.documentElement.offsetHeight;
}

if (window.innerWidth && window.innerHeight) { 
   w = window.innerWidth; 
   h = window.innerHeight;
}
*/
    $("#svgcontent").css("position", "absolute");

    // console.log(winH, $("#svgcontent").height());

     if (winH > $("#svgcontent").height()) {
         $("#svgcontent").css("top", (winH / 2) - ($("#svgcontent").height() / 2)-50);
     } else {
         $("#svgcontent").css("top", 0);
     }

     if (winW > $("#svgcontent").width()) {
         $("#svgcontent").css("left", (winW / 2) - ($("#svgcontent").width() / 2)-50);
     } else {
         $("#svgcontent").css("left", 0);
     }

//    $("#svgcontent").css("top", 20);
//    $("#svgcontent").css("left", 65);


}
window.addEventListener("resize", windowResize, false);
windowResize();
