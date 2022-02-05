var user = "Teemo";
var section = splitSub[0];
var forum = splitSub[1];
var thread = splitSub[2];
section = section.replaceAll("?", "");
var section_ = section;
section = section.replaceAll(" ", "");
var forum_ = forum;
forum = forum.replaceAll("_", " ");
var thread_ = thread;
thread = thread.replaceAll("_", " ");

createComment = document.getElementById("comment-textarea-hidden");
createComment.style.display = 'none';
var boolDisplayComment = 0;
function displayInputComment() {
    if (boolDisplayComment==0)
    {
        createComment.style.display = 'block';
        return boolDisplayComment=1;
    }
    else 
    {
        createComment.style.display = 'none';
        return boolDisplayComment=0;
    }
}

postEdit = document.getElementById("postEdit-textarea-hidden");
postEdit.style.display = 'none';
var boolDisplayPostEdit = 0;
var count = 0;
function displayEditBox() {

    if(count == 0)
    {
        firebase.database().ref("Forum Threads/"+section+"/"+forum+"/"+thread).once('value', function(MainSnapshot){
            
                const data_Forum = MainSnapshot.val();
                const description = data_Forum["description"];
                console.log(description);
            
                document.getElementById("postEdit-textarea").value = description;
        });
        count++;
    }
   

    if (boolDisplayPostEdit==0)
    {
        postEdit.style.display = 'block';
        return boolDisplayPostEdit=1;
    }
    else 
    {
        postEdit.style.display = 'none';
        return boolDisplayPostEdit=0;
    }
}


//------------------------------------------------Topic------------------------------------------------- A forum can have many topics
function getURL() {
    return window.location.href;
}
function newComment() {
        //gets current user
        //var user = firebase.auth().currentUser;
    
        
        var comment = document.getElementById("comment-textarea").value;
        var date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        date = year+"/"+month+"/"+day+"/"+hour+"/"+minute+"/"+second;
        const date_unsep = date.replaceAll("/","");
        var newURL = getURL();

        
        firebase.database().ref("Forum Thread Posts/"+section+"/"+ forum + "/" + thread +"/"+user+date_unsep).set({   //set comments
            Forum: forum,
            thread: thread,
            comment: comment,
            urlString: newURL,
            created_at: date,
            last_updated: date,
            username: user

        }).then(function (docRef) {
                firebase.database().ref("Forum Threads/"+section+"/"+ forum+"/"+thread).update({
                    latest_comment: comment,
                    latest_comment_url: "ForumsThreadPost.html?"+section_+"|"+forum_+"|"+thread_,
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

function deleteThread() {

    var date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        date = year+"/"+month+"/"+day+"/"+hour+"/"+minute+"/"+second;

    firebase.database().ref("Forum Threads/"+section+"/"+forum+"/"+thread).update({
        description : "DELETED",
        last_updated : date

    });
    window.location.href = forumURL;
}
function deleteComment(comment_id) {
    firebase.database().ref("Forum Thread Posts/"+section+"/"+forum+"/"+thread+"/"+comment_id).remove();
    window.location.href = "ForumsThreadPost.html?"+section_+"|"+forum_+"|"+thread_;
}


function updatePost() {
    var updatedPost = document.getElementById("postEdit-textarea").value;
    var date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        date = year+"/"+month+"/"+day+"/"+hour+"/"+minute+"/"+second;


     firebase.database().ref("Forum Threads/"+section+"/"+ forum+"/"+thread).update({
       description : updatedPost,
       last_updated : date
    }) 
    location.reload();

}