# Cleanup
- [ ] Use npm package w/ bundler?

# Server
- [ ] Make three js visualization updatable from diffs
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

https://blogg.bekk.no/procedural-planet-in-webgl-and-three-js-fc77f14f5505