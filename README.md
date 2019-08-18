# Calcutta League

A fantasy sports website dedicated solely to March Madness Calcutta style leagues.  Create a league and invite your friends to join you for the best way to experience March Madness.  The way it works is simple: After Selection Sunday, pick a date and time to run the live auction with your friends.  The auction is completely online, so you can participate from anywhere in the world.

Each team is auctioned off to the highest bidder until all teams have been sold.  Your teams win you money based on the number of wins they get throughout the tournament, with later rounds counting for a larger portion of the total prize pool.  Your teams' performance will automatically be tracked as the tournament progresses, with your total payout updating daily.

https://www.calcuttaleague.com

## Techie Info

- Hosting

  Heroku

- Frontend

  React (w/ Hooks)

- Backend

  NodeJS with MySQL and Firebase

  The MySQL database lives on the JawsDB free tier addon provisioned through Heroku, while Firebase handles the authentication and realtime functionality of the app.

  The realtime functionality of Firebase's cloud firestore is perfect for handling multiple people trying to bid and chat within the same league