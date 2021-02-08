var firebaseConfig = {
    apiKey: "AIzaSyCKHHovkVyN7UEbOmEvPD0RLuExWmHtMkA",
    authDomain: "kwitter-cdc9a.firebaseapp.com",
    databaseURL: "https://kwitter-cdc9a.firebaseio.com",
    projectId: "kwitter-cdc9a",
    storageBucket: "kwitter-cdc9a.appspot.com",
    messagingSenderId: "861743095471",
    appId: "1:861743095471:web:fa5c6bc5f0e6aa091abe5a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("Username");
room_name = localStorage.getItem("Roomname");

//YOUR FIREBASE LINKS


//FUNCTION SEND
function send() {

    msg = document.getElementById("msg").value
    firebase.database().ref(room_name).push({
          USER_NAME: user_name,
          USER_MSG: msg,
          LIKES: 0
    });

    document.getElementById("msg").value = "";


}
//FUNTION SEND ENDED HERE


function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                      firebase_message_id = childKey;
                      message_data = childData;
                      //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      display_name = message_data["USER_NAME"];
                      name_tag = "<h4>" + display_name + "</h4><hr><hr>";
                      display_text = message_data["USER_MSG"];
                      msg_tag = "<h4 class='message_h4'>" + display_text + "</h4>";
                      display_likes = message_data["LIKES"];
                      like_button = "<button class='btn g like_btn' id=" + firebase_message_id + " value=" + display_likes + " onclick='updateLike(this.id)'>";
                      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>:" + display_likes + "</span></button><hr>";
                      row = name_tag + msg_tag + like_button + span_with_tag;
                      document.getElementById("output").innerHTML += row;
                      //End code
                }
          });
    });
}
getData();




function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
          LIKES: updated_likes
    });
}



function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Roomname");
    window.location = "index.html";
}



