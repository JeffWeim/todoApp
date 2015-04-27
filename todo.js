// This example was created following the example in Jon Ducketts's Javascript & jQuery book


$(document).ready(function() {

  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                 // item is an empty string
  $list = $('ul');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  $newItemButton = $('#newItemButton');          // Cache button to show form
  $clearForm = $('#clearForm');


  $('li').hide().each(function(index) {          // Hide list items
    $(this).delay(450 * index).fadeIn(1600);     // Then fade them in
  });


  // ITEM COUNTER
  function updateCount() {                       // Create function to update counter
    var items = $('li[class!=complete]').length; // Number of items in list
    $('#counter').text(items);                   // Added into counter circle
  }
  updateCount();                                 // Call the function


  // SETUP FORM FOR NEW ITEMS
  $newItemButton.show();                         // Show the button
  $newItemForm.hide();                           // Hide the form
  $clearForm.hide();
  $('#showForm').on('click', function() {        // When click on add tem button
    $newItemButton.hide();                       // Hide the button
    $newItemForm.show();                         // Show the form
    $clearForm.show();
  });



  // SAVING LIST IN LOCAL STORAGE
  $('#add').click( function() {                           // User clicks add button
   var Description = $('input:text').val();               // Variable 'Description' equals input from text box

   $('#todos').append("<li>" + Description + "</li>");    // Append to the Ul 'todos' a Li item w/ var 'Description'
   $('#newItemForm')[0].reset();                          // Reset the form 'newItemForm'
  
   var todos = $('#todos').html();                        // Create variable 'todos', set equal to content in UL 'todos'
   localStorage.setItem('todos', todos);                  // In local storage, set var 'todos' to an object named 'todos'

   updateCount();                                         // Update the list counter
   return false;                                          // Stop reloading of the page
  });

  if(localStorage.getItem('todos')) {                     // If local storage has object 'todos' then...
  $('#todos').html(localStorage.getItem('todos'));        // ...In the UL 'todos' set as html content from local storage the object 'todos' 
  updateCount();                                          // Update the list counter
  }

  $('#clear').click( function() {                         // When buttun 'clear' is clicked run function...
  window.localStorage.clear();                            // for the users browser, clear the local storage
  location.reload();                                      // Reload the page from cache
  updateCount();                                          // Update the list counter
  return false;                                           // stop page from relaoding again
  });


  // USER CLICK HANDLING
  $list.on('click', 'li', function() {
    var $this = $(this);                                                            // Cache the element in a jQuery object
    var complete = $this.hasClass('complete');                                      // Is item complete

    if (complete === true) {                                                        // Check if item is complete in the html
      var listToDoItemsHtml = localStorage.getItem('todos');                        // variable equal to all html in local storage
      var completedToDoListItemHtml = '<li>'+$(this).text()+'</li>';                // set variable equal to what user clicked as completed
      listToDoItemsHtml = listToDoItemsHtml.replace(completedToDoListItemHtml, ""); // var now equals a find what the user clicked on in local storage & replace w/ blank
      localStorage.setItem('todos', listToDoItemsHtml);                             // update local storage with new html, getting rid of removed item

      $this.animate({                                                               // If so, animate opacity + padding
        opacity: 0.0,
        paddingLeft: '+=180'
      }, 500, 'swing', function() {                                                 // Use callback when animation completes
        $this.remove();                                                             // Then completely remove this item
        updateCount();
      });
    } else {                                                                        // Otherwise indicate it is complete
      item = $this.text();                                                          // Get the text from the list item
      $this.remove();                                                               // Remove the list item
      $list                                                                         // Add back to end of list as complete
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);                                                        // Hide it so it can be faded in
      updateCount();                                                                // Update the counter
    }                                                                               // End of else option
  });                                                                               // End of event handler

});