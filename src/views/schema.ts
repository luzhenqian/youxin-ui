interface Schema {
	version: string
	projects: Projects
}

type Projects = Project[]

interface Project {
	name: string
	desc: string
	services: Services
}

type Services = Service[]

interface Service {
	name: string
	desc: string
	apis: APIs
}

type APIs = API[]

type API = APIBase | (APIBase & POST<Response>)

interface APIBase {
	api: string
	desc: string
	method: Method
	url: string
}

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	OPTIONS = 'OPTIONS',
	HEAD = 'HEAD',
}

interface POST<Response> {
	contentType: string
	body: any
	response: any
	examples: Examples<Response>
}

enum ContentType {
	text = 'text/plain',
	json = 'application/json',
	xml = 'application/xml',
	html = 'text/html',
}

interface Example<Response> {
	desc: string
	body?: string
	statusCode: StatusCode
	response?: Response
}

type Examples<Response> = Example<Response>[]

enum StatusCode {
	'OK' = 200, // [GET] 服务器成功返回用户请求的数据，该操作是幂等的。
	'CREATED' = 201, // [POST/PUT/PATCH] 用户新建或修改数据成功。
	'ACCEPTED' = 202, // [*] 表示一个请求已经进入后台排队（异步任务）。
	'NO_CONTENT' = 204, // [DELETE] 用户删除数据成功。
	'INVALID_REQUEST' = 400, // [POST/PUT/PATCH] 用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
  'UNAUTHORIZED' = 401,// [*] 表示用户没有权限（令牌、用户名、密码错误）。
  'FORBIDDEN' = 403,// [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
  'NOT_FOUND' = 404,// [*] 用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
  'NOT_ACCEPTABLE' = 406,// [GET] 用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
  'GONE' = 410,// [GET] 用户请求的资源被永久删除，且不会再得到的。
  'UNPROCESABLE_ENTITY' = 422,// [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
  'INTERNAL_SERVER_ERROR' = 500// [*] 服务器发生错误，用户将无法判断发出的请求是否成功。
}
