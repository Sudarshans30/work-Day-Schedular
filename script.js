
$(document).ready(function() {
  
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  
  setInterval(function() {
    updateTimeBlocks();
  });

  
  loadEvents();

  $(".saveBtn").on("click", function() {
    var timeBlockId = $(this).parent().attr("id");
    var eventText = $(this)
      .siblings(".description")
      .val();
    saveEvent(timeBlockId, eventText);
  });
});


// INCREASING TIME BLOCKS BY USING FOR LOOP
for (let i = 10; i <= 17; i++) {
 
  const timeBlock = document.createElement("div");
  timeBlock.classList.add("row", "time-block");
  timeBlock.id = `hour-${i}`;


  const hour = document.createElement("div");
  hour.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
  hour.innerHTML = `${i}AM`;
  timeBlock.appendChild(hour);

  let displayPeriod = "AM";
  if (i >= 12) {
    displayPeriod = "PM";
  }

  let displayHour = i;
  if (i > 12) {
    displayHour -= 12;
  }
  hour.innerHTML = `${displayHour}${displayPeriod}`;
  timeBlock.appendChild(hour);

  
  const textarea = document.createElement("textarea");
  textarea.classList.add("col-8", "col-md-10", "description");
  textarea.rows = 3;
  timeBlock.appendChild(textarea);

 
  const saveButton = document.createElement("button");
  saveButton.classList.add("btn", "saveBtn", "col-2", "col-md-1");
  saveButton.setAttribute("aria-label", "save");
  saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';
  timeBlock.appendChild(saveButton);

  
  const container = document.querySelector(".container-fluid");
  container.appendChild(timeBlock);
}


function updateTimeBlocks() {

  var currentHour = moment().hours();

  $(".time-block").each(function() {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("present future");
    }
    else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
      $(this).removeClass("past future");
    }
  
    else {
      $(this).addClass("future");
      $(this).removeClass("past present");
    }
  });
}

function saveEvent(timeBlockId, eventText) {

  localStorage.setItem(timeBlockId, eventText);
}

function loadEvents() {
 
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var eventText = localStorage.getItem(timeBlockId);

    if (eventText) {
      $(this)
        .find(".description")
        .val(eventText);
    }
  });
}








