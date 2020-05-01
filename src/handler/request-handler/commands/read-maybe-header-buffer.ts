export function readMaybeHeaderBuffer (
    nextBuffer : Buffer ,
    buffers : { header : Buffer[], body : Buffer[] }
) {
    const completeHeader = false
    const length         = Buffer.from (
        '\r\n\r\n' ,
        'utf-8'
    ).length

    const offset = nextBuffer.indexOf (
        '\r\n\r\n' ,
        0 ,
        'utf-8'
    )

    if ( offset > 0 ) {
        const headerLines = nextBuffer.slice (
            0 ,
            offset
        )
        buffers.header.push ( headerLines )
        buffers.body.push ( nextBuffer.slice ( offset + length ) )

        return true
    }
    return completeHeader
}
