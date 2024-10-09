
export function debounce(fn, delay, reference) {
    return (...args) => {
        if (reference.timeout) {
            clearTimeout(reference.timeout);
        }
        reference.timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
