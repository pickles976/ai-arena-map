import { UserData } from "./UserData";
import { Vector3 } from '@math.gl/core';
export declare class StarData {
    owner: UserData | null;
    position: Vector3;
    uuid: number;
    starType: number;
    name: string;
    energy: number;
    constructor(position: Vector3, id: number);
    generateStarType(): number;
    generateName(): string;
    updateOwner(user: UserData): void;
    update(): void;
}
