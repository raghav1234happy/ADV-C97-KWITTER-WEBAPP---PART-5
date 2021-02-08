var firebaseConfig = {
    apiKey: "AIzaSyBcieujutnf3IuYTCu0qa0qmz6_oJpmDUg",
    authDomain: "snapter-166a9.firebaseapp.com",
    databaseURL: "https://snapter-166a9.firebaseio.com",
    projectId: "snapter-166a9",
    storageBucket: "snapter-166a9.appspot.com",
    messagingSenderId: "915786465740",
    appId: "1:915786465740:web:e6746000c5fa07770d1d69"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("Username");
document.getElementById("welcome_user").innerHTML = "Welcome " + user_name + "! ";

function AddRoom() {
    var room_name = document.getElementById("roomname").value
    firebase.database().ref("/").child(room_name).update({
          purpose: "Roomname added"
    });
    localStorage.setItem("Roomname", room_name);
    window.location = "kwitter_page.html";
}


function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                //Start code
                console.log("Room Name - " + Room_names);
                row = "<div class='room_names' id=" + Room_names + "onclick = 'roomForChat(this.id)'>" + Room_names + "</div><hr>"
                document.getElementById("output").innerHTML += row;
                //End code
          });
    });
}
getData();


function roomForChat(Name) {
    console.log(Name);
    localStorage.setItem("Roomname", Name);
    window.location = "kwitter_page.html";
}


function byebye() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Roomname");
    window.location = "index.html";
}


