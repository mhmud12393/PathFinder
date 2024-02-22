Django Back-End React Front-End Application that calculates
The most suitable (with most power) link station for a device at given
point [x,y].
solved in 2-dimensional space. Link stations have reach and power.
A link station’s power can be calculated:
power = (reach - device's distance from linkstation)^2
if distance > reach, power = 0
Link stations​ are located at points (x, y) and have reach (r) ([x, y, r]): (additional Link-Stations can be added on Localhost:8000)
[[0, 0, 10],
[20, 20, 5],
[10, 0, 12]]

*** how to run ***

---------------------------------
starting from the Container Folder
Start the Back-End by running:
cd Pathfinder
python manage.py runserver
---------------------------
Start the Front-End by running:
cd frontend
npm start
--------------------------------
