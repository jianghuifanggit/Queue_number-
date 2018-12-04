var API_URL = 'https://pd.lqsc.com'

var requestHandler = {
  params: {},
  url:"",
  n:1,
  success: function (res) {
  },
  fail: function () {
  },
}

//GET请求  
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler)
}
//PUT请求  
function PUT(requestHandler) {
  request('PUT', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理  
  var params = requestHandler.params;
  var url = requestHandler.url;
  var n = requestHandler.n;
  var cookies = requestHandler.cookies;
  var paramSession = [{},
  { 'content-type': 'application/json' }]  
  wx.request({
    url: API_URL+url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: paramSession[n], // 设置请求的 header  
    success: function (res) {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: function () {
      requestHandler.fail()
    },
    complete: function () {
      // complete  
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  PUT:PUT
}  