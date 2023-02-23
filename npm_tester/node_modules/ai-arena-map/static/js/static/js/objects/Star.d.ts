export const __esModule: boolean;
export class Star {
    constructor(position: any);
    position: any;
    uuid: string;
    name: string;
    starType: number;
    obj: any;
    bubble: any;
    owner: any;
    nameObj: HTMLDivElement;
    generateStarType(): number;
    generateName(): string;
    updateScale(camera: any, frustum: any): void;
    toThreeObject(): any;
    addBubble(): any;
}
