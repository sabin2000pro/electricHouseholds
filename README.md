# eHouseholds

## 1.0 - Application Overview
Most individuals use their electrical appliances such as kettles, dishwashers, and
microwaves to perform the tasks they need to accomplish daily. Electrical appliances
such as washing machines, electric heaters and tumble-driers can be time delayed.
However, not realising that excessive electricity consumption within households is a
major problem. It is a problem financially and environmentally as we keep on using
all our electrical appliances every day to meet our needs. Hence this prevents
consumers from reusing clean electricity from renewable energy sources. It prevents
them because if electrical appliances are used simultaneously throughout
households, then demand for clean energy will not be met because unclean energy
will have to be used from non-renewable sources. 

These non-renewable sources are unclean and emits lots of carbon dioxide which therefore leads to a spike in energy
prices as well as impacting the environment in a negative way. The main problem
that is constantly brought up is the idea of high peak consumption. We want to
increase load balancing and to decrease peak consumption instead of lowering load
balancing.

Once the bidding process begins, households submit a bid that represents the total
number of credits they are willing to spend for their chosen timeslot preferences. The
whole process is deemed to be anonymous because households are not going to
know other what the bids placed by other households are. Furthermore, this
algorithm involves calculating the largest bid placed between the households and at
the end of the auction, the household that places the largest bid receives the
timeslots and pays the number of virtual credits initially allocated. According to [50]
the author mentions in their literature review that for every round the individual who
initiates the auction will enter a value that represents the starting bid amount. At the
same time, the individuals will not be aware of what bid the opposing individual will
place. Thus, the whole process is anonymous. Once all the rounds have finished, the individual who is willing to spend the
largest number of credits wins the round. The maximum value is compared against
the other households. Once the auction finishes, individuals are asked to fill out a
satisfaction form that provides details on their experience with the bidding process.

Furthermore, the second aim is to promote smart clean energy consumption from
national grids in a more decentralised fashion instead of a centralised approach. A
centralised approach usually would be a utility company setting fixed prices for
everyone at different times of the day. This may not guarantee a fair distribution of
electricity consumption. Furthermore, a fair negotiation algorithm is a type of
algorithm that runs on an AI-oriented smart meter within homes. It runs at various
intervals during the day, and it would negotiate a fixed schedule with different smart
meters in other households.

## 1.1 - Project Aims & Objectives
The first aim of this project is to educate households throughout Scotland about the
problem of reducing peak consumption and the different fair negotiation algorithms
that might tackle this, the individuals’ hourly timeslots that they choose to run at
various hours throughout the day are negotiated against other households.
Negotiation happens through a bidding system. This bidding system allows
households to put forward several virtual credits that they wish to spend on their
chosen timeslots through multiple rounds. Households must determine how many
virtual credits they are willing to spend, however they will be left with fewer credits for
the other rounds.

Also, the aim is to educate households further about smart energy consumption.
They are going to be educated about a vital issue known as load balancing.
Potentially individuals who want to tackle climate change through various negotiation
algorithms to retrieve more clean energy from national grids by using renewable
sources more effectively. 

This way, they will be able to experiment with one fair
negotiation algorithm interactively on the web application called the First Price
Sealed Bid algorithm. Households are given several virtual credits to spend for a
given number of rounds. Individuals must figure out how they wish to spend their
credits wisely because they still need to be left with credits for the remaining rounds,
otherwise they risk losing the auction.

## 1.2 - Requirements Specification

This section is going to outline all the requirements that this web application requires.
A MOSCOW Product Backlog table is going to outline the must-have, should have,
and could have requirements. With a focus on the most important ones which are the
must-haves to deliver business value. The must-have requirements are the most
important ones, and they cannot be negotiated. If they are not delivered on time,
then the entire project fails.

An advantage of using MOSCOW is that it is easy to implement and understand. It is
used to overcome Scope Creep as new requirements keep arising throughout the
project. This way developers have a clear insight into the most important
requirements that need to be worked on. It is to ensure business value is added. A
table is outlined below that shows the must-have, should have, and could have
requirements. It also includes a brief explanation as to why they are chosen. An
overall list of functional requirements can be found below. Each requirement is
assigned a number (1,2,3) which is a unique ID that can be referenced. The
requirements are then partitioned and placed within a MOSCOW product backlog
table that can be found in section 3.1.1 which prioritizes the requirements.

1. The Web Application containing a section that contains text which describes
the importance of reducing household electricity consumption.

2. The Web Application must contain a section of text that explains the issue of
Load Balancing and the ways to overcome this problem.

