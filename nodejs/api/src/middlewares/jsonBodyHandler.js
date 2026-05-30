export async function jsonBodyHandler(request, response) {
    const buffers = []
    for await (const chunk of request) {
        buffers.push(chunk)
    }
    try {
        //concatenar os chunks e converter para String. e String para json
        request.body = JSON.parse(Buffer.concat(buffers).toString())

    } catch (error) {
        request.body = null
    }
    response.setHeader("Content-Type", "application/json")
}

