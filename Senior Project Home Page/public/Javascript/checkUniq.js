/********************************Create An Array to hold all the document information************************************************/
function createUsernameArray() {
    var ref = firebase.database().ref("Users");
    var usernameArray = ["Null"];

    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var username = childData.username;
            //console.log(childData);
            //console.log(username);
            usernameArray.push(username);
        });
    });
    console.log(usernameArray);
    return usernameArray;
}

function createPhoneArray() {
    var ref = firebase.database().ref("Users");
    var usernameArray = ["Null"];
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var username = childData.phone;
            //console.log(childData);
            //console.log(username);
            usernameArray.push(username);
        });
    });
    console.log(usernameArray);
    return usernameArray;
}

function createIDArray() {
    var ref = firebase.database().ref("Users");
    var usernameArray = ["Null"];

    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var username = childData.ramID;
            //console.log(childData);
            //console.log(username);
            usernameArray.push(username);
        });
    });
    console.log(usernameArray);
    return usernameArray;
}

function createDiscordArray() {
    var ref = firebase.database().ref("Users");
    var usernameArray = ["Null"];

    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var username = childData.discord;
            //console.log(childData);
            //console.log(username);
            usernameArray.push(username);
        });
    });
    console.log(usernameArray);
    return usernameArray;
}
/********************************Check Unque for student type (has RAMID)************************************************/
function checkUniqStudent() {
    var status = true;
    var enteredUsername = document.getElementById("username").value;
    var enteredPhone = document.getElementById("phone").value;
    var enteredID = document.getElementById("ramID").value;
    var enteredDiscord = document.getElementById("discord").value;
    var arrUsername = createUsernameArray();
    var arrPhone = createPhoneArray();
    var arrID = createIDArray();
    var arrDiscord = createDiscordArray();
    var lengthUser = arrUsername.length;
    var lengthPhone = arrPhone.length;
    var lengthID = arrID.length;
    var lengthDiscord = arrDiscord.length;
    for (i = 0; i < lengthUser; i++) {
        //console.log(arr[i]);
        //console.log(enteredUsername);
        if (enteredUsername == arrUsername[i]) {
            console.log("Error username already in use");
            document.getElementById("snackbar").innerHTML = "Username already in use.";
            status = false;
            break;
        } else
        if (enteredPhone == arrPhone[i]) {
            console.log("Error phone already in use");
            document.getElementById("snackbar").innerHTML = "Phone already in use.";
            status = false;
            break;
        } else 
        if (enteredID == arrID[i]) {
            console.log("Error ID already in use");
            document.getElementById("snackbar").innerHTML = "ID already in use.";
            status = false;
            break;
        } else 
        if (enteredDiscord == arrDiscord[i]) {
            console.log("Error discord already in use");
            document.getElementById("snackbar").innerHTML = "Discord already in use.";
            status = false;
            break;
        } else {
            console.log("Continue");
            document.getElementById("snackbar").innerHTML = "Everything is unique.";
        }
    }
    return status;

}
/********************************Check Unque for other type (No RAMID)************************************************/
function checkUniqOther() {
    var status = true;
    var enteredUsername = document.getElementById("username").value;
    var enteredPhone = document.getElementById("phone").value;
    var enteredDiscord = document.getElementById("discord").value;
    var arrUsername = createUsernameArray();
    var arrPhone = createPhoneArray();
    var arrID = createIDArray();
    var arrDiscord = createDiscordArray();
    var lengthUser = arrUsername.length;
    var lengthPhone = arrPhone.length;
    var lengthID = arrID.length;
    var lengthDiscord = arrDiscord.length;
    for (i = 0; i < lengthUser; i++) {
        //console.log(arr[i]);
        //console.log(enteredUsername);
        if (enteredUsername == arrUsername[i]) {
            console.log("Error username already in use");
            document.getElementById("snackbar").innerHTML = "Username already in use.";
            status = false;
            break;
        } else
        if (enteredPhone == arrPhone[i]) {
            console.log("Error phone already in use");
            document.getElementById("snackbar").innerHTML = "Phone already in use.";
            status = false;
            break;
        } else 
        if (enteredDiscord == arrDiscord[i]) {
            console.log("Error discord already in use");
            document.getElementById("snackbar").innerHTML = "Discord already in use.";
            status = false;
            break;
        } else {
            console.log("Continue");
            document.getElementById("snackbar").innerHTML = "Everything is unique.";
        }
    }
    return status;

}
