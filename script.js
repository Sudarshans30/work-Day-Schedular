
$(document).ready(function() {
  
  $('#currentDay').text(moment().format('dddd, MMMM Do YYYY'));

  var hour = ["10","11","12","13","14","15","16","17"];

  for(i=0; i<hour.length; i++ ){
    var row = $("<div>");
    row.addClass("row time-block past");
    var hour =$("<div>");
    if(hour[i] > 12){
      hour.addClass("col-2 col-md-1 hour text-center py-3").text(hour[i]-12 +":00");
      row.append(hour);
      } else{
        hour.addClass("col-2 col-md-1 hour text-center py-3").text(hour[i]+ ":00");
        row.append(hour);
      }
  }

  
  $('.time-block').each(function() {
   
    var hour = $(this).attr('id').split('-')[1];

    
    if (hour < moment().hour()) {
    
      $(this).addClass('past');
    } else if (hour > moment().hour()) {
    
      $(this).addClass('future');
    } else {
  
      $(this).addClass('present');
    }
  });

  
  $('.saveBtn').click(function() {
    
    var text = $(this).siblings('.description').val();

    var hour = $(this).parent().attr('id').split('-')[1];

   
    localStorage.setItem(hour, text);
  });


  $(window).on('beforeunload', function() {
 
    $('.time-block').each(function() {

      var hour = $(this).attr('id').split('-')[1];

      var text = localStorage.getItem(hour);

      
      if (text) {
       
        $(this).find('.description').val(text);
      }
    });
  });
});