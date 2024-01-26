var saveButton = $('.saveBtn');
var timeBlock = $('.time-block');

$(document).ready(function () {
  //Function to listen for click events on the save button and save any tasks to localStorage
  saveButton.on('click', function () {
    var blockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(blockId, userInput);
  });

  //Get Current Time
  var currentHour = new Date().getHours();

  //Function to set background colors based on past, present, or future time blocks
  timeBlock.each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  //Function to retrieve and set values from localStorage
  $('.time-block textarea').each(function() {
    var blockId = $(this).closest('.time-block').attr('id');
    var savedInput = localStorage.getItem(blockId);
    if (savedInput !== null) {
      $(this).val(savedInput);
    }
  });

  //Function to dynamically display and update the current date and time in the header of the page.
  function updateCurrentTime() {
    var currentDT = dayjs().format('dddd MMMM D, YYYY' + ' -' + ' hh:mm:ss a');
    $('#currentDay').text(currentDT);
    setInterval(updateCurrentTime, 1000);
  }
  updateCurrentTime();
});