
var myForEach = function(collection, f) {
  for (var i = 0; i < collection.length; ++i) {
    f(collection.item(i));
  }
}

var weights = 
  { "fat": 29
  , "carb": 17
  , "protein": 17
  }

var getPercents = function()
{
  var values = new Array();
  var sliders = document.getElementsByClassName("slider");
  var sum = 0.0;
  myForEach(sliders, function(slider) {
    var value = slider.value * weights[slider.id];
    values.push(value);
    sum += parseFloat(value);
  });

  return values.map(x => x / sum);
}

var colors = ["#0000ff", "#00ff00", "#ff0000"];

var drawPercents = function(percents)
{
  var c = document.getElementById("chart");
  var ctx = c.getContext("2d");
  var cur = 0;
  var radius = 140;
  var cx = 150;
  var cy = 150;

  ctx.clearRect(0, 0, 300, 300);

  for (var i = 0; i < percents.length; i++)
  {
    ctx.fillStyle = colors[i%colors.length];
    ctx.strokeStyle = colors[i%colors.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius*Math.cos(cur), cy + radius*Math.sin(cur));
    let arcLen = percents[i]*2*Math.PI;
    ctx.arc(cx, cy, radius, cur, cur + arcLen);
    ctx.lineTo(cx, cy);
    ctx.fill(); 
    cur += arcLen;
  }
}
