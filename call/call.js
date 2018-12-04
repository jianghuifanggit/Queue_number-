// 在需要使用的js文件中，导入js  
var util = require('../utils/util.js');
var request = require("../utils/request.js");
var callNext = function(that) {
  var id = wx.getStorageSync('dep_id');
  console.log(id);
  if (id == '') {
    wx.navigateTo({
      url: '../list/list',
    })
  } else {
    var url = '/service_window/' + id + '/next?'
    var params = new Object()
    //发起请求  
    request.PUT({
      params: params,
      url: url,
      success: function(res) {
        console.log(res.data)
        var code = res.data.queueNumberCode
        if (code == null) {
          code = '00000'
        }
        var name = res.data.name
        that.setData({
          code: code,
          name: name
        })
      }
    });
    //获取后面几位
    var url2 = '/service_window/' + id + '/wait_user'
    var params2 = new Object()
    //发起请求  
    request.GET({
      params: params2,
      url: url2,
      success: function(res) {
        console.log(res.data)
        var num = res.data
        that.setData({
          num: num
        })
      }
    });
  }
}

Page({
  data: {

  },

  onLoad: function(option) {
    var that = this;
    var id = option.id;
    console.log(id);
    if (id == '') {
      wx.navigateTo({
        url: '../list/list',
      })
    } else {
      var url = '/service_window/' + id + '/next?'
      var params = new Object()
      //发起请求  
      request.PUT({
        params: params,
        url: url,
        success: function (res) {
          console.log(res.data)
          var code = res.data.queueNumberCode
          if (code == null) {
            code = '00000'
          }
          var name = res.data.name
          that.setData({
            code: code,
            name: name
          })
        }
      });
      //获取后面几位
      var url2 = '/service_window/' + id + '/wait_user'
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
  },

  //叫号
  nextNum: function() {
    var that = this;
    callNext(that);
  },

  //返回
  back: function() {
    wx.navigateTo({
      url: '../list/list',
    })
  }

})