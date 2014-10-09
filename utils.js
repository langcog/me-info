//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

getCurrentDate = function() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return (month + "/" + day + "/" + year);
}

//currently not called; could be useful for reaction time?
getCurrentTime = function() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10) minutes = "0" + minutes;
  return (hours + ":" + minutes);
}

createDot = function(dotx, doty, i, tag) {
  var dots;
  if (tag === "smiley") {
    dots = ["smiley1", "smiley2", "smiley3", "smiley4", "smiley5"];
  } else {
    dots = [1, 2, 3, 4, 5];
  }

  var dot = document.createElement("img");
  dot.setAttribute("class", "dot");
  dot.id = "dot_" + dots[i];
  if (tag === "smiley") {
    dot.src = "dots/dot_" + "smiley" + ".jpg";
  } else {
    dot.src = "dots/dot_" + dots[i] + ".jpg";
  }

    var x = Math.floor(Math.random()*950);
    var y = Math.floor(Math.random()*540);

    var invalid = "true";

    //make sure dots do not overlap
    while (true) {
      invalid = "true";
      for (j = 0; j < dotx.length ; j++) {
        if (Math.abs(dotx[j] - x) + Math.abs(doty[j] - y) < 250) {
          var invalid = "false";
          break;
        }
    }
    if (invalid === "true") {
      dotx.push(x);
          doty.push(y);
          break;
      }
      x = Math.floor(Math.random()*400);
      y = Math.floor(Math.random()*400);
  }

    dot.setAttribute("style","position:absolute;left:"+x+"px;top:"+y+"px;");
    training.appendChild(dot);
}

function range(start, end){
    var foo = [];
    for (var i = start; i <= end; i++)
        foo.push(i);
    return foo;
}