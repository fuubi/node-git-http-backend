import { spawn }                from 'child_process'
import {
    IncomingMessage ,
    ServerResponse
}                               from 'http'
import { GitHttpBackendConfig } from '../../config/model/config'
import { writeData }            from './commands/write-data'


export function requestHandler (
    config : ( req : IncomingMessage ) => GitHttpBackendConfig
) {
    return function (
        req : IncomingMessage ,
        res : ServerResponse
    ) {
        const { env , gitBackendPath } = config ( req )
        const gitHttpBackend = spawn (
            gitBackendPath ,
            { env }
        )

        req.pipe ( gitHttpBackend.stdin )

        const buffers : { header : Buffer[], body : Buffer[], completedHeader : boolean } = {
            header :          [] ,
            body :            [] ,
            completedHeader : false
        }

        gitHttpBackend.stdout.on ( 'data' ,
                                   ( ( chunk : Buffer ) => writeData (
                                       chunk ,
                                       buffers ,
                                       res
                                   ) ) )

        gitHttpBackend.on ( 'close' ,
                            () => {
                                res.end ()
                            }
        )

    }
}

