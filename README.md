## ENDPOINTS

Every endpoint will return certain response format

```json
{
  "message": "Description of what happened",
  "data": "Dictionary type holding the content of the response OR null"
}
```

### /files/uploads

`POST`

**Response**

- `200 OK` on success
- `404 Not Found`
  - `file` key wasn't present in request body while sending file to server
  - file itself wasn't attached
- `422 UNPROCESSABLE ENTITY` if file wasn't part of ALLOWED_FILES

### /publications/process 

`POST` 

**Response** 
- `200 OK` on success
- `404 Not Found` if `file_path` was not provided