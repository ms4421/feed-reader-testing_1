/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
	//the test suite for all Feeds 
	describe('RSS Feeds', function() {
		//test to see if the AllFeeds variables are defined and not empty
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		//check the url in allFeeds that should not be empty
		it('Urls are not empty', function(){
			allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });

		});


		//check the name in allFeeds to have a value and not empty
		it('names are not empty', function(){
			allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
		});
	});


	//a test suite for the menu
	describe('The menu', function(){
		//test if the menu element is hidden by default
		it('should have default hidden class', function(){
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});

		//test if the click of button hides/displays the menu
		describe('should change visibility when clicked',function(){
			beforeEach(function() {
				$('.menu-icon-link').trigger('click');
			});
			//this test expect menu display when clicked
			it('should show menue when clicked', function(){
				expect($('body').hasClass('menu-hidden')).toBe(false);
			});
			// this test expect menu hidden when clicked again
			it('should hide menue when clicked',function(){
				expect($('body').hasClass('menu-hidden')).toBe(true);
			});

		});
	});
	
	//a test suite named "Initial Entries" 
	describe('Initial Entries', function(){
		//a test to see if loadFeed functions is called and completes its work
		//to make sure it completes its work we use the jasmine done method and beforeEach
		beforeEach(function (done){
			$('.feed').empty();
			console.log("Feed :"+ $('.feed').length);
			loadFeed(0, done);
		});
		it('should have entry', function(done){
			expect($('.feed .entry').length).toBeGreaterThan(0);
			
			done();
		});
	});

	//A suite that will ensure when a feed is loaded by loadFeed its content will change
	describe('New Feed Selection',function(){
		//we will have 2 variables to hold the content before the feed loads and after 
		//and later we will compage the two to see if it changes.
		var contentBeforeFeed, contentAfterFeed;
		//beforeAll and afterAll are jasmine related fucntions we can use here
		beforeAll(function (done) {
			contentBeforeFeed = $('.feed .entry').text();
			console.log("contentBeforeFeed "+contentBeforeFeed);
			//now call the loadFeed
			loadFeed(1,done);
		});
		//compare the change in content before and after loadFeed run
		it('will change content',function(done){
			contentAfterFeed = $('.feed .entry').text();
			console.log("contentAfterFeed "+contentAfterFeed);
			expect(contentAfterFeed).not.toBe(contentBeforeFeed);
			
			done();
		});
		//We have to call afterAll to reset the contents.
		afterAll(function (done) {
			loadFeed(0, done);
		});

	});
}());
