var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var count = 0;
var audio = document.getElementById("audio");
var pp = document.getElementsByClassName("fa");
var arr = [
  15,
  97,
  17,
  74,
  62,
  49,
  46,
  42,
  12,
  41,
  18,
  32,
  28,
  10,
  99,
  42,
  44,
  89,
  5,
  28,
  54,
  54,
  92,
  93,
  87,
  10,
  72,
  85,
  41,
  9,
  6,
  51,
  59,
  62,
  66,
  30,
  35,
  47,
  85,
  71,
  58,
  55,
  57,
  32,
  14,
  43,
  24,
  88,
  72,
  68,
  22,
  66,
  26,
  61,
  39,
  85,
  98,
  56,
  58,
  10,
  74,
  19,
  72,
  51,
  5,
  2,
  48,
  18,
  69,
  85,
  88,
  44,
  53,
  50,
  72,
  50,
  32,
  82,
  48,
  28,
  18,
  7,
  80,
  64,
  45,
  61,
  59,
  67,
  11,
  47,
  69,
  49,
  92,
  72,
  9,
  96,
  11,
  11,
  82,
  27,
  84,
  43,
  99,
  80,
  68,
  72,
  65,
  34,
  83,
  71,
  94,
  98,
  65,
  28,
  90,
  13,
  45,
  47,
  48,
  42,
  50,
  39,
  27,
  5,
  49,
  1,
  69,
  27,
  76,
  51,
  87,
  32,
  92,
  45,
  43,
  21,
  57,
  7,
  52,
  34,
  61,
  27,
  70,
  96,
  22,
  45,
  81,
  32,
  41,
  69,
  95,
  37,
  1,
  65,
  47,
  26,
  1,
  21,
  73,
  14,
  20,
  72,
  62,
  18,
  36,
  5,
  11,
  94,
  86,
  45,
  53,
  76,
  62,
  89,
  47,
  48,
  76,
  86,
  150,
  41,
  15,
  83,
  67,
  52,
  54,
  73,
  51,
  20,
  94,
  80,
  100,
  95,
  74,
  4,
  61,
  55,
  81,
  80,
  77,
  71
];
var tags = ["Tag1", "Tag2", "Tag3", "Tag4"];
window.onload = function() {
  var width = 5;
  var currX = 0;
  var base = 300;
  var btn = document.getElementById("btn");
  btn.className = "fa fa-play";
  if (audio.duration === audio.currentTime) {
    console.log("audio.duration");
    audio.pause();
    btn.className = "fa fa-play";
    count = 0;
  }
  function btnListener() {
    if (count == 0) {
      btn.className = "fa fa-pause";
      audio.play();
      count = 1;
    } else {
      btn.className = "fa fa-play";
      audio.pause();
      count = 0;
    }
  }

  btn.addEventListener("click", btnListener);

  ctx.fillStyle = "lightgrey";
  var cnt = 0;
  var txt=10
  for (var i = 0; i < arr.length; i++) {
    var h = arr[i];
    if (h % 11 == 0 && cnt < 4) {
      ctx.font = "13pt sans-serif";
      ctx.strokeStyle = "lightgrey";
      ctx.strokeText(tags[cnt++], txt, 130);
    }
    ctx.fillRect(currX, base - h, width, h);
    currX += width;
    txt=txt+20
   
  }
  audio.addEventListener("timeupdate", function() {
    var duration = audio.duration;
    var completedPer = (audio.currentTime / audio.duration) * 100;
    var barsNum = (200 / 100) * completedPer;
    var decimals = barsNum - Math.floor(barsNum);
    if (decimals >= 0.5) {
      barsNum = Math.floor(barsNum) + 1;
    } else {
      barsNum = Math.floor(barsNum);
    }
    if (duration > 0) {
      ctx.clearRect(0, 0, width, h);
      var width = 5;
      var currX = 0;
      var base = 300;
      for (var i = 0; i < arr.length; i++) {
        var h = arr[i];

        if (i <= barsNum) {
          ctx.fillStyle = "hotpink";
        } else {
          ctx.fillStyle = "lightgrey";
        }
        ctx.fillRect(currX, base - h, width, h);
        currX += width;
      }
    }
  });

  canvas.onclick = function(e) {
    var pos = getMousePos(canvas, e);
    var x = pos.x;
    var y = pos.y;
    var index = (x / width) | 0;
    if (y >= 0 && y <= base && x < 1000) {
      var completedPer = 0.5 * (index + 1);
      var elaspedTime = (completedPer * audio.duration) / 100;
      audio.currentTime = elaspedTime;
    }
  };

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
};
