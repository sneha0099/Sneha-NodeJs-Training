const http = require("http");
const fs = require("fs").promises
const path = require("path")

const dataFilePath = path.join(__dirname, "data.json");

function sendResponse(res, statusCode, data){
    res.setHeader('Content-Type','application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(data));
}

async function parseRequestBody(req) {
    let body = ''
    for await(const chunk of req){
        body += chunk
    }
    try {
        return JSON.parse(body)
    } catch (error) {
        throw new Error ("Invalid json data")
    }
}

async function readDataFile() {
    try {
        const data = await fs.readFile(dataFilePath, "utf8")
        return JSON.parse(data)
    } catch (error) {
        throw new Error("Error in reading file")
    }
}

async function writeDataFile(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8")
    } catch (error) {
        throw new Error("Error in writing file")
    }
}

const server = http.createServer(async (req,res)=>{
    const {method, url: requestUrl} = req;
    const pathname = requestUrl.split('?')[0];
    console.log("REQURL",requestUrl);
    

    if(pathname === "/data"){
        if(method === "GET"){
            try {
                const data = await readDataFile();
                sendResponse(res, 200, {data})
            } catch (error) {
                sendResponse(res, 500, { message: error.message });
            }
           
        }
        else if (method === "POST") {
            try {
                const newData = await parseRequestBody(req);
                const data = await readDataFile();
                data.push(newData);  // Add new data to the existing array
                await writeDataFile(data);
                sendResponse(res, 201, { message: "Data created successfully", data: newData });
            } catch (error) {
                sendResponse(res, 500, { message: error.message });
            }
        }
        else if(method === "DELETE"){

        try {

            const urlparams = new URLSearchParams(requestUrl.split('?')[1]);
            console.log(urlparams);
            
            const idToDelete = urlparams.get('id');
            console.log(idToDelete);
            

            if (!idToDelete) {
                return sendResponse(res, 400, { message: "Missing id query parameter" });
            }
                const data = await readDataFile();
                const newData = data.filter(item => item.id != idToDelete)
                await writeDataFile(newData)
                sendResponse(res, 200, { message: "Data deleted successfully" })
        } catch (error) {
                sendResponse(res, 500, { message: error.message });
        }
        }
        else if(method === "PUT"){
            try {
                const updatedData = await parseRequestBody(req)
                await writeDataFile(updatedData)
                sendResponse(res,200,{ message: "Data updated successfully" , updatedData})
            } catch (error) {
                sendResponse(res, 500, { message: error.message });
            }
        }
        else if(method === "PATCH"){
            try {
                const patchData = await parseRequestBody(req)
                const data = await readDataFile()

                const index = data.findIndex(item => item.id == patchData.id);
                if (index !== -1) {
                    data[index] = {...data[index], ...patchData}
                    await writeDataFile(data)
                    sendResponse(res, 200, { message: "Data partially updated" , data})
                } else {
                    sendResponse(res, 404, { message: "Item not found" });
                }
            } catch (error) {
                sendResponse(res, 500, { message: error.message });
            }
        }else{
            sendResponse(res, 405, { message: "Method Not Allowed" });
        }
    }else{
        sendResponse(res, 404, { message: "Not Found" });
    }

})

const port = 3000;
server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})