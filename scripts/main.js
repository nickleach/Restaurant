// $(document).ready( function () {


      //Pulls latest news from API
  newsURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/news/latest';

  $.getJSON(newsURL).success(function(response) {
    $('.news').html('<h6>' + response.title + '</h6><h6> ' + response.date_published + '</h6><p>' + response.post + '</p>');
  }
    );


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
      if (app.allergies == 1)
        $('.app').append('<img class="menuIcon" src="images/allergy.png"></img>');
      if (app.favorite == 1)
        $('.app').append('<img class="menuIcon" src="images/thumbsup.png"></img>');
      if (app.spicy == 1)
        $('.app').append('<img class="menuIcon" src="images/spicy.png"></img>');
      if (app.vegan == 1)
        $('.app').append('<img class="menuIcon" src="images/vegan.png"></img>');
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
      if (ent.allergies == 1)
        $('.ent').append('<img class="menuIcon" src="images/allergy.png"></img>');
      if (ent.favorite == 1)
        $('.ent').append('<img class="menuIcon" src="images/thumbsup.png"></img>');
      if (ent.spicy == 1)
        $('.ent').append('<img class="menuIcon" src="images/spicy.png"></img>');
      if (ent.vegan == 1)
        $('.ent').append('<img class="menuIcon" src="images/vegan.png"></img>');
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
      if (side.allergies == 1)
        $('.sides').append('<img class="menuIcon" src="images/allergy.png"></img>');
      if (side.favorite == 1)
        $('.sides').append('<img class="menuIcon" src="images/thumbsup.png"></img>');
      if (side.spicy == 1)
        $('.sides').append('<img class="menuIcon" src="images/spicy.png"></img>');
      if (side.vegan == 1)
        $('.sides').append('<img class="menuIcon" src="images/vegan.png"></img>');
    });
  }


  //Pulls special from menu API

  specialURL = 'http://private-anon-fb178ad55-restaurantapi.apiary-mock.com/menu/special';
  var specialID;

  $.getJSON(specialURL).success(function(response) {
    specialID = response.menu_item_id;
  }
    );

  $.getJSON(menuURL).success(function(response) {
    response.entrees.filter(function(x) {
      if(x.id == specialID) {
        $('.special').html('<span>' + x.item + '</span><span> ' + x.price + '</span><p>' + x.description + '</p>');
      }
    })
  });


//Hides and displays content sections

  $('#menu').on ('click', function() {
    $('#menu').removeClass('border');
    $('#story').addClass('border');
    $('#reserve').addClass('border');
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').addClass('displayedsection')
  });

  $('#story').on ('click', function() {
    $('#story').removeClass('border');
    $('#reserve').addClass('border');
    $('#menu').addClass('border');
    $('.menu').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').removeClass('displayedsection').addClass('hiddensection');
    $('.our-story').addClass('displayedsection')
  });

  $('#reserve').on ('click', function() {
    $('#reserve').removeClass('border');
    $('#story').addClass('border');
    $('#menu').addClass('border');
    $('.our-story').removeClass('displayedsection').addClass('hiddensection');
    $('.menu').removeClass('displayedsection').addClass('hiddensection');
    $('.reservations').addClass('displayedsection')
  });

  $('.section-headers span').on('click', function(){
    $('.section-headers span').removeClass('section-clicked');
    $(this).addClass('section-clicked');
  });



  //Reservation Form
  var reservation = [
    { type: 'text', label: 'Full Name' },
    { type: 'number', label: 'Number of Guests' },
    { type: 'date', label: 'Date' },
    { type: 'text', label: 'Special Notes' },
    { type: 'text', label: 'Seating Preference'},
    { type: 'Submit', label: 'Reserve Table'}
  ];

  function formBuilder(data) {

    var formHTML = '<form>';

    data.forEach( function (elem) {

      if (elem.type === 'submit') {

        formHTML += '<input type="' + elem.type + '" value="' + elem.label + '" />';

      } else {

        formHTML += '<label>' + elem.label + '</label>';
        formHTML += '<input type="' + elem.type + '" />';
        formHTML += '</br></br>';

      }

    });

    formHTML += '</form>';

    $('.reservations').html(formHTML);

  }

  formBuilder(reservation);


// Flickr stuff
//Header image

var flickrTemplate = _.template($('#header-img').text());

var flickrKey = 'e037a9c4873e83b9f07785c0f8afad8a'

var url = 'https://api.flickr.com/services/rest/?&method=flickr.galleries.getPhotos&api_key=' + flickrKey +
'&gallery_id=5704-72157653246527109&format=json&extras=url_m&callback=jsonFlickrApi';



$.ajax(url, {
 dataType: 'jsonp',
 jsonpCallback: 'jsonFlickrApi',
 success: function(data) {
   var photos = data.photos.photo;
   processFlickr(photos);
 }
})

function processFlickr(pics) {

 pics.forEach(function(pic) {
   var $element = flickrTemplate(pic);
   $('.main-image').append($element);
 });
};


// })
