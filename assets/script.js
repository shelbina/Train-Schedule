  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtECePXJqVoO41uugGphChqU6yaqNfUls",
    authDomain: "train-schedule-7e2d5.firebaseapp.com",
    databaseURL: "https://train-schedule-7e2d5.firebaseio.com",
    projectId: "train-schedule-7e2d5",
    storageBucket: "train-schedule-7e2d5.appspot.com",
    messagingSenderId: "510048271940"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();
    //take user input
    var rideColor = $("#ride-color").val().trim();
    var rideDestination = $("#ride-destination").val().trim();
    var rideFirstTime = moment($("#ride-firstTime").val().trim(), "DD/MM/YY").format("X");
    var rideFrequency = $("#ride-frequency").val().trim();
    //local object to store data
    var newRide = {
    Color: rideColor,
  	destination: rideDestination,
    firstTime:rideFirstTime,
  	frequency: rideFrequency,
    };
    //upload to database
    database.ref().push(newRide);
    //log to console
    console.log(newRide.color);
    console.log(newRide.destination);
    console.log(newRide.firstTime);
    console.log(newRide.frequency);

    //alert
    alert("Your ride has been added!")
    //clear text input
    $("#ride-color").val("");
    $("#ride-destination").val("");
    $("#ride-firstTime").val();
    $("#ride-frequency").val();  
  });

//create event to add rides to firebase and row in html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  //store into the variable
  var rideColor = childSnapshot.val().color;
  var rideDestination = childSnapshot.val().destination;
  var rideFirstTime = childSnapshot.val().firstTime;
  var rideFrequency = childSnapshot.val().frequency;
  //calculate time in moment.js
  var timeDifference= moment().duff(moment(rideFirstTime, "hh:mm A"), "m");
  var timeRemaining = timeDifference % rideFrequency;
  var tMinutesTill = rideFrequency - timeRemaining;
  var nextRide = moment().add(tMinutesTill, "minutes").format("hh:mm");

  //next train
  console.log("Arrival Tile: " + moment(nextRide).format("hh:mm"));

  $(".table").append("<tr><td>" + ride + "</tr><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextRide + "</td><td>"
+ tMinutesTill + "</td><tr>");
});