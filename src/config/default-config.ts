import {
    IncomingHttpHeaders ,
    IncomingMessage
}                                      from 'http'
import { setGitHttpBackendVariable }   from '../commands/set-git-http-backend-variable'
import { mapHeadersToEnv }             from '../mapper/map-headers-to-env'
import { gitHttpBackendVariableNames } from '../model/git-http-backend-variable-names'
import { GitHttpBackendConfig }        from './model/config'


export default function defaultConfig ( gitBackendPath : string ,
                                        projectRoot : string
) {
    return function ( req : IncomingMessage ) : GitHttpBackendConfig {

        const url = require ( 'url' )
            .parse ( req.url )


        const env = mapHeadersToEnv (
            req.headers as IncomingHttpHeaders ,
            gitHttpBackendVariableNames
        )

        setGitHttpBackendVariable (
            env ,
            'GIT_PROJECT_ROOT' ,
            projectRoot
        )

        setGitHttpBackendVariable (
            env ,
            'PATH_TRANSLATED' ,
            projectRoot + url.pathname
        )

        setGitHttpBackendVariable (
            env ,
            'PATH_INFO' ,
            url.pathname
        )


        setGitHttpBackendVariable (
            env ,
            'REQUEST_METHOD' ,
            req.method
        )


        setGitHttpBackendVariable (
            env ,
            'GIT_HTTP_EXPORT_ALL' ,
            '1'
        )

        setGitHttpBackendVariable (
            env ,
            'QUERY_STRING' ,
            url.query
        )

        return {
            env ,
            gitBackendPath
        }
    }
}
