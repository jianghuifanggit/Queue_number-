// list/list.js
var util = require('../utils/uuid.js');
var request = require("../utils/request.js");
Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    //获取窗口信息
    var url = '/service_window/'
    var params = new Object()
    //发起请求  
    request.GET({
      params: params,
      url: url,
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    });
  },
  callNext: function (e) {
    console.log(e);
    var id = e.target.dataset.id;
    wx.setStorageSync('dep_id',id);
    console.log(id);
    if(id==''){
      var id = e.target.dataset.id;
      wx.setStorageSync('dep_id', id);
    }
    else{
      wx.navigateTo({
        url: '../call/call?id=' + id,
      })
    }
  }
})