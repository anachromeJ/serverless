var CUSTOMER_GET_URL =  'https://k58s2zp6g8.execute-api.us-east-1.amazonaws.com/beta/customers/';

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
		setTimeout(function () {
        if (window.location.href.endsWith("login")) {
        $(document).ready(function() {
            $.ajax({
                type: "GET",
                url: CUSTOMER_GET_URL + sessionStorage.email,
                success: function(response) {
                    console.log("ajax success");
                    window.location.href = "#/content";
                },
                error: function(response) {
                    console.log("ajax error");
                    window.location.href = "#/register";
                }
            });
        });
        }
			   
		}, 500); //will call the function after 2 secs.

	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1813637445561754',
		cookie     : true,  // enable cookies to allow the server to access 
		// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.8' // use graph api version 2.8
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	FB.api('/me', { fields: 'first_name, last_name, email' }, 
         function(response) {
		         console.log('Successful login for: ' + response.email);
             sessionStorage.first_name = response.first_name;
             sessionStorage.last_name = response.last_name;
             sessionStorage.email = response.email;
	       });
}

// Only works after `FB.init` is called
function myFacebookLogin() {
	FB.login(function(response){
		statusChangeCallback(response)  
	}, {scope: 'public_profile,email'});
}

// Only works after `FB.init` is called
function myFacebookLogout() {
   FB.logout(function(response) {
		  // user is now logged out
		});
   setTimeout(function () {
       window.location.href = "#/login"; //will redirect to your blog page (an ex: blog.html)
    }, 500); //will call the function after 2 secs.
}

