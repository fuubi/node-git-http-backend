import { ServerResponse } from 'http'

export function writeBody (
    body : Buffer[] ,
    res : ServerResponse
) {
    body.forEach ( b => res.write ( b ) )
}
