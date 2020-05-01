import { ServerResponse } from "http"

export function writeHeader (
    header : Buffer[] ,
    res : ServerResponse
) {
    const headerLines = Buffer.concat ( header )
                              .toString ()
                              .split ( '\r\n' )
    for ( let headerLine of headerLines ) {
        const headerSplit = headerLine.split ( ':' )
        const headerKey   = headerSplit[ 0 ]
        const headerVal   = headerSplit[ 1 ]
        res.setHeader (
            headerKey ,
            headerVal
        )
    }
}
