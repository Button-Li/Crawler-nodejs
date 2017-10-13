//加载fs模块
var fs=require('fs');
//加载http模块
var http=require('http');
//cheerio是一个node.js的库，可以从html的片端中构建Dom结构
var cheerio=require('cheerio');

//定义爬虫的目标地址
var url='http://news.ecupl.edu.cn/673/list.htm';

http.get(url,function(res){
	
	var html='';
	//获取页面数据
	res.on('data',function(data){
		html+=data;
	});
	var newsData=[];
	res.on('end',function(){
		newsData=filterNews(html);
	});
	saveNewsData(newsData);
	
}).on('error',function(){
	console.log('获取数据出错！');
});

function filterNews(html){
	//使用cheerio来解析html数据
	var $=cheerio.load(html);
	
	var newsLis=$('.wp_article_list').find('li');
	newsLis.each(function(item){
		var newsBlock=$(this);
		var newsTitle=newsBlock.find('a').text().trim().split('\n')[0];
		var newsTime=newsBlock.find('.Article_PublishDate').text().trim().split('\n')[0];
		var newsIn=newsTitle+'  '+newsTime+'\n';
		fs.appendFileSync('./newsInfo',newsIn,'utf-8',function(err){
			if(err)
				console.log(err);
			console.log("finished");
		})
	});
	
}
function saveNewsData(newsData){
	//console.log("empty");
}


























