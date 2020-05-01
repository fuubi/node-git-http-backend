import * as http          from 'http'
import {
    defaultConfig ,
    requestHandler
} from '../src'

const config = defaultConfig (
    '/usr/lib/git-core/git-http-backend' ,
    __dirname
)

http.createServer ( requestHandler ( config ) )
    .listen ( 3333 ,
              () => console.log (
                  `Git backend listening to port 3333.\n` +
                  'If you ran, "npm run-script init-dev-env".\n' +
                  'You should be able to clone the test repository with:\n' +
                  'git clone http://localhost:3333/test.git' ) )
