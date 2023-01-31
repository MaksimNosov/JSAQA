Feature: Booking tickets
	Scenario: Booking one seat
		Given user is on "http://qamid.tmweb.ru/client/index.php" page
		When user choose day 7
		When user choose time
		When user select row 8 and seat 5
		When user click button
		Then user see "Электронный билет"

	Scenario: Reservation two seat
		Given user is on "http://qamid.tmweb.ru/client/index.php" page
		When user choose day 7
		When user choose time
		When user select row 8 and seat 6
		When user select row2 8 and seat2 7
		When user click button
		Then user see "Электронный билет"

	Scenario: Can't buy a ticket with a taken seat
		Given user is on "http://qamid.tmweb.ru/client/index.php" page
		When user choose day 6
		When user choose time
		When user select the booked place
		Then user see button disabled 'true'


