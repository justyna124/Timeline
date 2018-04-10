function AddEventFormController(form) {
    this.form = form;
    var controller = this;
    form.onsubmit = function () {
        try {
            controller.addEvent();
        } catch (e) {
            console.log(e)
        }
        return false;
    }
    form.scale.onchange = function (event) {
        timeline.setScale(event.target.value);
        console.log(event.target.value);
    }
    form.random.onclick = function () {
        // timeline.addRandomEvent();
        // console.log('2622')
        function formatDate(date) {
            return new Date(date).toISOString().split('T')[0];
        }
        var duration = Math.ceil(Math.random() * 98654321987 + 3987654321);
        var endDate = Date.now() - Math.ceil(Math.random() * 82345678876);
        form.startDate.value = formatDate(endDate - duration);
        form.endDate.value = formatDate(endDate);
        form.eventName.value = new Date().toISOString();
    }
}

AddEventFormController.prototype.addEvent = function () {
    var startDate = this.form.startDate.value;
    var endDate = this.form.endDate.value;
    var eventName = this.form.eventName.value;
    try {
        eventManager.addEvent(startDate, endDate, eventName);
        timeline.setEvents(eventManager.events);
        console.log(eventManager)

    } catch (e) {
        if ('ValidationError' === e.name) {
            alert(e.message);
        } else {
            throw e;
        }
    }
};
