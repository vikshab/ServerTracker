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

Example of returned JSON:  
- A list of the average load values for the last 60 minutes broken down by minute  
- A list of the average load values for the last 24 hours broken down by hour

<pre>
{
  "avgLastHour":[],
  "avgLastDay":
  [
    {"average_cpu_load":59000,"average_ram_load":59000,"time":"2016-09-01T11:04:33.623Z"},
    {"average_cpu_load":62000,"average_ram_load":62000,"time":"2016-09-01T10:04:33.623Z"},
    {"average_cpu_load":65000,"average_ram_load":65000,"time":"2016-09-01T09:04:33.623Z"},
    {"average_cpu_load":68000,"average_ram_load":68000,"time":"2016-09-01T08:04:33.623Z"},
    {"average_cpu_load":71000,"average_ram_load":71000,"time":"2016-09-01T07:04:33.623Z"},
    {"average_cpu_load":74000,"average_ram_load":74000,"time":"2016-09-01T06:04:33.623Z"},
    {"average_cpu_load":77000,"average_ram_load":77000,"time":"2016-09-01T05:04:33.623Z"},
    {"average_cpu_load":80000,"average_ram_load":80000,"time":"2016-09-01T04:04:33.623Z"},
    {"average_cpu_load":83000,"average_ram_load":83000,"time":"2016-09-01T03:04:33.623Z"},
    {"average_cpu_load":86000,"average_ram_load":86000,"time":"2016-09-01T02:04:33.623Z"},
    {"average_cpu_load":89000,"average_ram_load":89000,"time":"2016-09-01T01:04:33.623Z"},
    {"average_cpu_load":92000,"average_ram_load":92000,"time":"2016-09-01T00:04:33.623Z"},
    {"average_cpu_load":95000,"average_ram_load":95000,"time":"2016-08-31T23:04:33.623Z"},
    {"average_cpu_load":98000,"average_ram_load":98000,"time":"2016-08-31T22:04:33.623Z"},
    {"average_cpu_load":101000,"average_ram_load":101000,"time":"2016-08-31T21:04:33.623Z"},
    {"average_cpu_load":104000,"average_ram_load":104000,"time":"2016-08-31T20:04:33.623Z"},
    {"average_cpu_load":107000,"average_ram_load":107000,"time":"2016-08-31T19:04:33.623Z"},
    {"average_cpu_load":110000,"average_ram_load":110000,"time":"2016-08-31T18:04:33.623Z"}
  ]
}
</pre>
