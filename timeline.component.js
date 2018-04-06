function Timeline(rootElement) {
    this.root = rootElement;
    this.events = [];
    this.setScale(0.2);
}

Timeline.prototype.setScale = function (scale) {
    this.scale = scale;
    this.render();
};

Timeline.prototype.setEvents = function (events) {
    this.events = events;
    this.render();
};

// Timeline.prototype.render = function () {
//
//     // var timeline = this;
//     // var topDate = new Date();
//     // this.events.forEach(function (event, index) {
//     //     if (0 === index || topDate < event.endDate) {
//     //         topDate = event.endDate;
//     //     }
//     // });
//     this.events.forEach(function (event, index) {
//         timeline._renderEvent(event, index, topDate);
//     });
//     /**
//      * And here is the code to render axis
//      */
// };

Timeline.prototype.render = function () {
    this._clearRootElement();
    var topDate = this._getTopDate();
    var minDate = this._getMinDate();
    this._renderEvents(topDate);
    this._renderAxis(topDate, minDate);
};


Timeline.prototype._clearRootElement = function () {
    this.root.innerHTML = "";
};
Timeline.prototype._getTopDate = function () {
    var topDate = new Date();
    this.events.forEach(function (event, index) {
        if (0 === index || topDate < event.endDate) {
            topDate = event.endDate;
        }
    });
    return topDate;
};
Timeline.prototype._getMinDate = function () {
    var startDate = new Date();
    this.events.forEach(function (event, index) {
        if (0 === index || startDate > event.startDate) {
            startDate = event.startDate;
        }
    });
    return startDate;
};
Timeline.prototype._renderAxis = function (topDate, minDate) {

    var timeDifferenceInMillis = new Date(topDate) - new Date(minDate);
    var timelineHight = (timeDifferenceInMillis / (24 * 3600 * 1000)) * this.scale;
    var tickerCount = timelineHight / 20;

    var tickerTimeDifferenceInMillis = timeDifferenceInMillis/ tickerCount;
    var topDateInMillis = new Date(topDate).getTime();
    for (var i = 0; i < tickerCount; i++) {
        var li = document.createElement('li');
        li.className = 'ticker';
        this.root.appendChild(li);
        var spanDate = document.createElement('span');
        var spanDash = document.createElement('span');
        spanDate.className = 'date';
        spanDash.className = 'dash';
        li.appendChild(spanDate);
        li.appendChild(spanDash);
        li.style.top = (i * 20) + 'px';
        spanDate.innerHTML= new Date(topDateInMillis-i*tickerTimeDifferenceInMillis).toISOString().split('T')[0];



    }


};
Timeline.prototype._renderEvents = function (topDate) {
    var timeline = this;
    this.events.forEach(function (event, index) {
        timeline._renderEvent(event, index, topDate);
    });


};

Timeline.prototype._renderEvent = function (event, eventIndex, topDate) {
    var itemElement = document.createElement('li');
    itemElement.innerHTML = '&nbsp;';
    itemElement.className = 'event';
    var duration = new Date(event.endDate) - new Date(event.startDate);
    var MILLISECONDS_IN_DAY = 24 * 3600 * 1000;
    var durationInDays = duration / (MILLISECONDS_IN_DAY);
    itemElement.style.height = (durationInDays * this.scale) + 'px';
    itemElement.style.marginLeft = (10 + (1 + eventIndex) * 15) + 'px';
    var endDateOffset = new Date(topDate) - new Date(event.endDate);
    var endDateOffsetInDays = endDateOffset / (MILLISECONDS_IN_DAY);
    itemElement.style.top = (endDateOffsetInDays * this.scale) + 'px';

    itemElement.title = event.startDate + ' - ' + event.endDate + ' ; duration: ' + durationInDays + ' ; offeset: ' + endDateOffsetInDays;
    this.root.appendChild(itemElement);


};
