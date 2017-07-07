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

  var rideColor = $("#ride-color").val().trim();
  var rideDestination = $("#ride-destination").val().trim();
  var rideFirstTime = moment($("#ride-firstTime").val().trim(), "DD/MM/YY").format("X");
  var rideFrequency = $("#ride-frequency").val().trim();
  var rideArrival = $("#ride-arrival").val().trim();
  var rideAway = $("#ride-away").val().trim();

  var newRide = {
  	Color: rideColor,
	destination: rideDestination,
	frequency: rideFrequency,
	arrival: rideArrival,
	away: rideAway,
  };

  database.ref().push(newRide);

  console.log(newRide.color);
  console.log(newRide.destination);
  console.log(newRide.frequency);
  console.log(newRide.arrival);
  console.log(newRide.away);