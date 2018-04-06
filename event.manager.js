// $(document).ready(function() {
//     $('button').click(function () {
//         $('.pop').popover({placement: "right"});
//         // $('button').popover({title: "", content: "Blabla", placement: "right"});
//     });
// });
// function newElement() {
//     var startDate = document.getElementById('inputStartDate').value;
//     var endDate = document.getElementById('inputEndDate').value;
//     var event = document.getElementById('inputEvent').value;
//     var contentLi = " ";
//     var li = document.createElement("li");
//     var textLi = document.createTextNode(contentLi);
//     li.appendChild(textLi);
//     document.getElementById("list").appendChild(li);
//     li.classList.add('offset-md-6','pop');
//     var title = document.createAttribute("title");
//     var content=document.createAttribute("data-content")
//     title.value = startDate + ' - '+endDate;
//     content.value=event;
//     li.setAttributeNode(title);
//     li.setAttributeNode(content);
// }
var eventsCount = 0;
var left = 0;
var bottom = 0;

function throwValidationError(msg) {
    var error = new Error(msg);
    error.name = 'ValidationError';
    throw error
}

function EventManager() {
    this.events = [];
}

EventManager.prototype.addEvent = function (startDate, endDate, eventName) {
    if (!startDate || !endDate || !eventName) {
        throwValidationError('Some params are undefined');
    }
    if (startDate > endDate) {
        throwValidationError('Start date must be less or equal to end date')
    }
    this.events.push({startDate: startDate, endDate: endDate, name: eventName});
};

var eventManager = new EventManager();

function addNewElement() {
    eventsCount++;
    left += 20;
    var startDateEvent = document.getElementById('inputStartDate').value;
    var endDateEvent = document.getElementById('inputEndDate').value;
    var eventText = document.getElementById('inputEvent').value;
    var yearStart = startDateEvent.substring(0, 4);
    var el = document.getElementById('list');
    var div = document.createElement('div');
    var li = document.createElement('li');
    var timeOfEvent = new Date(endDateEvent) - new Date(startDateEvent);
    var getDays = timeOfEvent / (24 * 3600 * 1000);
    var hightlistyle = (getDays * 0.2) + 'px';
    var divIdName = document.getElementById('element' + eventsCount);
    var coordinates = li.getBoundingClientRect();
    var coordinatesEl = el.getBoundingClientRect();
    // var coorFirstChildOl=document.getElementById('list').firstChild;
    var oT = el.offsetTop;
    var start = oT - hightlistyle;
    console.log(start);
    console.log(oT);
    console.log(coordinates);
    console.log(coordinatesEl);
    console.log(hightlistyle);

    console.log(getDays);
    div.setAttribute('id', divIdName);
    div.setAttribute('style', 'position:absolute;left:' + left + 'px');
    el.setAttribute('style', 'bottom:' + bottom);
    li.setAttribute('style', ' min-height: ' + hightlistyle + ';background-color: #b2d0dc;');
    console.log(el);
    if (startDateEvent === '' || endDateEvent === '' || eventText === '') {
        alert("You must fill in the fields!");
    }
    else if (startDateEvent > endDateEvent) {
        alert('The start date must be earlier than the end date!');
    }
    else {
        div.appendChild(li);
        el.appendChild(div);
    }

}


function setEvetn() {


}

