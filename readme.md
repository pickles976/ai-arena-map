# Visual
- [x] 3D gaussian distribution function
- [x] Use gaussians to generate galaxy
- [x] Add colors to stars
- [x] Add size variation to the stars
- [ ] Make the stars grow/shrink with zoom level so they aren't so difficult to navigate
- [ ] Add sphere of influence visualization around claimed stars
- [ ] Add blue and black "dust" around the galaxy (shaders?)
- [ ] Get working with 50k star systems (sprites? optimization) 10k is better for gameplay though

# Interaction
- [x] Seedable RNG
- [x] Add name generation
- [ ] Add raycasts https://threejs.org/docs/#api/en/core/Raycaster
- [ ] Display UUID and name on click
- [ ] Make Galaxy scale 100k?

# OOP
- [x] Create stellar objects with info
- [ ] Update to TS
- [ ] Star stores three js uuid reference
- [ ] Refactor galaxy generation code to store Galaxy object in-memory

# Server
- [ ] Create a game server that runs a basic simulation script on the galaxy (dice rolls)
- [ ] Sync to client via websockets
- [ ] Persist full galaxy in Redis
- [ ] WS forwarding server
- [ ] Dockerize
- [ ] ???


1. Create the galaxy with basic interaction and visualization
2. Make the galaxy seedable
3. Have a server run dice roll simulations of civilizations expanding on the galaxy
4. Have the turns update each client via ws server
5. Store the galaxy in-memory or in redis idk


Every star system has an amount of energy that it can generate per turn.
The amount of energy you save up determines your stellar interaction radius.
Interacting with distant stars will eat up all of your energy.

Each turn you gain energy
Make your strategic moves
Colonize a system or battle over a system
then for your turn, territory (the map) is updated

This repeats for each player until all turns are completed and the next round can begin
Each turn is 10,000 solar years.