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
    if (!startDate ) {
        throwValidationError('startDate is undefined');
    }
    if (!endDate) {
        throwValidationError('endDate is undefined');
    }
    if (!eventName) {
        throwValidationError('eventName is undefined');
    }
    if (startDate > endDate) {
        throwValidationError('Start date must be less or equal to end date')
    }
    this.events.push({startDate: startDate, endDate: endDate, name: eventName});
};

var eventManager = new EventManager();
