export function gaussianRandom(mean, stdev) {
    if (mean === void 0) { mean = 0; }
    if (stdev === void 0) { stdev = 1; }
    var u = 1 - Math.random();
    var v = Math.random();
    var z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
}
export function uuid() {
    var length = 18;
    var id = "";
    for (var i = 0; i < length; i++) {
        var num = Math.floor(Math.random() * 36);
        id += num > 9 ? String.fromCharCode(num + 88) : "".concat(num);
    }
    return id;
}
export function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}
export function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}
//# sourceMappingURL=util.js.map