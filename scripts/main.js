// $(document).ready( function () {

var getNews = $.getJSON('http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest');

var getSpecials = $.getJSON('http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special');

var getMenu = $.getJSON('http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu-1');




var newReservation = {
  fullName: '',
  numberofGuests: '',
  date: '',
  specialNotes: '',
  seatingPref: ''
}

var templateString = $('#reservationFormatting').text();

var templateFunction = _.template(templateString);

var finalHTML = templateFunction(newReservation);

function formBuilder(data) {

  var formHTML = $('#formElement').text();

  var formFunction = _.template(formHTML);

  data.forEach( function(elem) {
    $('#reservationForm').append(formFunction(elem));


  });


}






// })
