1. API login
endpoint: /login
method: post
body: 
{
    "username": "user01",
    "password": "123456"
}
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "user": {
            "_id": "62829e74cfc7d1bf7ab868f3",
            "username": "user01",
            "password": "123456",
            "isAdmin": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUzOTA4MjM5fQ.ARP_FID2UVEDqMgUkjbS0Un1_VPqHSpd_VVQMQbHVG0"
    }
}

2. API thêm tòa nhà
endpoint: /building/addBuilding
method: post
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
body: 
{
    "buildingName": "B1",
    "warningThreshold": 1005
}
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "msg": "add building success"
    }
}

3. API danh sách tòa nhà
endpoint: /building/getListBuilding
method: get
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "listBuilding": [
            {
                "_id": "6282a421dffb825945deee61",
                "buildingName": "B1",
                "sensor": [],
                "__v": 0,
                "warningThreshold": 1005
            },
            {
                "_id": "6282a55956fe72fc50a0e4a4",
                "buildingName": "B2",
                "__v": 0,
                "sensor": [],
                "warningThreshold": 1004
            }
        ]
    }
}

4. API cập nhật ngưỡng cảnh báo:
endpoint: /building/setting/threshold
method: post
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
body:
{
    "buildingID": "6282a421dffb825945deee61",
    "warningThreshold": 1069
}
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "msg": "update building success"
    }
}

5. API thêm sensor vào tòa nhà
endpoint: /building/setting/addSensor
method: post
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
body:
{
    "buildingID": "6282a421dffb825945deee61",
    "sensorID": 1359
}
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "msg": "add sensor building success"
    }
}

6. API danh sách cảm biến
endpoint: /sensor/getListSensor
method: get
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "listSensors": [
            {
                "_id": "6294da28a0a99ac9b04e269e",
                "name": "MQ5-2303",
                "__v": 0,
                "createdAt": "2022-05-30T14:52:25.101Z",
                "data": 99,
                "updatedAt": "2022-05-30T14:52:56.811Z"
            },
            {
                "_id": "6294da56a0a99ac9b04f22bd",
                "name": "MQ5-2704",
                "__v": 0,
                "createdAt": "2022-05-30T14:53:11.195Z",
                "data": 67,
                "updatedAt": "2022-05-30T14:53:45.048Z"
            }
        ]
    }
}

7.API cập nhật sensor
endpoint: /sensor/updateData
method: post
headers: 
    x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI5ZTc0Y2ZjN2QxYmY3YWI4NjhmMyIsInVzZXJuYW1lIjoidXNlcjAxIiwiaWF0IjoxNjUyNzI3NjY4fQ.uZazPjIN0tCRLjz9lrRQT1mrnFHnbicavFdnLlWDivw
body:
{
    "name": "MQ5-2704",
    "value": 67
}
response: 
{
    "code": 200,
    "message": "OK",
    "data": {
        "msg": "update sensor success"
    }
}


