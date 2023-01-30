Feature: Booking tickets
	Scenario: Booking one place
		Given user is on "http://qamid.tmweb.ru/client/index.php" page
		When user choose day 6
		When user choose time
		When user select row 8 and seat 2
		When user click button 
		Then user see "Электронный билет"