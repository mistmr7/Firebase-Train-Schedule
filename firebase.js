$(document).ready(function() {

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyBnGO0TJakV0GqoO-K93ta1Z_ukpQXXidU",
        authDomain: "train-schedule-c4e61.firebaseapp.com",
        databaseURL: "https://train-schedule-c4e61.firebaseio.com",
        projectId: "train-schedule-c4e61",
        storageBucket: "train-schedule-c4e61.appspot.com",
        messagingSenderId: "962326258316"
    };
    firebase.initializeApp(config);

    let database = firebase.database()
    let clickCounter = 0
  
    $('#formSubmit').on('click', function(e){
        e.preventDefault()
        console.log(e)
        clickCounter++

        database.ref().set({
          clickCount: clickCounter
      })
  })
})


   
