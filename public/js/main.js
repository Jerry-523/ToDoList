let session = document.cookie.split("; ").find((row) => row.startsWith("session=")) ?.split("=")[1]; // Get session ID
if (session) { // If session exists in cookie
    // Send POST request to mainpage
    $.post({
        url: "/mainpage",
        data: {
            session: session
        },
        // When response received
        success: (res) => {
            if (res['success']) { // If request succeeeded
                // Get data from response
                let firstName = res['firstname'];
                let lastName = res['lastname'];
                let email = res['email'];

               
            }
            else {
                // Send POST request to clearsession
                $.post({
                    url: '/clearsession',
                    data: {
                        session: session
                    },
                    success: (res) => {
                        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Delete cookie by expiring it
                        location.href = "login.html"; // Return to login page
                    }
                }); 
            }
        }
    });
}



// When logout button clicked
$('.logout-button').click(() => {
    // Send POST request to clearsession
    $.post({
        url: '/clearsession',
        data: {
            session: session
        },
        success: (res) => {
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Delete cookie by expiring it
            location.href = "login.html"; // Return to login page
        }
    });
});

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
} 
