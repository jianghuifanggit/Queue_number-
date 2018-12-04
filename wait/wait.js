// 在需要使用的js文件中，导入js  
var util = require('../utils/util.js');
var request = require("../utils/request.js");
Page({
  data: {

  },

  onLoad: function (option) {
    var that=this
    var name=option.name;
    var id=option.id;
    var uuid=wx.getStorageSync('uuid');
    console.log(id)
    var time = util.formatTime(new Date());
    var url = '/department/' + id +'/queue_number?wechatId='+uuid
    var params = new Object()
    //发起请求  
    request.GET({
      params: params,
      url: url,
      success: function (res) {
        console.log(res.data)
        if(res.data.status!='排队'){
          wx.navigateTo({
            url: '../index/index',
          })
        }
        else{
          var code = res.data.code
          that.setData({
            code: code
          })
          var url2 = '/department/' + id + '/location?wechatId=' + uuid
          var params2 = new Object()
          //发起请求  
          request.GET({
            params: params2,
            url: url2,
            success: function (res) {
              console.log(res.data)
              var num = res.data
              that.setData({
                num: num
              })
            }
          });
        }
        }
        
    });
    //获取前面几位
    that.setData({
      time: time,
      name:name
    });
  },
  back:function(){
    wx.navigateTo({
      url: '/index/index',
    })
  }

})  