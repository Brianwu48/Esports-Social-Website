
const queryString = location.search.substring();
const splitSub = queryString.split("|");

var section = splitSub[0];
var forum = splitSub[1];
section = section.replaceAll("?", "");
var section_ = section;
section = section.replaceAll(" ", "");
var forum_ = forum;
forum = forum.replaceAll("_", " ");

renderDetail();
//------------------------------------------------Topic------------------------------------------------- A forum can have many topics
function renderDetail() {
    var title_obj = document.getElementById("forum");
    title_obj.innerHTML = forum;
}
function getURL() {
    return window.location.href;
}

function newThread() {
        //gets current user
        //var user = firebase.auth().currentUser;
    
        var user = "Teemo";
        const thread = document.getElementById("thread").value;
        const thread_ = thread.replaceAll(" ", "_");
        const description = document.getElementById("description").value;
        var date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        date = year+"/"+month+"/"+day+"/"+hour+"/"+minute+"/"+second;
        noSpaceThread = thread.replace(" ", "");
        //new URLstring to be able to make a dedicated href to (ex. public/forums + /LeagueOfLegends.com)
        var prefixURL = getURL().replace(".html", "/");
        var newURL = prefixURL + noSpaceThread + ".html";


        firebase.database().ref("Forum Threads/"+section+"/"+ forum + "/" + thread).set({
            Forum: forum,
            thread: thread,
            description: description,
            urlString: newURL,
            created_at: date,
            last_updated: date,
            num_comment: 0,
            username: user,
            latest_comment: "",
            latest_comment_url: "ForumsThreadPost.html?"+section_+"|"+forum_+"|"+thread_,
            latest_username: "",
            latest_username_url: "",
            latest_date: ""
        }).then(function (docRef) {

            firebase.database().ref("Forums/"+section+"/"+ forum).update({
                latest_post: thread,
                latest_post_url: "ForumsThreadPost.html?"+section_+"|"+forum_+"|"+thread_,
                latest_username: user,
                latest_username_url: "Profile/"+user,
                latest_date: date
            }).then(function (docRef) {
                console.log("updated");
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log(errorMessage);
            })
            window.location.href = "ForumsThreadPost.html?"+section_+"|"+forum_+"|"+thread_;           
        }).catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        })


    
}

function deleteTopic() {
    //button
    //delete from database
    //refreshes
}
