// $(document).ready( function () {
  newsURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest';

  $.getJSON(newsURL).success(function(response) {
    $('.news').html('<span>' + response.title + '</span><span> ' + response.date_published + '</span><p>' + response.post + '</p>');
  }
    );

  specialURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special';
  menuURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu-1';


  var appTemplate = _.template($('#app-template').text());

  $.getJSON(menuURL, function(items){
    processApps(items.appetizers);
    });

  function processApps(items) {
    items.forEach(function(app){
      var $element = appTemplate(app);
      $('.menu').append($element);
    });
  }


//------

  // var appetiz;

  // $.getJSON(menuURL).success(function(x) {
  //   // $('.menu').html('<span>Appetizers</span>');
  //   appetiz = $('.menu').append(x.appetizers);
  //   // $('.menu').prepend('<span> ' + x.appetizers.item + ' </span><span> ' + x.appetizers.price + ' </span><p> ' + x.appetizers.description + '</p>');
  // });


//----

  $('#menu').on ('click', function() {
    $('.story').removeClass('displayedsection');
    $('.reserve').removeClass('displayedsection');
    $('.menu').addClass('displayedsection')
  });

  $('#story').on ('click', function() {
    $('.menu').removeClass('displayedsection');
    $('.reserve').removeClass('displayedsection');
    $('.story').addClass('displayedsection')
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
