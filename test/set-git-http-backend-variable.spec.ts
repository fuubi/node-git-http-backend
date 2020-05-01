import ProcessEnv = NodeJS.ProcessEnv
import { setGitHttpBackendVariable } from '../src/commands/set-git-http-backend-variable'

describe (
    'Set Git backend variable' ,
    () => {
        it (
            'should set a git backend variable' ,
            () => {

                const env : ProcessEnv = {}
                setGitHttpBackendVariable (
                    env ,
                    'PATH_TRANSLATED' ,
                    '/home/alice/public/'
                )
                expect ( env[ 'PATH_TRANSLATED' ] )
                    .toStrictEqual (
                        '/home/alice/public/'
                    )
            }
        )
    } )
