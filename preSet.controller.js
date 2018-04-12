function PreSetController(form) {
    this.form = form;
    var controller = this;
    form.onsubmit = function () {
        return false;
    }

    form.addWriters.onclick = function () {
        timeline.setEvents(writers);
    }
    form.addActsOfKings.onclick = function () {
        timeline.setEvents(actsOfKings);
    }
    form.addBattles.onclick = function () {
        timeline.setEvents(battles);
    }
    form.addAll.onclick = function () {
        timeline.setEvents(writers.concat(battles,actsOfKings));
    }

}
PreSetController.prototype.addEvent = function () {
    var startDate = this.form.startDate.value;
    var endDate = this.form.endDate.value;
    var eventName = this.form.eventName.value;
    try {
        eventManager.addEvent(startDate, endDate, eventName);
        timeline.setEvents(eventManager.events);
    } catch (e) {
        if ('ValidationError' === e.name) {
            alert(e.message);
        } else {
            throw e;
        }
    }
};
