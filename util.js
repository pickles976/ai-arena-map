export function gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random(); //Converting [0,1) to (0,1)
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

export function uuid() {
    let length = 36
    let id = ""
    for (let i = 0; i < length; i++) {
        let num = Math.floor(Math.random() * 36)
        id += num > 9 ? String.fromCharCode(num + 88) : `${num}` // 0->9 returns a number, 10 + returns a character. 97 is lowercase a, 88 comes from 97 - 9
    }
    return id
}

export function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)]
}

export function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value))
}