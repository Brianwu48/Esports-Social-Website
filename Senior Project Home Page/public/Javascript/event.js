
createEvent = document.getElementById("create-calendar-hidden");
createEvent.style.display = 'none';
var boolDisplayEvent = 0;
function displayUI()
{
    if (boolDisplayEvent==0)
    {
        createEvent.style.display = 'block';
        return boolDisplayEvent=1;
    }
    else 
    {
        createEvent.style.display = 'none';
        return boolDisplayEvent=0;
    }
}
function newEvent()
{
    var user = "Teemo";
    var section = document.getElementById("section").value;
    var event = document.getElementById("event").value;
    var hyperlink = document.getElementById("hyperlink").value;

    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var year = document.getElementById("year").value;
    var time = document.getElementById("time").value;
    var meridiem = document.getElementById("meridiem").value;

    var date = month+"/"+day+"/"+year+"/"+time+"/"+meridiem;
    firebase.database().ref("Calendar/"+date).set({
        section: section,
        event: event,
        hyperlink: hyperlink,
        username: user,
        date: date
    }).then(function (docRef) {
        window.location.href = "calendar.html";
    }).catch(function (error) {
        console.log(error)
    })
}



