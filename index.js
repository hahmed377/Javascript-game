// load the jquery after the page has been loaded.
$(document).ready(function(){

$(".grid1").hide();
$('h2').hide();
$('p').hide();

$('#Startgame').click(function(){
  if ($(this).text().toLowerCase()== 'start game') {
  $('button').hide();
  $('.grid1').show();
  $('h1').hide();
  $('h2').hide();
}
})
$('#Instructions').click(function(){
  if ($(this).text().toLowerCase()== 'instructions') {
    $('h2').show();
    $('p').show();
    $('button').hide();
    $('.grid').hide();
    $('h1').hide();
  }
})




})
