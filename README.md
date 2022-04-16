## How To Run 

### Docker
After cloning the repository add executable permissions for `run.sh` and just run the script, that will roll up the container for you.

### Locally 
Won't work on MacOS, cause of missing libraries.
Won't work on Windows, cause of lack of permissions to change python system file. 

Activate python virtual environment with `python3 -m venv .venv` and run `pip install -r requirements.txt`.
Replace `genericpath.py` inside your python3 dir (probably like `/usr/lib/python{version}/genericpath.py`. 
In genericpath.py in this repo only difference is string parsing to function argument. I know it's odd, but that was the only way to make it work. 

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
