//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

Mock.mock('/api/homeswipe', 'get', require('./mock/swipeimage'));
Mock.mock('/api/news', 'get', require('./mock/newsList'));
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
Mock.mock('/api/photos', 'get', require('./mock/photolist'));
Mock.mock('/api/book', 'get', require('./mock/booklist'));
Mock.mock('/api/bookswipe', 'get', require('./mock/bookswipe'));
Mock.mock('/api/booklist', 'get', require('./mock/booklist'));
Mock.mock('/api/bookdetails', 'get', require('./mock/bookdetailsimage'));
Mock.mock('/api/comments', 'get', require('./mock/comments'));
Mock.mock('/api/bookstore', 'get', require('./mock/booklist'));
