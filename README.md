# Sheridan College Interactive Room Finder (SCIM)
## Made by Steven Cooper

Interactive Campus Room finder! Search for a room and find where it is located on campus!

# Documentation:
* Documentation is a Work-In-Progress
  
# HOW TO RUN:
install npm if you have not yet on your machine by doing an install script with your OS's package manager
for example (ubuntu):
sudo apt install nodejs npm

and then, after nodejs and npm are done installing, cd into CollegeMap/college-map and run:
npm install 

then, to automate setting up the database, run:
chmod +x run-db.sh

after that set up, to start the app, do:

./run-db.sh

then, open another terminal instance keeping the last one open and run 

npm run dev

make sure that you run these commands while inside /college-map/!

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
