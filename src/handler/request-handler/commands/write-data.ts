import { ServerResponse }        from 'http'
import { readMaybeHeaderBuffer } from './read-maybe-header-buffer'
import { writeBody }             from './write-body'
import { writeHeader }           from './write-header'

export function writeData (
    chunk : Buffer ,
    buffers : { header : Buffer[]; body : Buffer[], completedHeader : boolean } ,
    res : ServerResponse
) {
    if ( buffers.completedHeader ) {
        res.write ( chunk )
    }
    else {
        buffers.completedHeader = readMaybeHeaderBuffer (
            chunk ,
            buffers
        )
        if ( buffers.completedHeader ) {

            writeHeader (
                buffers.header ,
                res
            )
            writeBody (
                buffers.body ,
                res
            )
        }
    }
}

