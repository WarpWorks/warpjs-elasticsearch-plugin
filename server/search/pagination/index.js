/**
 *  This module will return a list of potential pages to represent the following
 *  scenarios:
 *
 *      < | "1" | >
 *      < | "1" | 2 | >
 *      < | "1" | 2 | ... | >
 *      < | 1 | "2" | 3 | >
 *      < | 1 | "2" | 3 | ... | >
 *      < | ... | 2 | "3" | 4 | ... | >
 *      < | ... | "4" | 5 | >
 *      < | ... | 4 | "5" | >
 *
 *  Each resource will be:
 *
 *      {
 *          isPrevious: true/false,
 *          isNext: true/false,
 *          isEllipsis: true/false,
 *          disabled: true/false,
 *          page: number
 *      }
 */

const previousArrow = require('./previous-arrow');
const previousEllipsis = require('./previous-ellipsis');
const previousPage = require('./previous-page');
const currentPage = require('./current-page');
const nextPage = require('./next-page');
const nextEllipsis = require('./next-ellipsis');
const nextArrow = require('./next-arrow');

module.exports = (total, q, p, size) => {
    const chunks = Math.ceil(total / size);

    return []
        .concat(previousArrow(q, p, chunks))
        .concat(previousEllipsis(q, p, chunks))
        .concat(previousPage(q, p, chunks))
        .concat(currentPage(q, p, chunks))
        .concat(nextPage(q, p, chunks))
        .concat(nextEllipsis(q, p, chunks))
        .concat(nextArrow(q, p, chunks))
    ;
};
