import ProcessEnv = NodeJS.ProcessEnv
import { IncomingHttpHeaders }         from 'http'
import { GitHttpBackendVariable }      from '../model/git-http-backend-variable'
import { gitHttpBackendVariableNames } from '../model/git-http-backend-variable-names'

export function mapHeadersToEnv (
    headers : IncomingHttpHeaders ,
    options : GitHttpBackendVariable[] = gitHttpBackendVariableNames
) : ProcessEnv {
    const processEnv : ProcessEnv = {}
    for ( let header in headers ) {
        const name = header.toUpperCase ()
                           .replace (
                               /-/g ,
                               '_'
                           )

        if ( options.includes ( name as GitHttpBackendVariable ) ) {
            processEnv[ name ] = headers[ header ] as string
        }
    }
    return processEnv
}
