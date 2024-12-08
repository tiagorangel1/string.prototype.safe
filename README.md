<div align="center" text-align="center" style="text-align: center;">
<h1>string.prototype.safe</h1>
<p>Make anything safe</p>
</div>

A simple function to make anything safe so no one can XSS your website.

```
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
```
