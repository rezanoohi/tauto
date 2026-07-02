import {convert} from 'html-to-text'

export const htmlToText = (html) => {
    return convert(html, {
        wordwrap: false,
        selectors: [{selector: 'a', options: {ignoreHref: true}}, {
            selector: 'img',
            format: 'skip'
        }, {selector: 'figure', format: 'skip'}]
    });
}