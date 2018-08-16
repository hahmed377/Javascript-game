// load the jquery after the page has been loaded.
$(document).ready(function(){
  var player = 1;
  var randomPosition = Math.floor(Math.random() * 34);
  var array = [];
  var battleShip = $('battleShip')
  var minClick = 6;
  var score = 0;
  var score2 = 0;
  var attempts = 10;
  var highScore = 0;
  debugger;
  var battleShip = $('battleShip');
  $(".grid1").hide();
  $('h2').hide();
  $('p').hide();
  $('#pageBeginCountdown').hide();
  $('h5').hide();
  $('h6').hide();

  $('#Startgame').click(function(){
    if ($(this).text().toLowerCase()== 'start game') {
      $('button').hide();
      $('.grid1').show();
      $('h1').hide();
      $('h2').hide();
      $('#pageBeginCountdown').show();
      $('p').show();
      makingGrid();
    }
  })

  $('#Instructions').click(function(){
    if ($(this).text().toLowerCase()== 'instructions') {
      $('h2').show();
      $('p').hide();
      $('button').hide();
      $('.grid').hide();
      $('h1').hide();
    }
  })

  function countdown() {
    debugger;
    progressCountdown(5, 'pageBeginCountdown', 'pageBeginCountdownText');
  }

  function reset() {
    $('#pageBeginCountdown').show();
    $("div.battleShip").removeClass("x");
    $("div.battleShip").remove();
    $("td.cell").removeClass("x");
    attempts = 10;
    score = 0;
    debugger;
    countdown();
  }
var positionArray = [];
  function makingGrid() {
    countdown();
    for (var i = 0; i < 14; i++) {
      randomPosition = Math.floor(Math.random() * 34);
      positionArray.push(randomPosition);

      $('#square' + randomPosition).append("<div class='battleShip'></div>");
      $(".battleShip").addClass('o');
    }
  }
  function disableClicks() {
    if (attempts == 0) {
      attempts--;
      $('.cell').off("click");
    };
  }
  function hide() {
    $('p').hide();
    $('#score').show();
    $('.attempts').show();
    $('#pageBeginCountdown').hide();
    $('h6').show();
    $('o').hide();
  }
  function hideShips(timeleft) {
    if (timeleft < 1) {
      $('.battleShip').removeClass('o');
      $('.battleShip').click(function(event){
        if(player == 1){
          score += 10;
          // $("#score").html("score: " + score);
        }
      });
    };
  }
  function progressCountdown(timeleft, bar, text) {
    var countdownTimer = setInterval(() => {
      timeleft--;
      $('#bar').value = timeleft;
      document.getElementById(text).textContent = timeleft;
      //allowClick(timeleft);
      if (timeleft < 1) {
        //turns click on
        $('.cell').on("click", function(){
          if (attempts > 0) {
            attempts--;
            $(".attempts").html("attempts:" + attempts);
            disableClicks();
            //turns click off
          }
          //if clicked , alert
          if ($(this).hasClass("x")) {
            alert("You've already shot at this location, cap'n");
            $('.battleShip').off("click");
          }
          $(this).addClass("x");
          if (attempts < 1) {
            $('.cell').off("click");
            reset();
            makingGrid();
          }
        });
        clearInterval(countdownTimer);
        hide();
        hideShips(timeleft);
      }
    }, 1000);

  };
});
