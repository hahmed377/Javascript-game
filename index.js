// load the jquery after the page has been loaded.
$(document).ready(function(){

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
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        $('p').hide();
        $('#pageBeginCountdown').hide();
        $('h6').show();
      }
    }, 1000);
  });
}
})