3. The Web Application must have a footer component at the bottom of the
page.

4. The homepage of the web application must have a navigation bar component
that allows users to navigation between pages using React Router.

5. The Web application must allow users to enter the hour as a string of when
they would like to run their electrical appliance.

6. The Web application must allow users to select the appliance they would like
to submit for their hourly preference. The drop-down menu stores a choice of
various appliances set by the admin.

7. The Web application must have a database running to store the user’s hourly
preference as a string.

8. The Web application must have a random allocation algorithm function that
allocates random timeslots to users when a button is pressed.

9. The Web application must allow users to bid for a timeslot they would like to
have allocated if using the First Priced Sealed Bid Algorithm.

10. The Web application must allocate an assigned number of virtual credits for
households to use based on how much they have invested. The administrator
can allocate virtual credits to households by configuring bid settings.

11. Web application must have unit test cases to test the back-end APIs using
Jest.

12. The Web application must have fully functioned End-To-End tests that tests
the front-end features using a testing framework called Cypress.

13. The Web application must allow the users to view the bids placed for
timeslots.

14. The Web application must prevent against XSS attacks using a package
called xss-clean.

15. The Web Application is going to have Rate Limiting incorporated to prevent
against Denial-of-Service attacks coming from the same IP address.

16. The Web application is going to prevent against Parameter Pollution Attacks
on the back end.

17. Web application is going to allow only two administrators to register every 90
days.

18. Web application is going to have a timer in the First Priced Sealed Bid
Algorithm section which counts down from 10 seconds. Users have 10
seconds to place a bid, otherwise the input field gets reset as well as the
timer.

19. Web application could support animations to make it look more appealing.

20 .Web application is going to allow Administrators to Register an account.

21. Web application is going to allow Administrators to Login into their account.

22. Web application is going to allow Administrators to Reset their password from
a forgot password link. Node Mailer is going to be used as an SMTP server
for e-mail transmission.

23. The Web application is going to allow Admins to create electrical appliances
which are going to be stored in a MongoDB database.

24. The Web application is going to allow Admins to Edit the content of an
electrical appliance.

25. The Web application is going to allow Admins to Delete an electrical
appliance.

26. The Web Application must be protected against NoSQL injection attacks.

27. The Web application is going to be developed using the Model View
Controller (MVC) architecture pattern.

28. The First Price Seal Bid algorithm is going to have a button that allows users
to view the minimum bid placed. Invokes function that finds the minimum
value in the array of bids.

29. The First Priced Seal Bid Algorithm is going to have a field where users will be
able to view the maximum bid placed. Invokes function that finds the
maximum value in the array of bids.

30. The First Priced Seal Bid Algorithm is going to have a modal that users can
view how many bids have been placed and who won the bidding round.

31. The First Priced Bidding Algorithm which is a fair negotiation algorithm is
going to allow users to bid against bots given several rounds. Every user is
going to have several virtual credits to bid per round.

32. Virtual Credits left after a round are taken forward to be used for the next
round.

33. The AI bot is going have configured several Virtual Credits that the bot can
spend from the Admin Dashboard.

34. The AI bot is also going to have three levels of intensity which are Low,
Medium, and Intense. Low intensity bots will place smaller bids between a
specified range and an intense bot will place an extremely high bid with
respect to the number of Virtual Credits Available.

35. There are going to be several rounds where users can bid for their timeslots.
The maximum number of rounds initially will be capped at 3, for the three
preferences chosen

## 1.3 - Non-Functional Requirements

1. Load the website in < 3 seconds given that the number of simultaneous users
exceeds 1000.

2. Query Optimization. A fast database data retrieval. Fetch all preferences data
given > 1000 database entries created by 100+ simultaneous users.

3. Place auction bids in < 3 seconds without any delay given 1000+
simultaneous users placing bids against other households.

4. The Web Application must still function and be rendered available in the event
of an attempted Denial of Service attack.

5. The admin schema data in the database must maintain its integrity, especially
the hashed password in the event of a NoSQL Injection attack pre protection.

## 1.4 Use Case Diagram - User

Use Case Diagrams are visual representations of how specific end-users interact
with a software system. The main purpose of use case diagrams is to capture the
requirements of an entire application and represent them in a visual diagram. Use
Case diagrams consisting of arrows, connectors, and actors. Use case diagrams
also define the overall scope of the project. For this web application, there are only
two actors defined. The consumers (end-users) of the web application who want to
learn more about smart energy consumption and load balancing and the
administrators are also considered to be actors because they have separate
functions that are isolated from the users. For example, administrators can register
an account, log in and create various electrical appliances to be stored in the
database.

