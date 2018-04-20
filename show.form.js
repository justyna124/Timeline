// document.getElementById('show').onclick =
//     function() {
//         console.log('uio')
//
//     }
window.onload = function () {

    document.getElementById('show').onclick = function () {
        console.log()
        console.log('buo')

        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        var event = document.getElementById('event');
        // startDate.style.display = "block";
        // endDate.style.display = "block";
        // event.style.display = "block";
        // var elem = document.getElementById(id);
        if (startD.style.display === ''|| startD.style.display == 'none') {
            startD.style.display = 'block'
        }
        else {
            startD.style.display = 'none';
        }
        if (endD.style.display === ''|| endD.style.display == 'none') {
            endD.style.display = 'block'
        }
        else {
            endD.style.display = 'none';
        }
        if (event.style.display === ''|| event.style.display == 'none') {
            event.style.display = 'block'
        }
        else {
            event.style.display = 'none';
        }




    }

}
