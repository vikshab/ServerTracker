### ServerTrack API
https://servertrack.herokuapp.com  

**Endpoint**: Record load for a given server  
**URL**: /record  
**Method**: PUT  
**Data Params**: { server_name: [string], cpu_load : [double], ram_load : [double] }  
**Response Codes**: Success (200 OK), Bad Request Error (400)

**Endpoint**: Display loads for a given server  
**URL**: /:server_name  
**Method**: GET  
**URL Params**: `Required`: server_name=[string]  
**Response Codes**: Success (200 OK)

JSON [see example](https://servertrack.herokuapp.com/example) will return:  
- A list of the average load values for the last 60 minutes broken down by minute  
- A list of the average load values for the last 24 hours broken down by hour


**Build requirements**:
- Node.js, npm
- run `npm install` in the project directory to install node_modules
- sqlite3
