export function loadImage(src) {
    return new Promise((res, rej) => {
        const image = new Image();
        image.onload = function() {
            res(src);
        }
        image.onerror = function() {
            rej();
        }
        image.src = src;
    });
}