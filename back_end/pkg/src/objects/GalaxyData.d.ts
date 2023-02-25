import { GalaxyParams } from "../config/GalaxyParams";
import { StarData } from "./StarData";
import { UserData } from "./UserData";
export declare class GalaxyData {
    numStars: number;
    params: GalaxyParams;
    stars: StarData[];
    starDict: {
        [id: string]: StarData;
    };
    users: UserData[];
    constructor(numStars: number, params: GalaxyParams);
    setUsers(users: UserData[]): void;
    getStarsInRange(starID: number): any[];
    getEnemyStarsInRange(starID: number): any[] | undefined;
    getUnownedStarsInRange(starID: number): any[];
}
