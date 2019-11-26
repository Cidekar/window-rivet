/*eslint no-console: ["error", { allow: ["warn"] }] */

import { Configuration } from './Configuration'

/**
 * Log a message to the console.
 * @param {String} message A message to display in the console
 * @return null
 */
function log(message): void{
    if (!Configuration.getConfiguration('silent')){
        console.warn(message)
    }
}

export { log }