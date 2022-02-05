
//------------------------------------------------Topic------------------------------------------------- A forum can have many topics

function getURL() {
    return window.location.href;
}

function checkTitle() {
    var status;
    var topic = document.getElementById("topic").value;
    var description = document.getElementById("description").value;
    var section = document.getElementById("section").value;

    if (topic == "") {
        alert("Topic cannot be empty");
        return;
    }
    if (description == "") {
        alert("Description cannot be empty");
        return;
    }
    noSpaceTopic = topic.replace(" ", "");
    //new URLstring to be able to make a dedicated href to (ex. public/forums + /LeagueOfLegends.com)
    var prefixURL = getURL().replace(".html", "/");
    var newURL = prefixURL + noSpaceTopic + ".html";
    var html = arrayOfHTML();
    var length = html.length;
    for (i = 0; i < length; i++) {
        if (html[i] == newURL) {
            //alert("Error Choose another Title");
            //console.log("Error at Not Unique")
            status = false;
            break;
        } else {
            status = true;
        }
    }
    console.log(status + "checkTitle");
    return status;

}

function arrayOfHTML() {
    var usernameArray = ["Null"];
    var section = document.getElementById("section").value;
    var db = firebase.database().ref("Forums/" + section + "/").orderByKey();
    db.on("value", function (posts) {
        posts.forEach(function (child) {
            var url = child.val().urlString;
            usernameArray.push(url);
            //console.log(usernameArray);
        });
    });
    //console.log(usernameArray);
    return usernameArray;
}

/*function checkDatabase(newURL, section) {
    //var array = [];
    var status = false;
    var html = arrayOfHTML();
    for(i =0; i<html.length;i++){
        console.log(html[i]);
    }
    /*
    console.log("in check ");
    var db = firebase.database().ref("Forums/" + section + "/").orderByKey();
    db.once("value").then(function (posts) {
        posts.forEach(function (child) {
            /* var created = child.val().created_at;
            var description = child.val().description;
            var lastUpdated = child.val().last_updated;
            var numPost = child.val().num_Post;
            var section = child.val().section;
            var topic = child.val().topic;
            var username = child.val().username; */
/*var url = child.val().urlString;
console.log(url);
 
console.log(newURL);
console.log("--");
if(url == newURL )
{
    alert("Pick new title");
    status = true;
    console.log("after"+test);
    return status;
}
});
console.log("after after "+status);
});
console.log("after after after "+status);*/
/*return status;

 
console.log("start");
firebase.database().ref("Forums").once('value', function(Main){
    Main.forEach(function(Section){
        Section.forEach(function(Forum){
            var data_Forum = Forum.val();
            array.push(data_Forum["urlString"]);
            return array;
        });
    });
});  
 
}*/

function newForum() {
console.log(checkTitle() + "newForum");
    if (checkTitle() == true) {
        var user = "Teemo";
        var section = document.getElementById("section").value;
        var topic = document.getElementById("topic").value;
        var description = document.getElementById("description").value;
        var date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const time = date.getTime();
        noSpaceTopic = topic.replace(" ", "");

        var prefixURL = getURL().replace(".html", "/");
        var newURL = prefixURL + noSpaceTopic + ".html";


        firebase.database().ref("Forums/"+section+"/"+ topic).set({
            section: section,
            topic: topic,
            description: description,
            urlString: newURL,
            created_at: date,
            last_updated: date,
            latest_post: "",
            latest_post_url: "",
            latest_username: "",
            latest_username_url: "",
            latest_date: "",
            num_post: 0,
            username: user
        }).then(function (docRef) {
            alert("Forum Created")
            window.location.href = "Forums.html";
        }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage)
        })
    }else{
        alert("Didn't create Forum");
        console.log("Error at newForum");
    }
}


