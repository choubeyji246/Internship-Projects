from cerberus import Validator

login_schema={
     "email": {
            "type": "string",
            "minlength": 8,
            "maxlength": 255,
            "required": True,
            "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
        },
        "password":{
            "type":"string",
            "minlength":3,
            "required":True,
        }
}

login_schema_validator=Validator(login_schema)