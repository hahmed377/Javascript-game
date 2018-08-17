// load the jquery after the page has been loaded.
$(document).ready(function(){
  // player set a one. Will be used to switch between two players.
  var player = 1;
  // this will set random ships on the grid.
  var randomPosition = Math.floor(Math.random() * 34);
  // used to hold the array of the position
  var array = [];
  // div created inside cell to contain the ships.
  var battleShip = $('battleShip')
  var minClick = 6;
  var score = 0;
  var score2 = 0;
  var attempts = 10;
  var highScore = 0;
  var name;
  // hides everything from the home page.
  $(".grid1").hide();
  $('h2').hide();
  $('p').hide();
  $('#pageBeginCountdown').hide();
  $('h5').hide();
  $('h6').hide();
  $("p.textinhome").show();
  $(".leaderboards").hide();
  $(".LeaderboardsForPlayer").hide();
  $("#winner").hide();

// once the start button get clicked on the timer starts.
  $('#Startgame').click(function(){
    if ($(this).text().toLowerCase()== 'start game') {
      // hide and shows elements to fit the page
      $('button').hide();
      $('.grid1').show();
      $('h1').hide();
      $('h2').hide();
      $('#pageBeginCountdown').show();
      $('p').show();
      $('p.textinInstructions').hide();
      $("p.textinhome").hide();
      $('.name').hide();
      $('#fname').hide();
      $(".leaderboards").hide();
      $("#leaderboards").hide();
      $("#winner").hide();
      // function called to allocate random positions to the grid.
      progressCountdown(5, 'pageBeginCountdown', 'pageBeginCountdownText');
      makingGrid();
    }
  })

  $('#Instructions').click(function(){
    // after clicking instructions show instructions and hide other elements.
    if ($(this).text().toLowerCase()== 'instructions') {
      $('h2').show();
      $('p').hide();
      $("#Instructions").hide();
      $('#Startgame').show();
      $('.grid').hide();
      $('h1').hide();
      $('.name').hide();
      $('#fname').hide();
      $('p.textinInstructions').show();
      $("#leaderboards").hide();
      $(".leaderboards").hide();
      $(".LeaderboardsForPlayer").hide();
      $("#winner").hide();
    }
  })
  // same with leaderboards. Hides everything expect for the new scores and called the function which will displays the score.
  $('#leaderboards').click(function(){
    $('h2').hide();
    $('p').hide();
    $("#Instructions").hide();
    $('#Startgame').hide  ();
    $('.grid').hide();
    $('h1').hide();
    $("h6").hide();
    $('.grid').hide();
    $('p.textinInstructions').hide();
    $("#leaderboards").hide();
    $(".leaderboards").show();
    $(".LeaderboardsForPlayer").show();
    displayScore();
  })
  // this function will reset after the attempts runs out for the first player. It will reset the score and attempts back.
  function reset() {
    $('#pageBeginCountdown').show();
    $("div.battleShip").removeClass("x");
    $("div.battleShip").remove();
    $("td.cell").removeClass("x");
    attempts = 10;
    score = 0;
    $("#score").html("score: " + score);
    progressCountdown(5, 'pageBeginCountdown', 'pageBeginCountdownText');
  }
  // This function creates random battleship in the cells.
  var positionArray = [];
  function makingGrid() {
    for (var i = 0; i < 14; i++) {
      randomPosition = Math.floor(Math.random() * 34);
      positionArray.push(randomPosition);
      $('#square' + randomPosition).append("<div class='battleShip'></div>");
      $(".battleShip").addClass('o');
    }
  }
  // disables clicks after attempts hits zero to stop it keep going.
  function disableClicks() {
    if (attempts == 0) {
      $('.cell').off("click");
    };
  }
  // this function hides the page after the clear interval
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
        // add event to increment score by 10 everytime a player has hit the ship.
          score += 10;
          $("#score").html("score: " + score);
          if ($(this).hasClass("x")) {
              $('.battleShip').off("click");
          }
          $(this).addClass("x");
        // this will add the class x after the ship is clicked on
      });
    };
  }
  // this will retrieve the item from local storage and added to a list.
  function displayScore() {
    for (var i = 1; i < 3; i++) {
      $(".leaderboards").append("<li>"+localStorage.getItem(i)+"</li>");
    }
  }

  function progressCountdown(timeleft, bar, text) {
    $(".cell").off("click");
    var countdownTimer = setInterval(() => {
      timeleft--;
      $('#bar').value = timeleft;
      document.getElementById(text).textContent = timeleft;
      if (timeleft < 1) {
        //turns click on
        $('.cell').on("click", function(event){
          // when the player switches to player 2 and runs out of turns, shows which player wins
          if (player == 2 && attempts == 0) {
            if (localStorage.getItem(1)>localStorage.getItem(2)) {
              $("#winner").empty().text("Player 1 wins");
              $("#winner").show();
            }else if (localStorage.getItem(1)<localStorage.getItem(2)) {
              $("#winner").empty().text("Player 2 wins");
              $("#winner").show();
              }
            //calls the function display.
            displayScore();
          }
          // when attempts is greater than start to decrementing attempts from 10 until 0.
          if (attempts > 0) {
            attempts--;
            $(".attempts").html("attempts:" + attempts);
          }
          else{
            // using the localStorage to set a key and value to save the values.
            localStorage.setItem(""+ player+"",score);
            $(this).addClass("x");
            player = 2;
            console.log(player);
            reset();
            disableClicks();
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
