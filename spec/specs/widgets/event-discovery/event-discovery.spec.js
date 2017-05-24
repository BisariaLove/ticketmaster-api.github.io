describe("EDWWidget", () => {
	let widget,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML =
			'<head></head><div w-type="event-discovery" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-keyword="" w-theme="simple" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong=""><div class="event-logo centered-logo"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/event-discovery/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterEventDiscoveryWidget(document.querySelector('div[w-type="event-discovery"]'));
	});

	beforeEach(function() {
		spyOn(widget, 'clear');
		spyOn(widget, 'hideMessage');
		spyOn(widget, 'showMessage');
		spyOn(widget, 'publishEvent');
	});

	it('widget should be BeDefined', () => {
		expect(widget).toBeDefined();
	});

	it('widget #themeUrl should be BeDefined', function(){
		expect(widget.themeUrl).toBe('https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/theme/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.themeUrl).toBe('http://developer.ticketmaster.com/products-and-docs/widgets/event-discovery/1.0.0/theme/');
	});

	it('widget #portalUrl should be Defined', function(){
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
	});

	it('#events should be Defined', () => {
		widget.events;
		expect(widget.events).toBeUndefined();
	});

	it('#isPosterTheme should be Defined', () => {
		widget.widgetConfig = {
			layout: 'simple'
		}
		expect(widget.isPosterTheme).toBeTruthy();
	});

	it('#isBarcodeWidget should be Defined', () => {
		widget.widgetConfig = {
				theme:'oldschool'
		}
		expect(widget.isBarcodeWidget).toBeTruthy();
		widget.widgetConfig = {
			theme:'newschool'
		}
		expect(widget.isBarcodeWidget).toBeTruthy();
	});

	it('#borderSize should be Defined', () => {
		widget.widgetConfig = {
			border: 1
		}
		expect(widget.borderSize).toBeTruthy();
	});

	it('#eventUrl should be https://www.ticketmaster.com/event/', function(){
		widget.eventUrl;
		expect(widget.eventUrl).toBe('https://www.ticketmaster.com/event/');
	});

	it('#geocodeUrl should be https://maps.googleapis.com/maps/api/geocode/json', function(){
		widget.geocodeUrl;
		expect(widget.geocodeUrl).toBe('https://maps.googleapis.com/maps/api/geocode/json');
	});

	it('#updateExceptions should be "width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"', function(){
		widget.updateExceptions;
		expect(widget.updateExceptions).toEqual(["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"]);
	});

	it('#sliderDelay should be 500', function(){
		expect(widget.sliderDelay).toBe(5000);
	});

	it('#sliderRestartDelay should be 500', function(){
		expect(widget.sliderRestartDelay).toBe(5000);
	});

	it('#hideMessageDelay should be 500', function(){
		expect(widget.hideMessageDelay).toBe(5000);
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		expect(widget.tmWidgetWhiteList).toBeDefined();
	});

	it('#countriesWhiteList should equal ["Australia", "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany", "Ireland", "Mexico", "Netherlands", "New Zealand", "Norway", "Spain", "Sweden", "Turkey", "UAE", "United Kingdom", "United States"]', function(){
		expect(widget.countriesWhiteList).toEqual(["Australia", "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany", "Ireland", "Mexico", "Netherlands", "New Zealand", "Norway", "Spain", "Sweden", "Turkey", "UAE", "United Kingdom", "United States"]);
	});

	it('#eventReqAttrs should be BeDefined', function(){
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetConfig = {
			latlong: '34567.87,4589745',
			postalcode: 90015,
			tmapikey: 'test',
			height: 350
		}
		expect(widget.isConfigAttrExistAndNotEmpty('height')).toBe(true);
		expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetConfig = {
			tmapikey: '',
		};
		expect(widget.eventReqAttrs).toBeDefined();
		widget.attrs = {
			latlong: ','
		};
		expect(widget.eventReqAttrs).toBeDefined();
		widget.attrs = {
			latlong: null
		};
		expect(widget.eventReqAttrs).toBeDefined();
	});

	it('#getCoordinates should be Defined', () => {
		let cb = function() {return true};
		widget.widgetConfig = {
			postalcode : '90015'
		};
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
		widget.onLoadCoordinate = function() {return true}
		widget.getCoordinates(cb);
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
		let responseTxt = '[{"id":"vv1k0Zf0C6G7Dsmj","status":"OK","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.getCoordinates.bind({
			makeRequest:function(callback){
				callback.bind({
					status:200,
					latlong: '34.0390107, -118.2672801',
					readyState:XMLHttpRequest.DONE,
					responseText:responseTxt,
				})()
			},
			config: {
				postalcode: '90015'
			},
			widget:{
				config:{
					theme:'simple',
					latlong: '34.0390107, -118.2672801',
					postalcode: '90015'
				},
				latlong: '34.0390107, -118.2672801'
			},
			latlong: '34.0390107, -118.2672801',
			isConfigAttrExistAndNotEmpty:function(){return true},
			readyState:XMLHttpRequest.DONE,
			responseText:responseTxt,
			responceStatus:'OK',
			postalcode: '90015',
			status:200
		})(function(){});
	});

	it('#updateTransition should be BeDefined', function(){
		widget.updateTransition('www.ticketmaster.com', true);
		widget.updateTransition('www.ticketmaster.com', false);
		widget.updateTransition(false, false);
		expect(widget.updateTransition).toBeDefined();
	});

	it('#setBuyBtnUrl should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.initBuyBtn();
		widget.events = {url : 'test'};
		widget.widgetConfig = {
			buyBtn: function() {return true}
		}
		widget.setBuyBtnUrl;
		let event = {
			url: 'http://www.google.com'
		}
		widget.buyBtn = function() {return true}
		widget.setBuyBtnUrl;
		expect(typeof(widget.setBuyBtnUrl)).toBe('function');
		widget.buyBtn = function() {return false}
		widget.setBuyBtnUrl;
	});

	it('#isUniverseUrl should be Defined', () => {
		expect(widget.isUniverseUrl('universe.com')[0]).toBe('universe.com');
		expect(widget.isUniverseUrl('uniiverse.com')[0]).toBe('uniiverse.com');
		expect(widget.isUniverseUrl('ticketmaster.com')[0]).toBe('ticketmaster.com');
	});

	it('#initBuyBtn should be defined', () => {
		document.querySelector('.event-buy-btn').click();
		expect(typeof(widget.initBuyBtn)).toBe('function');
	});

	it('#addBuyButton should be defined', () => {
		// widget.isListView = function() {return true}
		// widget.isUniverseUrl = function() {return true}
		// widget.isAllowedTMEvent = function() {return true}
		let _urlValid = undefined;
		widget.addBuyButton(document.querySelector('.events-root-container'), 'www.ticketmaster.com');
		expect(typeof(widget.addBuyButton)).toBe('function');
	});

	it('#embedUniversePlugin should be defined', () => {
		expect(typeof(widget.embedUniversePlugin)).toBe('function');
	});

	it('#isAllowedTMEvent should be defined', () => {
		expect(widget.isAllowedTMEvent('livenation.com')).toBeFalsy();
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widget.initMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.messageTimeout = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
	});

	it('#hideMessage should be defined', () => {
		widget.hideMessage();
		expect(typeof(widget.hideMessage)).toBe('function');
	});

	it('#AdditionalElements should be defined', () => {
		widget.AdditionalElements();
		expect(typeof(widget.AdditionalElements)).toBe('function');
	});

	it('#oldSchoolModificator should be defined', () => {
		widget.oldSchoolModificator();
		expect(typeof(widget.oldSchoolModificator)).toBe('function');
	});

	it('#newSchoolModificator should be defined', () => {
		widget.newSchoolModificator();
		expect(typeof(widget.newSchoolModificator)).toBe('function');
	});

	it('#listViewModificator should be defined', () => {
		widget.listViewModificator();
		expect(typeof(widget.listViewModificator)).toBe('function');
	});

	it('#initSliderControls should be defined', () => {
		widget.initSliderControls();
		expect(typeof(widget.initSliderControls)).toBe('function');
	});

	it('#hideSliderControls should be defined', () => {
		widget.hideSliderControls();
		expect(typeof(widget.hideSliderControls)).toBe('function');
	});

	it('#toggleControlsVisibility should be defined', () => {
		widget.eventsGroups = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.toggleControlsVisibility();
		expect(typeof(widget.toggleControlsVisibility)).toBe('function');
	});

	it('#prevSlideX should be defined', () => {
		widget.currentSlideX = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			}
		}
		widget.prevSlideX();
		expect(typeof(widget.prevSlideX)).toBe('function');
	});

	it('#nextSlideX should be defined', () => {
		widget.currentSlideX = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			}
		}
		widget.nextSlideX();
		expect(typeof(widget.nextSlideX)).toBe('function');
	});

	it('#prevSlideY should be defined', () => {
		widget.eventGroup = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.currentSlideY = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10',
				marginTop: '10'
			},
			getElementsByClassName: function(){return [{style:{marginTop:'10'}}, "two", "three"]},
		}
		widget.currentSlideX = 5;
		widget.prevSlideY();
		expect(typeof(widget.prevSlideY)).toBe('function');
	});

	it('#nextSlideY should be defined', () => {
		widget.currentSlideY = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		}
		widget.nextSlideY();
		expect(typeof(widget.nextSlideY)).toBe('function');
	});

	it('#goToSlideX should be defined', () => {
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		};
		widget.goToSlideX(1);
		expect(typeof(widget.goToSlideX)).toBe('function');
	});

	it('#goToSlideY should be defined', () => {
		widget.eventGroup = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		};
		widget.currentSlideY = 1;
		widget.goToSlideY(1);
		expect(typeof(widget.goToSlideY)).toBe('function');
	});

	it('#runAutoSlideX should be defined', () => {
		widget.slideCountX = 5;
		widget.currentSlideX = 1;
		widget.goToSlideX(5);
		widget.runAutoSlideX();
		expect(typeof(widget.runAutoSlideX)).toBe('function');
	});

	it('#stopAutoSlideX should be defined', () => {
		widget.sliderInterval = true;
		widget.stopAutoSlideX();
		expect(typeof(widget.stopAutoSlideX)).toBe('function');
	});

	it('#setSlideManually should be defined', () => {
		widget.setSlideManually(1,true);
		expect(typeof(widget.setSlideManually)).toBe('function');
	});

	it('#initSlider should be defined', () => {
		widget.initSlider();
		widget.config = {
			layoyt: 'fullwidth'
		}
		widget.initSlider();
		expect(typeof(widget.initSlider)).toBe('function');
	});

	it('#initSlider should be defined', () => {
		widget.initFullWidth();
		expect(typeof(widget.initFullWidth)).toBe('function');
	});

	it('#formatDate should return result', function(){
		let noneResult = widget.formatDate('date');
		expect(noneResult).toBe('');

		let noneTimeResult = widget.formatDate({day : "2017-03-17"});
		expect(noneTimeResult).toEqual("Fri, Mar 17, 2017");

		let mockDate = {
			dateTime : "2017-03-18T00:30:00Z",
			day : "2017-03-17",
			time : "20:30:00"
		};
		let okResult = widget.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 08:30 PM");
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widget.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
	});

	it('#clear should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.eventsRoot = document.querySelector('.events-root-container');
		let modificator = document.createElement("div");
		modificator.classList.add = "modificator";
		widget.eventsRoot.appendChild(modificator);
		widget.clear();
		expect(typeof(widget.clear)).toBe('function');
	});

	it('#update should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.eventsRoot = document.querySelector('.events-root-container');
		widget.themeModificators = {
			hasOwnProperty: function() {}
		}
		widget.update();
		expect(typeof(widget.update)).toBe('function');
		widget.config = {
			border: '2'
		}
		widget.update();
		expect(typeof(widget.update)).toBe('function');
	});

	it('#parseEvent should return currentEvent', () => {
		var eventSet = {
			id:'porky',
			url:'pie',
			name: 'Tanok na maydani Kongo',
			address:{name:''},
			images : [
				{ width : '100', height :'200', url:"img-01.bmp"},
				{ width : '400', height :'300', url:"img-02.bmp"},
				{ width : '50', height :'50', url:"img-03.bmp"},
				{ width : '10', height :'10', url:"img-04.bmp"}
			],
			dates : {
				start : {
					localDate: '23.09.83',
					localTime: '12:00',
					dateTime: '11:00'
				},
				end : {
					localDate: '23.09.99',
					localTime: '19:00',
					dateTime: '18:00'
				}
			},
			_embedded: {
				venues: [
					{
						name: 'one address'
					}
				]
			}
		};
		var currentEvent = widget.parseEvents(eventSet);
		var generatedObj = {
			address: {"name": "one address"},
			date: {"dateTime": "11:00", "dateTimeEnd": "18:00", "day": "23.09.83", "dayEnd": "23.09.99", "time": "12:00", "timeEnd": "19:00"},
			id: "porky",
			img: "img-03.bmp",
			name: "Tanok na maydani Kongo",
			url: "pie"
		};
		// expect(currentEvent).toEqual(generatedObj);


		var generatedObjNoVenueName = {
			id: 'porky',
			url: 'pie',
			name: 'Tanok na maydani Kongo',
			date: { day: '23.09.83', time: '12:00', dateTime: '11:00', dayEnd: '23.09.99', timeEnd: '19:00', dateTimeEnd: '18:00' },
			address: 'one address',
			img: 'img-03.bmp'
		};

		eventSet._embedded.venues[0]={ address: 'one address' };
		let $widgetModalNoCode = undefined;
		widget.parseEvents(eventSet);
		let currentEventNoVenueName = widget.parseEvents(eventSet);
		// expect(currentEventNoVenueName).toEqual(generatedObjNoVenueName);

	});

});