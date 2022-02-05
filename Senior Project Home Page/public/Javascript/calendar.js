const user = "Teemo";
const level = "admin";
const date = new Date(); //current date
var selected_year = document.getElementById("year").value;
var selected_month = "";
var category = "";
//Permissions

//button: id="createEvent"
//if user type == admin, reveal
//else button stays hidden

/*------------------------------UI Action------------------------*/

const setPeriodDate = () => {
    selected_year = document.getElementById("year").value;
    selected_month = document.getElementById("month").value;
    setDays();
}

const setDays = () => {
    const int_year = parseInt(selected_year);
    const int_month = parseInt(selected_month);
    const day_option = document.getElementById("day");
    

    var list_days = "";
    if  (selected_month == "")
    {
        list_days = '<option>'+"-"+'</option>';
    }
    else
    {
        const date_size = new Date(int_year, int_month+1, 0).getDate();
        for (i=1; i<=date_size;i++)
        {
            days = '<option>'+i+'</option>';
            list_days += days;
        }
    }

    day_option.innerHTML = list_days;
}

const create = () => {
    const day = document.getElementById("day").value;
    const month = selected_month;
    const year = selected_year;
    const time = document.getElementById("time").value;
    const meridiem = document.getElementById("meridiem").value;

    const noColonTime = time.replace(":","");
    const parse_time = parseInt(noColonTime);

    
    var military_parse_time = parse_time;
    if (meridiem == "pm" && parse_time < 1200)
    {
        military_parse_time += 1200; 
    }
    else if (meridiem == "am" && parse_time >= 1200)
    {
        military_parse_time -= 1200; 
    }
    let military_str = military_parse_time.toString().padStart(4, "0")

    const section = document.getElementById("section").value;
    const event = document.getElementById("event").value;
    const hyperlink = document.getElementById("hyperlink").value;

    const parse_object_location = month+"-"+day+"-"+year+"-"+military_str+"-"+event;

    
    var status = false; 
    var alert_message = "";
    
    if (event == "")
    {
        alert_message += "Event is incorrect\n"
        status = true;
    }
    if (month == "")
    {
        alert_message += "Month is incorrect\n"
        status = true;
    }
    if (Number.isInteger(parse_time) == false || String(parse_time).length != noColonTime.length)
    {
        alert_message += "Time is incorrectly formated or not an integer\n"
        status = true;
    }
    if (parse_time < 100 || parse_time > 1259) // 1:00 12:59
    {
        alert_message += "Time is invalid\n"
        status = true;
    }
    if (status == true)
    {
        alert("Make sure the fields are correctly filled in: \n"+alert_message);
        return;
    }

    firebase.database().ref("General_Calendar/" + parse_object_location).set({
        section     : section,
        event       : event,
        hyperlink   : hyperlink,
        day         : day,
        month       : month,
        year        : year,
        time        : time,
        meridiem    : meridiem,
        military    : military_str,
        user        : user,
        category    : category
    }).then(function (docRef) {
        alert("Event Created")
        window.location.reload();
    }).catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage)
    })
    
}
const deleteEvent = (calendar_key) => {
    firebase.database().ref("General_Calendar/"+calendar_key).remove();
    window.location.href = "Calendar.html";
}


/*------------------------------UI Start Up--------------------------*/
// const spawnData = (current_day_index, current_month_index, current_year_index) => {
    
//     firebase.database().ref("General_Calendar").once('value', function(events){
//         var insert_event = "";
//         events.forEach(function(values){
//             var data = values.val();

//             const retrieved_section = data["section"];
//             const retrieved_event = data["event"];
//             const retrieved_hyperlink = data["hyperlink"];

//             const retrieved_day = data["day"];
//             const retrieved_month = data["month"];
//             const retrieved_year = data["year"];
//             const retrieved_time = data["time"];
//             const retrieved_meridiem = data["meridiem"];

//             const int_day = parseInt(retrieved_day);
//             const int_month = parseInt(retrieved_month);
//             const int_year = parseInt(retrieved_year);
            
//             const class_obj = retrieved_section + " event";
//             if (current_day_index == int_day && current_month_index == int_month && current_year_index == int_year)
//             {
//                 insert_event += '<li class = '+class_obj+'>'+retrieved_event+'</li>';
//             }
//         });
//         console.log(insert_event);
//     });      
// }
const renderYears = () => {
    const year_option = document.getElementById("year");
    const current_year = date.getFullYear();
    
    var list_year = "";
    for(i=current_year; i<current_year+5; i++)
    {
        years = '<option>'+i+'</option>'
        list_year += years;
    }
    year_option.innerHTML = list_year;  //Dynamically displays year, 5 years ahead of time
}

