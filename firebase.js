$(document).ready(function() {

    // firebase configuration
    var config = {
        apiKey: "AIzaSyBnGO0TJakV0GqoO-K93ta1Z_ukpQXXidU",
        authDomain: "train-schedule-c4e61.firebaseapp.com",
        databaseURL: "https://train-schedule-c4e61.firebaseio.com",
        projectId: "train-schedule-c4e61",
        storageBucket: "train-schedule-c4e61.appspot.com",
        messagingSenderId: "962326258316"
    };

    // initialize firebase app
    firebase.initializeApp(config);

    // set the database to the firebase database
    let database = firebase.database()
  
    // on click, the form submit button:
    $('#formSubmit').on('click', function(e){
        // prevent the page from reloading
        e.preventDefault();
  
        // push the fields to th firebase database as an array of objects
        database.ref().push({
            trainName: $('[name=trainName]').val(),
            destination: $('[name="destinationName"]').val(),
            firstTrainTime: $('[name="firstTrainTimeName"]').val(),
            frequency: $('[name="frequencyName"]').val()
        });
        
        // push the fields to our array trainSchedule
        trainSchedule.push({
            trainName: $('[name=trainName]').val(),
            destination: $('[name="destinationName"]').val(),
            firstTrainTime: $('[name="firstTrainTimeName"]').val(),
            frequency: $('[name="frequencyName"]').val()
        });
        
      document.querySelectorAll('.form-control').innerHTML = ''
    })
    
    // on adding a child, callback that child to populate the train schedule
    database.ref().on('child_added', function (e){
        var train = e.val();
          trainSchedule.push(train);
          renderTrains();
    })
  
  
  // set a local array to start
  var trainSchedule = [{trainName: "Oregon Express", destination: "Salem", firstTrainTime: "06:00", frequency: 40},
                        {trainName: "Silver Bullet", destination: "Denver", firstTrainTime: "04:00", frequency: 30},
                        {trainName: "Raleigh Slowpoke", destination: "Charlotte", firstTrainTime: "08:00", frequency: 180},
                        {trainName: "NYC Express", destination: "Manhattan", firstTrainTime: "03:30", frequency: 3}]

    
  // rerender the schdule                         
  renderTrains()

     // method to render the train schedule call
    function renderTrains () {
        $('tbody').empty();
        
        // looping through the array of trains
        for (var i=0; i < trainSchedule.length; i++) {

            // set the row in html
            var row = $("<tr>");
            
            // set the first column to populate train name
            var td1 = $("<td>").text(trainSchedule[i].trainName);

            // set the second column to populate train destination
            var td2 = $("<td>").text(trainSchedule[i].destination);

            // set a start variable of the first train of the day
            var tStart = trainSchedule[i].firstTrainTime;

            // set the frequency for each train
            var tFrequency = trainSchedule[i].frequency

            // convert the start time to minutes and make it in the past so you can analyze it without errors
            var tStartConverted = moment(tStart, "HH:mm").subtract(1, 'years')

            // sets the current time
            var currentTime = moment()

            // calculates the difference in time from the start time to now
            var diffTime = moment().diff(moment(tStartConverted), "minutes")

            // calculates the remainder of the difference in time divided by the frequency of the trains
            var tRemainder = diffTime % tFrequency

            // calculates the time remaining until the next train
            var tMinutesTilTrain = tFrequency - tRemainder

            // sets the time the next train will arrive 
            var nextTrain = moment().add(tMinutesTilTrain, "minutes").format('HH:mm')

            // populates the third column with frequency of train arrival
            var td3 = $('<td>').text(tFrequency)

            // populates the fourth column with the time the next train will arrive
            var td4 = $('<td>').text(nextTrain)

            // populates the fifth column with the time until the next train arrives
            var td5 = $('<td>').text(tMinutesTilTrain)
        
            //append all columns to the table
            row.append(td1).append(td2).append(td3).append(td4).append(td5);
            $("tbody").append(row);
        }
    }
   

})
