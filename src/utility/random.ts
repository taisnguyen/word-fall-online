/**
 * Returns a random integer between min and max.
 * @param {number} min - The lower bound (inclusive).
 * @param {number} max - The upper bound (inclusive).
 * @param {boolean} [float=false] - Whether to return a float or an integer.
 * @returns {number} A random integer/float between min and max (inclusive).
 */
export function randNum(min: number, max: number, float: boolean = false): number {
    return (float) ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1) + min);
}
