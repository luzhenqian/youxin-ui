export default JSON.parse(`{
  "version": 1,
  "projects": [
    {
      "name": "api design",
      "desc": "一个 API 设计项目",
      "services": [
        {
          "name": "account",
          "desc": "账户服务",
          "apis": [
            {
              "api": "login",
              "desc": "用于登陆",
              "method": "POST",
              "url": "/login",
              "contentType": "json",
              "body": {
                "username": {
                  "desc": "用户名",
                  "type": "string",
                  "required": true
                },
                "password": {
                  "desc": "密码",
                  "type": "string",
                  "required": true
                }
              },
              "response": {
                "token": {
                  "type": "string"
                }
              },
              "examples": [
                {
                  "desc": "正确的请求",
                  "body": {
                    "username": "张三",
                    "password": "Zhangsan12#$"
                  },
                  "statusCode": 200,
                  "response": {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsInBhc3N3b3JkIjoiWmhhbmdzYW4xMiJ9.OPYBlrlbimRQEdl3Ka61Hbys4-wwBvOdmzQxHkrPM9Y"
                  }
                },
                {
                  "desc": "缺少必选字段，服务器不理解客户端请求",
                  "body": {
                    "username": "张三"
                  },
                  "statusCode": 400
                },
                {
                  "desc": "用户未通过身份验证",
                  "body": {
                    "username": "张三",
                    "password": "Zhangsan12#$%"
                  },
                  "statusCode": 401
                }
              ]
            }
          ]
        }
      ],
      "apis": []
    }
  ]
}`)
