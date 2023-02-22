import { GalaxyParams } from "../config/GalaxyParams.js"
import { generateGalaxyFromObject } from "../objects/GalaxyGenerator.js"
import { Star } from "../objects/Star.js"
import { getRandomItem } from "../util.js"

export class Galaxy {

    params: GalaxyParams
    stars: Star[]
    users: string[]

    constructor(params : GalaxyParams) {
        this.params = params
        this.stars = generateGalaxyFromObject(this.params.numStars, this.params.arms, this.params, (pos : THREE.Vector3) => new Star(pos))
        this.users = []
    }

    setUsers(users: string[]) {

        this.users = users

        this.users.forEach((user) => {

            let star = getRandomItem(this.stars)

            // loop until we find a star with no owner
            while(!!star?.owner) {
                star = getRandomItem(this.stars)
            }
            star.owner = user
        })

    }

    getStarsInRange() {

    }

    updateStars() {

    }

}