import { GalaxyData, GALAXY_PARAMS, UserData } from "./index";
test("Galaxy generation works", function () {
    var galaxy = new GalaxyData(GALAXY_PARAMS);
    expect(galaxy.stars.length).toBe(GALAXY_PARAMS.numStars + 1);
});
test("Galaxy adds users", function () {
    var galaxy = new GalaxyData(GALAXY_PARAMS);
    galaxy.setUsers([new UserData("0", "Alice", "#FFFFFF"), new UserData("1", "Bob", "#00FF00"), new UserData("2", "Candice", "#0000FF")]);
    expect(galaxy.users.length).toBe(3);
});
test("Get stars in range works", function () {
    var galaxy = new GalaxyData(GALAXY_PARAMS);
    var star = galaxy.stars[0];
    star.update();
    console.log(galaxy.getStarsInRange(star.uuid).length);
});
