import { AbstractKernel } from '../abstract/Kernel'
import { Configuration } from './Configuration'
import { SystemHooks } from './SystemHooks'
import { Dispatcher } from '../components/Dispatcher'
import { Receiver } from '../components/Receiver'


export class Kernel extends Configuration implements AbstractKernel{

    constructor () {
        super()
    }
   
    boot = (configuration?: object): void => {

        this.checkSecurityConcerns(configuration)

        this.setConfiguration(configuration)

        SystemHooks.boot()

        Dispatcher.boot()
        
        Receiver.boot()   

        SystemHooks.call('mounted')

    }

    checkSecurityConcerns = (configuration): void => {
        const concerns = {
            origin: {
                validator: () => {
                    
                    // Origin for dispatcher or receiver not provided 
                    if (!configuration.dispatcherOrigin && !configuration.receiverOrigin){
                        return false
                    }
                    // Origin for dispatcher or receiver wildcard
                    if (configuration.dispatcherOrigin && configuration.dispatcherOrigin.toString() === '*' || configuration.receiverOrigin && configuration.receiverOrigin.toString() === '*' ) {
                        return false
                    } 
                    return true
                },
                message: 'Always specify an exact target origin, not *. Please update your configuration to fix this security issue.'
            }
        }

        for (let [key, value] of Object.entries(concerns)) {
            if(!value.validator()){
                window.console.warn(`[@cidekar/window-rivet] ${value.message}`)
            }

        }
    }
    
} 