// $(document).ready( function () {

      //Pulls latest news from API
  newsURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest';

  $.getJSON(newsURL).success(function(response) {
    $('.news').html('<span>' + response.title + '</span><span> ' + response.date_published + '</span><p>' + response.post + '</p>');
  }
    );

  specialURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special';

  //Pulls menu info from API
  menuURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu-1';

      //Pulls appetizers from API
  var appTemplate = _.template($('#app-template').text());

  $.getJSON(menuURL, function(items){
    processApps(items.appetizers);
    });

  function processApps(items) {
    items.forEach(function(app){
      var $element = appTemplate(app);
      $('.app').append($element);
    });
  }

      //Pulls entrees from API
  var entTemplate = _.template($('#ent-template').text());

  $.getJSON(menuURL, function(items){
    processEnts(items.entrees);
    });

  function processEnts(items) {
    items.forEach(function(ent){
      var $element = entTemplate(ent);
      $('.ent').append($element);
    });
  }

      //Pulls sides from API
  var sideTemplate = _.template($('#side-template').text());

  $.getJSON(menuURL, function(items){
    processSides(items.sides);
    });

  function processSides(items) {
    items.forEach(function(side){
      var $element = sideTemplate(side);
      $('.sides').append($element);
    });
  }

//Hides and displays content sections

  $('#menu').on ('click', function() {
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').addClass('displayedsection')
  });

  $('#story').on ('click', function() {
    $('.menu').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.our-story').addClass('displayedsection')
  });

  $('#reserve').on ('click', function() {
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').addClass('displayedsection')
  });

  $('.section-headers span').on('click', function(){
    $('.section-headers span').removeClass('section-clicked');
    $(this).addClass('section-clicked');
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
