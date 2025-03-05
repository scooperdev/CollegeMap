# Sheridan College Interactive Room Finder
## Made by Steven Cooper

# Documentation:
https://livesheridan-my.sharepoint.com/:w:/g/personal/stevencooper_sheridan_edu/ERIB_DqAxW5Aprx-IXatIkoBt7Ac49cYW9QpDbFZZFMk5Q?e=bbgJkF


* Work In-Progress 
Interactive campus room finder
Search for rooms and find where they are located on campus
zoom into interactive map 
Browse an interactive campus map seeing how rooms are connected and browse buildings

# HOW TO RUN:
install npm if you have not yet on your machine by doing an install script with your OS's package manager
for example (ubuntu):
sudo apt install nodejs npm

and then, after nodejs and npm are done installing, cd into college-map and run:
npm install 

then, to automate setting up the database, run:
chmod +x run-db.sh

after that set up, to start the app, do:

./run-db.sh
npm run dev

ctrl click the link that pops up in the terminal, and you can see the web app in full!

be sure to run docker stop college-map-db when you are done with the app!

### Current Functionality:

- splash intro screen with title and details 
- building select view
- view of static floor plan image

### To be added later:

- fully integrated database with buildings and corresponding rooms
- search functionality to find room
- room highlight after search
- multiple other buildings
- zoom in and zoom out of map functionality