# Visual
- [x] 3D gaussian distribution function
- [x] Use gaussians to generate galaxy
- [x] Add colors to stars
- [x] Add size to the stars
- [ ] Add blue and black "dust" around the galaxy (shaders?)
- [ ] Get working with 50k star systems (sprites? optimization) 10k is better for gameplay though

# Interaction
- [x] Seedable RNG
- [ ] Add raycasts https://threejs.org/docs/#api/en/core/Raycaster
- [ ] Display UUID on click
- [ ] Add name generation
- [ ] Display name on click
- [ ] Make Galaxy scale 100k?

# OOP
- [ ] Create stellar objects with info
- [ ] Update to TS
- [ ] Refactor galaxy generation code to use objects
- [ ] Create Galaxy root object

# Server
- [ ] Create a game server that runs a basic simulation script on the galaxy (dice rolls)
- [ ] Sync to client via websockets
- [ ] Persist full galaxy in Redis
- [ ] WS forwarding server
- [ ] Dockerize
- [ ] ???


Turn-based. Every player goes and does some strategic action (one action per star system with some optimization), then plays a battle if possible.

Based on how well your bot performs, determines how much stellar range you can interact with per turn.



1. Create the galaxy with basic interaction and visualization
2. Make the galaxy seedable
3. Have a server run dice roll simulations of civilizations expanding on the galaxy
4. Have the turns update each client via ws server
5. Store the galaxy in-memory or in redis idk