An advantage of using Use Case diagrams is that it allows developers to gain a
deeper understanding of how the system works. Also, the flow of sequential activities
in these diagrams are outlined one after the other, making it easier to understand for
the users how the entire system functions. Admin functionalities are going to differ
from the regular user interactions. Initially, users will not be able to access admin
routes because it is not feasible to create many admin accounts at once.

![User Use Case Diagram](https://user-images.githubusercontent.com/29733613/183455583-b540ef7f-6565-44c0-b38e-be6fa2a96a30.png)

Regular users of the application will be presented initially with the electrical
appliance they will have to run during their chosen timeslots. Users can select a
timeslot preference in the form of hourly (1 hour) timeslots such as “12:00-13:00”,
“15:30-16:30” etc. If the users are not happy with the timeslots they entered, they
can always modify the timeslot by sending a PUT request to the server. Users can
also delete their timeslot preference if they are not happy. If timeslots are deleted,
users will have to choose another timeslot for an electrical appliance. Users will
experiment with one fair negotiation algorithm.

The first algorithm randomly allocates a timeslot from a JSON file by going through
every timeslot in an array. Users can also submit bids for timeslots they would like to
have allocated against other households. However, they are given a certain number
of virtual credits they must use which is configured from an admin dashboard. After
users submit a bid, the current highest bid field is updated which shows what the
highest bid so far was.

## 1.5 Use Case Diagram - Admin I
![Admin User Case Diagram](https://user-images.githubusercontent.com/29733613/183458644-b8c6d5ff-3606-45d6-b665-1d1426527b69.png)

## 1.5.1 - Use Case Diagram - Admin II (Authentication)

![Admin Use Case Diagram II](https://user-images.githubusercontent.com/29733613/183462794-581205a5-f3d3-4d55-a666-86e652087199.png)

## 1.6 - First Priced Sealed Bid Algorithm Design

The First Priced Sealed Bidding Algorithm is a type of fair negotiation algorithm that
allows users to bid their allocated virtual credits against a bot that has their
corresponding virtual credits as well with the bots having different levels of bidding
intensity. Initially, if no bots are found then the bidding cannot even start because the
user has no 3rd party to bid against. Moreover, these virtual credits can be
configured from the admin dashboard according to how much money has been
invested into green energy systems. This is fairer because the more money a
household invests, the more credits they will be allocated to spend on bidding
compared to the initial size of households.

Households could have the same size,
but one might have invested more than the other, therefore A low-intensity bot can
place a very low (weak) bid within a smaller range concerning the number of virtual
credits available for the bot. The default number of virtual credits available for both
the user and bot is 30 and throughout the specified number of rounds, the credits
must be equally dispersed such that the bot and user have enough for all the
available rounds. However, the virtual credits can easily be configured from the
Admin Dashboard and can increase at any point. Also, a medium intensity bot will
place a bid slightly greater than the weaker bot but within a different range. 

Finally, the intense bot will place a very high bid at random within a specified range that is bigger than the medium and weaker bots and therefore makes it harder for the user to defeat. Furthermore, at the end of one round, whoever has placed the highest bid,
is awarded that preference for that round. The winner can either be the bot or the
user depending on the maximum bid placed. Whoever runs out of virtual credits first,
i.e whoever has placed the largest bid at the end of 60 seconds, receives their
desired preferences for the desired appliance. The pseudocode for this algorithm
can be found below as well as an activity diagram that represents sequential flows of
activities that represents how the algorithm is going to be implemented with various
Boolean checks that determine if a condition has been met or not.

1.0 - Display the Opening Bid on Screen via State.

1.1 - Display Preference 1 of a given user on the screen.

1.2 - Display Preference 2 of a given user on the screen.

1.3 - Display the Preference 3 of a given user on the screen.

1.4 - Display the Appliance the user has chosen for the above three preferences.

1.5 - Display the round number on the screen in the form: Round: “X”. X is a mutable
value that changes when the round is over after 30 seconds

1.6 - Start Bid Button Clicked.

1.7 – Begin 30 second countdown timer.

1.8 – (User) Enter desired single bid for the first preference.

1.9 – If no bid has been entered or if the bid entered is equal to 0, display error
message. User input bid field disappears since it is the bots turn.

2.0 – After a 3 second timeout, a random bot type gets ready to place a random bid
within their allocated range.

2.1 – (Bot) Bot automatically inputs a bid in an input field while user input is restricted.

2.2 – (Bot) – Deduct the bot’s virtual credits if bot bid > user bid and wins the rounds.

2.3 – Round over.
