# Node Git HTTP Backend

This module makes the `git-http-backend` functionalities available for [Node.js]( http://nodejs.org) HTTP Servers,
by piping the HTTP Request through the Common Gateway Interface (CGI). It does not set all variables
defined by [RFC 3875](http://tools.ietf.org/html/rfc3875). Instead, it only defines
the minimum set of variables required by the `git-http-backend`.

# Usage
1. Install git-core
    - $`sudo apt-get install git-core` (for Ubuntu)
2. Check if you can run the command `git-http-backend`
    - Run $`/usr/lib/git-core/git-http-backend`
        - This path may differ for you.
    - Should output:
        - ```fatal: No REQUEST_METHOD from server
          Status: 500 Internal Server Error
          Expires: Fri, 01 Jan 1980 00:00:00 GMT
          Pragma: no-cache
          Cache-Control: no-cache, max-age=0, must-revalidate
        - Hopefully, this is the last error message you see 😉.
3. Create a bare git repository
    - Run $`git init --bare /home/alice/cool-stuff.git`
    - Run $`git update-server-info`
        - Updates the auxiliary info file to help dumb servers ([more info]( https://git-scm.com/docs/git-update-server-info)).
    - Run $`git config http.receivepack true`
        - This serves git send-pack clients, allowing push ([more info]( https://git-scm.com/docs/git-http-backend)).

4. Serve `/home/alice/cool-stuff.git` with your [Node.js]( http://nodejs.org) HTTP Server
    - This example uses the default config and handler to create the server.
    - ```typescript
        import * as http          from 'http'
        import {
        defaultConfig ,
        requestHandler
        } from 'node-git-http-backend'

        const config = defaultConfig (
        '/usr/lib/git-core/git-http-backend' ,
        '/home/alice/cool-stuff.git'
        )

        http.createServer ( requestHandler ( config ) )
        .listen ( 3333 ,
                  () => console.log (
                      `Git backend listening to port 3333.\n` +
                      'If you ran, "npm run-script init-dev-env".\n' +
                      'You should be able to clone the test repository with:\n' +
                      'git clone http://localhost:3333/test.git' ) )
      ```
    - Usually, it is not desired to let everybody push to a repository 😈. Therefore you have to implement
      some middleware logic that makes sure only authenticated users are allowed to pull
      or push, depending on how you want the repository to be accessible. Please have a look
      at the [git-http-backend documentation](https://git-scm.com/docs/git-http-backend).

# Dev
Just run the following commands.
```bash
npm run-script init-dev-env
npm run-script dev
```

# Credits and References
- [git-http-backend Documentation](https://git-scm.com/docs/git-http-backend)
- [git/http-backend.c](https://github.com/git/git/blob/master/http-backend.c)
- [Smart HTTP Transport](https://web.archive.org/web/20120217211308/https://progit.org/2010/03/04/smart-http.html)
- [git-http-backend](https://github.com/substack/git-http-backend)
- [node-cgi](https://github.com/TooTallNate/node-cgi)
- [The Common Gateway Interface (CGI) Version 1.1](https://tools.ietf.org/html/rfc3875)
