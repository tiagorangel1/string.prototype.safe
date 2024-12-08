/* https://support.glitch.com/t/how-to-prevent-xss/30446/22?u=tiagorangel2011 */

String.prototype.safe = function () {
    if (typeof this == "number") {return this}
    return this.split('').join('')
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
}


const Safe = function (input) {
    if (typeof input === "number") {
        return input;
    }
    if (typeof input === "string") {
        return input
            .split('')
            .join('')
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    if (Array.isArray(input)) {
        return input.map(Safe);
    }
    if (typeof input === "object" && input !== null) {
        let safeObj = {};
        for (let key in input) {
            if (input.hasOwnProperty(key)) {
                safeObj[Safe(key)] = Safe(input[key]);
            }
        }
        return safeObj;
    }
    throw new Error("Unrecognized type");
};
