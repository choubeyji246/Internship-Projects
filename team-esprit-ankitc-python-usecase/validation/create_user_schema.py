from cerberus import Validator

create_schema={

    "name":{
        "type":"string",
        "required":True,
        "minlength":1,
    },
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

create_user_schema_validator=Validator(create_schema)