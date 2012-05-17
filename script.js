
/* Add a task */
function add() {
  var value = $('#add-task').val();
  if (value) {
    var key = 'task' + localStorage.length;
    localStorage[key] = value;
    $('#tasks').prepend(
      '<li id="' + key + '">' +
      '<a href="#" class="check">&nbsp;</a>' +
      '  ' +
      '<span class="value">' + value + '</span>' +
      '</li>'
    );
    $('#add-task').val('');
    notify();
  }
  $('#add-task').focus();
}

/* Remove a task */
var removing = false;

function remove(task) {
  if (removing) return;
  removing = true;
  var key = task.id;
  $('#' + key).fadeOut(300, function() {
    this.parentNode.removeChild(this);
    update();
    notify();
    removing = false;
  });
  $('#add-task').focus();
}

function update() {
  var tasks = $('#tasks').get(0).childNodes;
  for (var i = 0; i < tasks.length; i++) {
    var key = 'task' + (tasks.length - i - 1);
    localStorage[key] = tasks[i].childNodes[2].textContent;
    tasks[i].id = key;
  }
  localStorage.removeItem('task' + tasks.length);
}

/* Notification 
	Reference: http://code.google.com/chrome/extensions/dev/browserAction.html#method-setBadgeText
 */
function notify() {
  chrome.browserAction.setBadgeText({
    text: localStorage.length ? localStorage.length + '' : '' // does length exist, if yes display length; else display nothing
  });
}

$(document).ready(function() {


      if($.cookie("css")) {
         $("link").attr("href",$.cookie("css"));
      }
   
      $("#nav a").click(function() { 
         $("link").attr("href",$(this).attr('rel'));
         $.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
         return false;
      });
  




  for (var i = localStorage.length - 1; i >= 0; i--) {
    var key = 'task' + i;
    var value = localStorage[key];
    $('#tasks').append(
      '<li id="' + key + '">' +
      '<a href="#" class="check">&nbsp;</a>' +
      ' ' +
      '<span class="value">' + value + '</span>' +
      '</li>'
    );
  }
  $('#add-task').keyup(function(e) {
    if (e.keyCode == 13) add();
  });
  $('#add-task').focus();
  
  $('.check').live('click', function(e) {
    this.parentNode.className = 'removing';
    remove(this.parentNode);
  });
  $('#tasks').sortable({
    forcePlaceholderSize: true,
    opacity: .8,
    distance: 5,
    scroll: false,
    containment: 'document',
    axis: 'y',
    items: 'li',
    tolerance: 'pointer',
    update: update
  });
});
