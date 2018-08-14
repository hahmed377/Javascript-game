// load the jquery after the page has been loaded.
$(document).ready(function(){
var player = 1;
var randomPosition = Math.floor(Math.random() * 34);
var array = [];
var score = 0;
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


  ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => alert(`Page has started: ${value}.`));

  function ProgressCountdown(timeleft, bar, text) {
    for (var i = 0; i < 6; i++) {
      randomPosition = Math.floor(Math.random() * 34);
      $('#square' + randomPosition).append("<div class='battleShip'></div>");
       $(".battleShip").addClass('o');
    }
  //   for (var i = 0; i < $('.cell').length; i++) {
  //     $('.cell')[i].removeClass('o');
  // }


  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;
      $('#bar').value = timeleft;
      document.getElementById(text).textContent = timeleft;



      if (timeleft <= 0) {
        $('.cell').on("click", function(){
          if ($(this).hasClass("x")||$(this).hasClass("o"))
          {
            alert("You've already shot at this location, cap'n");
          }  if (player == 1) {
              $(this).addClass("x");


            }

        })
        clearInterval(countdownTimer);
        $('p').show();

        $('#pageBeginCountdown').hide();
        $('h6').show();
        $('o').hide();

        if (timeleft < 1) {
              $('.battleShip').removeClass('o');
              $('.battleShip').click(function(event){
                score += 10;
                $(".score").html("score: " + score);
                // $("score" + score =+ 10);
                alert("hit you  " + score)
              })
        }
      }
    }, 1000);
  });

  }
// score board


})
