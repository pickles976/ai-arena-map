import { GalaxyParams } from "../config/GalaxyParams";
import { StarData } from "./StarData";
import { UserData } from "./UserData";
export declare class GalaxyData {
    params: GalaxyParams;
    stars: StarData[];
    starDict: {
        [id: string]: StarData;
    };
    users: UserData[];
    constructor(params: GalaxyParams);
    setUsers(users: UserData[]): void;
    getStarsInRange(starID: string): any[];
}
