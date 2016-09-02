### ServerTrack API

**Title**: Record load for a given server  
**URL**: https://servertrack.herokuapp.com/record  
**Method**: PUT  
**Data Params**: { server_name: [string], cpu_load : [double], ram_load : [double] }  
**Response Codes**: Success (200 OK)

**Title**: Display loads for a given server  
**URL**: https://servertrack.herokuapp.com/average/:server_name  
**Method**: GET  
**URL Params**: Required: server_name=[string]  
**Response Codes**: Success (200 OK)

JSON  will return:  
- A list of the average load values for the last 60 minutes broken down by minute  
- A list of the average load values for the last 24 hours broken down by hour

[example](https://servertrack.herokuapp.com/example)
