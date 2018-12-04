// index/index.js
var util = require('../utils/uuid.js');
var request = require("../utils/request.js");
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 调用登录接口，获取 code  
    wx.login({
      success: function (res) {
          console.log(res)
        wx.getSetting({
          success(setRes) {
            console.log(setRes);
            // 判断是否已授权  
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问  
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息  
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function (userRes) {
                      //发起网络请求  
                      console.log(userRes);
                      console.log(res.code)
                    }
                  })
                }
              })
            } else {
              //获取用户信息  
              wx.getUserInfo({
                lang: "zh_CN",
                success: function (userRes) {
                  //发起网络请求  
                  console.log(userRes);
                  console.log(res.code)
                }
              })
            }
          }
        })
      }
    }); 
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       });
    //       wx.login({
    //         success:function(res){
    //           console.log(res);
    //         }
    //       })
    //     }
    //   }
    // });

    
    var uuid = 'oVQ_s0WO7KZP4Jq9_E3zwbv0MgGk';
    wx.setStorageSync('uuid', uuid);
    // if(uuid==''){
    //   var uuid = util.uuid(8, 16) + '-' + util.uuid(4, 16) + '-' + util.uuid(4, 16) + '-' + util.uuid(4, 16) + '-' + util.uuid(12, 16);
    //   wx.setStorageSync('uuid', uuid);
    // }
    
    console.log(uuid);
    //获取窗口信息
    var url = '/department/'
    var params = new Object()
    //发起请求  
    request.GET({
      params: params,
      url: url,
      success: function (res) {
        that.setData({
          list:res.data,
          uuid:uuid
        })
      }
    });
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
waitNext:function(e){
  var id=e.target.dataset.id;
  var name=e.target.dataset.name;
  var uuid = wx.getStorageSync('uuid');
  console.log(id + ' ' + uuid);
  if(uuid==''){}
 else{
  wx.navigateTo({
    url: '../wait/wait?id='+id+'&name='+name,
  })
 }
},

//获取fromid
  // submit: function (e) {
  //   console.log(e.detail.formId);
  // }
})