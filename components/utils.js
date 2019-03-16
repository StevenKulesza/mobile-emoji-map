/**
 * Create a new canvas based on height and width of 2D Array
 * @param {Number} w - width value
 * @param {Number} h - height value
 * @param {string} val - value to insert into each array
 */
export const makeArray = (w, h, val) => {
    let arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

/**
 * Copy data to clipboard
 * @param {any} itemToCopy - data to copy to clipboard
 */
export const copyAnyToClipboard = itemToCopy => {
    const textField = document.createElement('textarea');
    textField.value = itemToCopy;
    textField.setAttribute('readonly', '');
    textField.style.position = 'absolute';
    textField.style.left = '-9999px';
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
};


/**
 * Create a new canvas based on height and width of 2D Array
 * @param {Object} currentArr - The array to update
 * @param {Number} h - height value to update to
 * @param {Number} w - width value to update to
 * @param  {Number} val - the value to fill new items with
 */
export const resizeArray = (currentArr, h, w, val = null) => {
    const arrCopy = [...currentArr];
    const newRow = row => Array.from({
        length: w
    }, (_, i) => {
        return i < row.length ? row[i] : val
    });
    return Array.from({
        length: h
    }, (_, i) => {
        return i < arrCopy.length ? newRow(arrCopy[i]) : Array.from({
            length: w
        }, () => val);
    });
}