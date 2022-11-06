export function getTop(array: any[]) {
    if (array.length === 0) {
        return undefined;
    }

    return array[array.length - 1];
}

export function isNum(val: string) {
    return /^\d+$/.test(val);
}