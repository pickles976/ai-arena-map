# Visual
- [x] 3D gaussian distribution function
- [x] Use gaussians to generate galaxy
- [x] Add colors to stars
- [x] Add size variation to the stars
- [x] Make the stars grow/shrink with zoom level so they aren't so difficult to navigate
- [x] Convert stars to sprites
- [x] Add blue hue
- [ ] Add Black dust
- [ ] Figure out a way to draw friendly star systems/enemy star systems (draw green and red circles with no opacity on layer 2, then render and add)
- [ ] Show names and info of closest stars
- [ ] Add skybox

# Interaction
- [x] Seedable RNG
- [x] Add name generation
- [x] Add raycasts https://threejs.org/docs/#api/en/core/Raycaster
- [x] Display name on mouseover https://threejs.org/examples/webgl_raycaster_sprite.html
- [x] Raycasting sucks

# OOP
- [x] Create stellar objects with info
- [x] Star stores three js object reference
- [ ] Update to TS
- [ ] Refactor galaxy generation code to store Galaxy object in-memory
- [ ] Make Galaxy generation code work in node without Three integration

# Server
- [ ] Create a game server that runs a basic simulation script on the galaxy (dice rolls)
- [ ] Sync to client via websockets
- [ ] Persist full galaxy in Redis (just uuids + game state info)
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