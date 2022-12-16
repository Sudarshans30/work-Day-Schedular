$(document).ready(function() {
 
  var currentDate = moment().format('dddd, MMMM Do');

  $('#currentDay').text(currentDate);

  var currentHour = moment().format('H');

  $('.time-block').each(function() {
   
    var blockHour = $(this).attr('id').split('-')[1];

    var Hours = ["10", "11", "12", "13", "14", "15", "16", "17"];

  
    
    // CREATING ROW ELEMENTS
    for (i = 9; i < 17; i++) {
      var row = $("<div>");
      row.addClass("row time-block");
      var hour = $("<div>");
      if (Hours[i] > 12) {
        hour.addClass("col-2 col-md-1 hour text-center").text(Hours[i] - 12 + ":00");
        row.append(hour);
      } else {
        hour.addClass("col-2 col-md-1 hour text-center").text(Hours[i] + ":00");
        row.append(hour);
      }


    }

    if (blockHour < currentHour) {
      $(this).addClass('past');
    } 
    else if (blockHour == currentHour) {
      $(this).addClass('present');
    } 
    else {
      $(this).addClass('future');
    }
  });
});

$('.time-block').on('click', function() {
  
  var textarea = $(this).find('.description');

  
  textarea.focus();
});

$('.saveBtn').on('click', function() {
  
  var timeBlock = $(this).closest('.time-block');

  
  var hour = timeBlock.attr('id').split('-')[1];

  var event = timeBlock.find('.description').val();

  localStorage.setItem(hour, event);
});










