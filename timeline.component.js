function Timeline(rootElement) {
    this.root = rootElement;
    this.events = [];
    this.setScale(0.1);
};
Timeline.prototype.setScale = function (scale) {
    this.scale = scale;
    this.render();
};
Timeline.prototype.setEvents = function (events) {
    this.events = events;
    this.render();
};
Timeline.prototype.render = function () {
    this._clearRootElement();
    var topDate = this._getTopDate();
    var minDate = this._getMinDate();
    this._renderEvents(topDate);
    if (this.events.length)
        this._renderAxis(topDate, minDate);
    this.showAllLabels();
};
Timeline.prototype._clearRootElement = function () {
    this.root.innerHTML = "";
};
Timeline.prototype._getTopDate = function () {
    var topDate = new Date();
    this.events.forEach(function (event, index) {
        if (0 === index || topDate < new Date(event.endDate)) {
            topDate = new Date(event.endDate);
        }
    });
    return topDate;
};
Timeline.prototype._getMinDate = function () {
    var startDate = new Date();
    this.events.forEach(function (event, index) {
        if (0 === index || startDate > new Date(event.startDate)) {
            startDate = new Date(event.startDate);
        }
    });
    return startDate;
};
Timeline.prototype._renderAxis = function (topDate, minDate) {
    var timeDifferenceInMillis = new Date(topDate) - new Date(minDate);
    var timelineHight = (timeDifferenceInMillis / (24 * 3600 * 1000)) * this.scale;
    var tickerCount = Math.max(1, timelineHight / 20);
    var tickerTimeDifferenceInMillis = timeDifferenceInMillis / tickerCount;
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
        spanDate.innerHTML = new Date(topDateInMillis - i * tickerTimeDifferenceInMillis).toISOString().split('T')[0];
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
    var additivesToItemElement = document.createElement('div')
    var wrapperPoleAndDetails = document.createElement('div')
    itemElement.className = ['event', event.type].join(' ');
    additivesToItemElement.className = 'setImg'
    // console.log(['event', event.type].join(' '))
    var duration = new Date(event.endDate) - new Date(event.startDate);
    var MILLISECONDS_IN_DAY = 24 * 3600 * 1000;
    var durationInDays = duration / (MILLISECONDS_IN_DAY);
    itemElement.style.height = (durationInDays * this.scale) + 'px';
    console.log(new Date(event.endDate))
    itemElement.style.marginLeft = (10 + (1 + eventIndex) * 30) + 'px';
    console.log(event.endDate);



        for(var i=0;i<event.length;i++){
            var arrayOfEndDate=[];
            if(event.endDate){
                arrayOfEndDate.push(event.endDate);
                console.log(arrayOfEndDate);

        }
    }

    additivesToItemElement.style.marginLeft = (10 + (1 + eventIndex) * 30) + 'px';
    var endDateOffset = new Date(topDate) - new Date(event.endDate);
    var endDateOffsetInDays = endDateOffset / (MILLISECONDS_IN_DAY);
    itemElement.style.top = (endDateOffsetInDays * this.scale) + 'px';
    if (event.type === 'battle') {
        var icon = document.createElement('img');
        icon.src = 'images/battle.png';
        itemElement.appendChild(icon);
    }
    if (event.type != 'battle' && !isEmpty(event.picture)) {
        var imgPerson = document.createElement('img');
        imgPerson.setAttribute('src', event.picture);
        imgPerson.className = 'imgPerson';
        imgPerson.style.marginTop = (endDateOffsetInDays * this.scale) + 10 + 'px';
        additivesToItemElement.appendChild(imgPerson);
    }
    this.root.appendChild(wrapperPoleAndDetails);
    wrapperPoleAndDetails.appendChild(itemElement);
    wrapperPoleAndDetails.appendChild(additivesToItemElement);
    var label = document.createElement('div');
    label.className = 'details';
    label.innerHTML = event.eventName;
    additivesToItemElement.appendChild(label);

    itemElement.onmousemove = function (e) {
        label.style.display = 'block';
        label.style.position = 'fixed';
        label.style.left = e.clientX + 'px';
        label.style.top = e.clientY + 'px ';

        var durationInYears = durationInDays / 365;
        var age = (durationInYears - (durationInYears * e.layerY / e.target.offsetHeight)).toFixed(0);
        if (event.type != 'battle') {
            label.innerHTML = event.eventName + ' ' + age + ' years old';
            e.target.style.position = 'absolute';
        }

    }
    itemElement.onmouseout = function (e) {
        label.style.display = null;
        label.innerHTML = event.eventName;
        label.style.position='absolute';
        label.style.left=null;
        label.style.top=itemElement.style.top;
    }
}
Timeline.prototype.showAllLabels = function () {
    var toggleLabel = document.getElementById('toggleLabel');
    var label = document.getElementsByClassName('details');
    var itemElement = document.getElementsByClassName('event')
    if (toggleLabel.checked ) {
        this.root.classList.add('show-all-labels');
        for (var j = 0; j < label.length; j++) {
            label[j].style.position = 'absolute';
            label[j].style.top = itemElement[j].style.top;
            label[j].style.left = null;
            label.innerHTML = event.eventName;
        }
    }
    else {
        this.root.classList.remove('show-all-labels');
    }
}
function isEmpty(string) {
    return null == string || !string.trim().length;
}