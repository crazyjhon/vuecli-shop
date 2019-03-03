//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

Mock.mock('/api/homeswipe', 'get', require('./mock/swipeimage'));
Mock.mock('/api/news', 'post', function (req) {
  var data = JSON.parse(req.body);
  var page = data.page;
  var pagesize = data.pagesize;
  var newsData = require('./mock/newsList').T1348647853363;
  var news = newsData;
  var jiequ = news.splice((page-1)*pagesize,pagesize);

  //每次查询完数据，都要清除require的默认缓存，下次调用的时候重新加载。
  delete require.cache[require.resolve('./mock/newsList')];
  return jiequ;
});
Mock.mock('/api/newsdetails', 'post', function (req) {
  var docid = JSON.parse(req.body).newsID;
  var newsData = require('./mock/newsList').T1348647853363;
  var result = null;
  newsData.some(function (item) {
    if (docid === item.docid){
      result = item;
      return true;
    }
  });
  return result;
});
Mock.mock('/api/newscomments', 'post', function (req) {
  var newsId = JSON.parse(req.body).newsID;
  var all = JSON.parse(req.body).all;
  var newsComments = require('./mock/newsComments');
  var result = null;
  newsComments.some(function (item) {
    if (newsId === item.id){
      if (all === 'all') {
        result = item.commentsData;
      } else {
        result = item.commentsData.splice(0,3);
      }
      return true;
    }
  });
  //每次查询完数据，都要清除require的默认缓存，下次调用的时候重新加载。
  delete require.cache[require.resolve('./mock/newsComments')];
  return result;
});
Mock.mock('/api/photos', 'post', function (req) {
  var data = JSON.parse(req.body);
  var page = data.page;
  var pagesize = data.pagesize;
  var newsData = require('./mock/photolist');
  var news = newsData;
  var jiequ = news.splice((page-1)*pagesize,pagesize);

  //每次查询完数据，都要清除require的默认缓存，下次调用的时候重新加载。
  delete require.cache[require.resolve('./mock/photolist')];
  return jiequ;
});
Mock.mock('/api/book', 'post', function (req) {
  var data = JSON.parse(req.body);
  var page = data.page;
  var pagesize = data.pagesize;
  var newsData = require('./mock/booklist');
  var news = newsData;
  var jiequ = news.splice((page-1)*pagesize,pagesize);
  //每次查询完数据，都要清除require的默认缓存，下次调用的时候重新加载。
  delete require.cache[require.resolve('./mock/booklist')];
  return jiequ;
});
Mock.mock('/api/bookswipe', 'get', require('./mock/bookswipe'));
Mock.mock('/api/bookinfo', 'post', function (req) {
  var id = JSON.parse(req.body).id;
  var bookinfos = require('./mock/booklist');
  var result = null;
  bookinfos.some(function (item) {
    if (parseInt(id) === item.id) {
      return result = item
    }
  })
  return result
});
Mock.mock('/api/bookdetails', 'get', require('./mock/bookdetailsimage'));
Mock.mock('/api/postcomments', 'get', require('./mock/comments'));
Mock.mock('/api/bookstore', 'get', require('./mock/booklist'));
Mock.mock('/api/login', 'post', function (req) {
  var usersession = require('./mock/session');
  var postdata = JSON.parse(req.body);
  if (postdata.user === usersession.user && parseInt(postdata.password) === usersession.password) {
   return {
      err_code : 1,
      message : '用户验证成功'
    }
  } else {
    return {
      err_code :0,
      message : '用户名或密码错误'
    }
  }
});
Mock.mock('/api/logout', 'post', function (req) {
  return {err_code:1,message:'退出登陆成功'};
});


