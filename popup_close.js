// Get the modal
var modal = document.getElementById('login-popup');
var modal2 = document.getElementById('signup-popup');
var modal3 = document.getElementById('forgotpass-popup');
var cancel1 = document.getElementById('cancelbutton');
var cancel2 = document.getElementById('cancelbutton2');
var cancel3 = document.getElementById('cancelbutton3');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == cancel1) {
        modal.style.display = "none";
    }
    else if (event.target == modal2 || event.target == cancel2) {
        modal2.style.display = "none";
    }

    else if (event.target == modal3 || event.target == cancel3) {
        modal3.style.display = "none";
    }

    else if(modal3.style.display == "block"){
      modal.style.display = "none";
    }
}