const renderCalendar = () => {

    const monthDays = document.querySelector(".days");
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const months = [         //stored month
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.querySelector(".date h1").innerHTML = date.getFullYear();
    document.querySelector(".date h2").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = "Today: " + new Date().toDateString();

    
    let days = "";
    let counter = 1;


    firebase.database().ref("General_Calendar").once('value', function(events){
        

    //prev month days
    select_month = date.getMonth()-1;
    select_year = date.getFullYear();
    if (select_month == -1)
    {
        select_month = 11;
        select_year = date.getFullYear()-1;
    }
    for(let x = firstDayIndex; x > 0; x--)
    {
        var insert_event = "";
        select_day = (prevLastDay-x+1);
        events.forEach(function(values){
            var data = values.val();

            const retrieved_section = data["section"];
            const retrieved_event = data["event"];
            const retrieved_hyperlink = data["hyperlink"];

            const retrieved_day = data["day"];
            const retrieved_month = data["month"];
            const retrieved_year = data["year"];
            const retrieved_time = data["time"];
            const retrieved_meridiem = data["meridiem"];
            const retrieved_military = data["military"];

            const int_day = parseInt(retrieved_day);
            const int_month = parseInt(retrieved_month);
            const int_year = parseInt(retrieved_year);

            const class_obj = retrieved_section;
            const calendar_key = retrieved_month+"-"+retrieved_day+"-"+retrieved_year+"-"+retrieved_military+"-"+retrieved_event;
            if (select_day == int_day && select_month == int_month && select_year == int_year)
            {
                if (retrieved_hyperlink != "")
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+'<a class="slot" href ='+retrieved_hyperlink+'>'+retrieved_event+'</a>'+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
                else
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+retrieved_event+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
            }
        });
        if (counter%7 != 0)
        {
            days += '<div class = "date prev-date border-right">'+(prevLastDay-x+1)+insert_event+'</div>';
        }
        else
        {
            days += '<div class = "date prev-date">'+(prevLastDay-x+1)+insert_event+'</div>';
        }
        
        counter++;
    }
    //current month days
    select_month = date.getMonth();
    select_year = date.getFullYear();
    for(let i = 1; i <= lastDay; i++)
    {
        var insert_event = "";
        select_day = i;
        events.forEach(function(values){
            var data = values.val();

            const retrieved_section = data["section"];
            const retrieved_event = data["event"];
            const retrieved_hyperlink = data["hyperlink"];

            const retrieved_day = data["day"];
            const retrieved_month = data["month"];
            const retrieved_year = data["year"];
            const retrieved_time = data["time"];
            const retrieved_meridiem = data["meridiem"];
            const retrieved_military = data["military"];

            const int_day = parseInt(retrieved_day);
            const int_month = parseInt(retrieved_month);
            const int_year = parseInt(retrieved_year);

            const class_obj = retrieved_section;
            const calendar_key = retrieved_month+"-"+retrieved_day+"-"+retrieved_year+"-"+retrieved_military+"-"+retrieved_event;
            if (select_day == int_day && select_month == int_month && select_year == int_year)
            {
                if (retrieved_hyperlink != "")
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+'<a class="slot" href ='+retrieved_hyperlink+'>'+retrieved_event+'</a>'+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
                else
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+retrieved_event+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
            }
        });
        if (counter%7 != 0) 
        {
            if(i==new Date().getDate() && date.getMonth() == new Date().getMonth())
            {

                days += '<div class = "date today border-right">'+i+insert_event+'</div>';
            }
            else
            {
                days += '<div class= "date border-right">'+i+insert_event+'</div>';
            }
        }
        else
        {
            if(i==new Date().getDate() && date.getMonth() == new Date().getMonth())
            {
                days += '<div class = "date today">'+i+insert_event+'</div>';   
            }
            else
            {
                days += '<div class = "date">'+i+insert_event+'</div>';
            }
        }

        counter++;
    }
    //next month days
    select_month = date.getMonth()+1;
    select_year = date.getFullYear();
    if (select_month == 12)
    {
        select_month = 0;
        select_year = date.getFullYear()+1;
    }
    for(let z = 1; z <= nextDays; z++)
    {
        var insert_event = "";
        select_day = z;
        events.forEach(function(values){
            var data = values.val();

            const retrieved_section = data["section"];
            const retrieved_event = data["event"];
            
            const retrieved_hyperlink = data["hyperlink"];

            const retrieved_day = data["day"];
            const retrieved_month = data["month"];
            const retrieved_year = data["year"];
            const retrieved_time = data["time"];
            const retrieved_meridiem = data["meridiem"];
            const retrieved_military = data["military"];

            const int_day = parseInt(retrieved_day);
            const int_month = parseInt(retrieved_month);
            const int_year = parseInt(retrieved_year);

            const class_obj = retrieved_section;
            const calendar_key = retrieved_month+"-"+retrieved_day+"-"+retrieved_year+"-"+retrieved_military+"-"+retrieved_event;
            if (select_day == int_day && select_month == int_month && select_year == int_year)
            {
                if (retrieved_hyperlink != "")
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+'<a class="slot" href ='+retrieved_hyperlink+'>'+retrieved_event+'</a>'+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
                else
                {
                    insert_event += '<div class="x-button-box" id ="'+calendar_key+'" onclick="deleteEvent(this.id)"><div class = "x-button x1-button"></div><div class = "x-button x2-button"></div></div><li class = '+class_obj+'>'+retrieved_event+" "+retrieved_time+retrieved_meridiem+'</li>';
                }
            }
        });
        if (counter%7 != 0) 
        {
            days += '<div class = "date next-date border-right">'+z+insert_event+'</div>';
        }
        else
        {
            days += '<div class = "date next-date">'+z+insert_event+'</div>';
        }
        counter++;
    }
    
    monthDays.innerHTML = days;
    });      
}


document.querySelector('.prev').addEventListener('click',()=> {
    date.setMonth(date.getMonth()-1)
    
    if (date.getMonth() == -1)
    {
        date.setMonth(11)
        date.setFullYear(date.getFullYear()+-1);
    }
    renderCalendar();
})
document.querySelector('.next').addEventListener('click',()=> {
    date.setMonth(date.getMonth()+1)
    if (date.getMonth() == 12)
    {
        date.setMonth(0);
        date.setFullYear(date.getFullYear()+1);
    }
    renderCalendar();
})
document.getElementById("createEvent").addEventListener('click', ()=> {
    displayUI();
})

renderCalendar();
renderYears();
