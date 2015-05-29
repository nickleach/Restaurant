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

      console.log(formHTML);

    $('.reservations').html(formHTML);

  }

  formBuilder(reservation);







// })
