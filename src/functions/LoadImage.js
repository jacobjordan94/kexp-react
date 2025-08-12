export function loadImage(src) {
    return new Promise((res, rej) => {
        const image = new Image();
        image.onload = function() {
            console.log('image loaded', src);
            res(src);
        }
        image.onerror = function() {
            console.log('image error', src);
            rej();
        }
        image.src = src;
    });
}