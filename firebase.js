$(document).ready(function() {


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
  
    $('#formSubmit').on('click', function(e){
        e.preventDefault();
        console.log('clicked');
  
        database.ref().push({
            trainName: $('[name=trainName]').val(),
            destination: $('[name="destinationName"]').val(),
            firstTrainTime: $('[name="firstTrainTimeName"]').val(),
            frequency: $('[name="frequencyName"]').val()
        });
  
        trainSchedule.push({
            trainName: $('[name=trainName]').val(),
            destination: $('[name="destinationName"]').val(),
            firstTrainTime: $('[name="firstTrainTimeName"]').val(),
            frequency: $('[name="frequencyName"]').val()
        });
  
      document.querySelectorAll('.form-control').innerHTML = ''
    })
  
    database.ref().on('child_added', function (e){
        var train = e.val();
          trainSchedule.push(train);
          renderTrains();
    })
  
  
  
  var trainSchedule = [{trainName: "Oregon Express", destination: "Salem", firstTrainTime: "06:00", frequency: 40},
                        {trainName: "Silver Bullet", destination: "Denver", firstTrainTime: "04:00", frequency: 30},
                        {trainName: "Raleigh Slowpoke", destination: "Charlotte", firstTrainTime: "08:00", frequency: 180},
                        {trainName: "NYC Express", destination: "Manhattan", firstTrainTime: "03:30", frequency: 3}]


  renderTrains()

    function renderTrains () {
        $('tbody').empty();
        
        for (var i=0; i < trainSchedule.length; i++) {
            var row = $("<tr>");
            var td1 = $("<td>").text(trainSchedule[i].trainName);
            var td2 = $("<td>").text(trainSchedule[i].destination);
            var tStart = trainSchedule[i].firstTrainTime;
            var tFrequency = trainSchedule[i].frequency
            var tStart = trainSchedule[i].firstTrainTime
            var tStartConverted = moment(tStart, "HH:mm").subtract(1, 'years')
            var currentTime = moment()
            var diffTime = moment().diff(moment(tStartConverted), "minutes")
            var tRemainder = diffTime % tFrequency
            var tMinutesTilTrain = tFrequency - tRemainder
            var nextTrain = moment().add(tMinutesTilTrain, "minutes").format('HH:mm')
            var td3 = $('<td>').text(tFrequency)
            var td4 = $('<td>').text(nextTrain)
            var td5 = $('<td>').text(tMinutesTilTrain)
        
            row.append(td1).append(td2).append(td3).append(td4).append(td5);
            $("tbody").append(row);
        }
    }
   

})
