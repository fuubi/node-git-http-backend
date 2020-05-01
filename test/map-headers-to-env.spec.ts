import ProcessEnv = NodeJS.ProcessEnv
import { gitHttpBackendVariableNames } from '../src/model/git-http-backend-variable-names'
import { mapHeadersToEnv }             from '../src/mapper/map-headers-to-env'


describe (
    'Map HTTP Header Fields to Git backend enviroment variables' ,
    () => {
        it (
            'should map uppercase Field' ,
            () => {
                const headers = {
                    'QUERY_STRING' : 'service=git-upload-pack'
                }

                const env : ProcessEnv = mapHeadersToEnv (
                    // @ts-ignore
                    headers ,
                    gitHttpBackendVariableNames
                )

                expect ( headers )
                    .toStrictEqual ( env )
            }
        )
    } )
