# Visual
- [x] 3D gaussian distribution function
- [x] Use gaussians to generate galaxy
- [x] Add colors to stars
- [x] Add size variation to the stars
- [x] Make the stars grow/shrink with zoom level so they aren't so difficult to navigate
- [x] Convert stars to sprites
- [x] Add blue hue
- [x] Figure out a way to draw friendly star systems/enemy star systems (draw green and red circles with no opacity on layer 2, then render and add)
- [x] Show names and info of closest stars
- [x] Scale name based on distance
- [ ] Add skybox w/ shader

# Bugs
- [x] Center text better
- [x] Add some sort of frustum-based text drawing so it doesn't feel as awkward (dont render stuff on periphery?)
- [x] Only render stars that are ON SCREEN

# Interaction
- [x] Seedable RNG
- [x] Add name generation
- [x] Add raycasts https://threejs.org/docs/#api/en/core/Raycaster
- [x] Display name on mouseover https://threejs.org/examples/webgl_raycaster_sprite.html
- [x] Raycasting sucks

# OOP
- [x] Create stellar objects with info
- [x] Star stores three js object reference
- [ ] Generate galaxy data structure 
- [ ] Generate galaxy three js visualization from params and data structure
- [ ] Make three js visualization updatable from diffs
- [ ] Update to TS
- [ ] Use npm package w/ bundler?

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