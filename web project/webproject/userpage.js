//pop up button
function openFormRegister() {
    document.getElementById("RegisterForm").style.display = "block";
  }
  function openFormLogin() {
    document.getElementById("LoginForm").style.display = "block";
  }
  function closeFormRegister() {
    document.getElementById("RegisterForm").style.display = "none";
  }
  function closeFormLogin() {
    document.getElementById("LoginForm").style.display = "none";
  }
//hide button when login
//setcookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  //get cookie
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  //sign out
  function signout(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
  }
  //check cookie
    var user=getCookie("username");
    if (user != "") {
        document.getElementById("LoginButton").disabled =true;
        document.getElementById("LoginButton").style.background="gray";
        document.getElementById("SignupButton").disabled= true;
        document.getElementById("SignupButton").style.background="gray";
        document.getElementById("signoutButton").disabled =false;
        document.getElementById("userpagebutton").disabled =false; 
    }
    else
    {
      document.getElementById("signoutButton").disabled =true;
      document.getElementById("signoutButton").style.background="gray";
      document.getElementById("userpagebutton").disabled =true;
      document.getElementById("userpagebutton").style.background="gray";
    }

  // Function to send login data.
  $(function() {
    var request;
    //var $submitActors = $("#MyForm").find("input[type=submit]");
    $("#loginButton").click(function(event) {
        event.preventDefault();
        var $form = $("#MyForm");
      
        var serializedData = $form.serialize();

        // Send data to login.php
        request = $.ajax({
            url: "login.php",
            type: "post",
            data: serializedData
        });

        // Receive data
        request.done(function(response, textStatus, jqXHR){
            if (response == "Login Success") {
                console.log("Login OK");
                alert(response);
                name = document.getElementById("name").value;
                console.log(name);
                setCookie("username", name, 30);
                window.location.href='userpage.html';
                //document.getElementById("LoginForm").style.display = "none";
            }
            else {
                console.log("Login Failed");
                alert(response);
            }
        });
        
    });
})
//display username:
var user=getCookie("username");
document.getElementById("username").innerHTML = user;

//---------------------------------------------------------------
//Display Review Section
function showUser() {
  var str= getCookie("username");
    if (str == "") {
        document.getElementById("userview").innerHTML = "";
        return;
    } else { 
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("userview").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","getuserreview.php?q="+str,true);
        xmlhttp.send();
    }
}
//search bar:
$(document).ready(function(){
  $('.searchbar input[type="text"]').on("keyup input", function(){
      /* Get input value on change */
      var inputVal = $(this).val();
      var resultDropdown = $(this).siblings(".result");
      if(inputVal.length){
          $.get("search.php", {term: inputVal}).done(function(data){
              // Display the returned data in browser
              resultDropdown.html(data);
          });
      } else{
          resultDropdown.empty();
      }
  });
  
  // Set search input value on click of result item
  $(document).on("click", ".result p", function(){
      $(this).parents(".searchbar").find('input[type="text"]').val($(this).text());
      $(this).parent(".result").empty();
  });
});