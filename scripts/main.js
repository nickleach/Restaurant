// $(document).ready( function () {
  newsURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest';

  $.getJSON(newsURL).success(function(response) {
    $('.news').html('<span>' + response.title + '</span><span>' + response.date_published + '</span><p>' + response.post + '</p>');
  }
    );

  specialURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special';
  menuURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu-1';

  var getMenu = $.getJSON(menuURL).success(function(response) {
    $('#menu').append($.each(response, function(key,value) {
      '<h2>' + key + '</h2>';
    }))
  })


  $('#menu').on ('click', function() {
    $('.story').removeClass('displayedsection');
    $('.reserve').removeClass('displayedsection');
    $('.menu').addClass('displayedsection')
  });

  $('#story').on ('click', function() {
    $('.menu').removeClass('displayedsection');
    $('.reserve').removeClass('displayedsection');
    $('.store').addClass('displayedsection')
  });

  $('#reserve').on ('click', function() {
    $('.story').removeClass('displayedsection');
    $('.menu').removeClass('displayedsection');
    $('.reserve').addClass('displayedsection')
  });


// (function(response) {

  // $('#menu').html('<span>' + response.title + '</span><span>' + response.date_published + '</span><p>' + response.post + '</p>');
// }
//   );



// var getMainPic = $.getJSON('http://api.flickr.com/services/rest/?');



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
