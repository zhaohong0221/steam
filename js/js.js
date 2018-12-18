//利用声明函数的参数获取后端返回的数据
function fn(data){
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		//根据后端返回的数据动态添加元素
		var clone=$("#tem").clone(true);
		$(".box").append(clone);
		clone.attr("id","");
		clone.addClass("copy");
		clone.attr("href",data[i].url)
		clone.children("img").attr("src",data[i].imgUrl[0]);
		clone.find("h3").html(data[i].name);
		//动态添加图片
		for(var j=0;j<data[i].imgUrl.length;j++){
			clone.find(".gameimg").find("img").eq(j).attr("src",data[i].imgUrl[j]);
			clone.find(".up").find(".imgbox").find("img").eq(j).attr("src",data[i].imgUrl[j])
		}
		//添加价格和折扣信息
		clone.find(".price").html("¥"+data[i].price);
		if(data[i].isSale){
			clone.find(".discount").html(data[i].discount*100+"%");
			clone.find(".discount").css({padding: 3})
			clone.find("s").html("¥"+data[i].originPrice)
		}
		//根据支持的系统添加相应的图标
		for(var k=0;k<data[i].platform.length;k++){
			if(data[i].platform[k]=="Windows"){
				clone.find(".sys img")[0].src="images/win.png"
			}
			if(data[i].platform[k]=="Mac OS"){
				clone.find(".sys img")[1].src="images/mac.png"
			}
			if(data[i].platform[k]=="Steam"){
				clone.find(".sys img")[2].src="images/linux.png"
			}
		}
		//弹出层数据获取
		clone.find(".up").find("h4").html(data[i].name);
		clone.find(".up").children("p").html("发行于: "+data[i].date.replace("-","年").replace("-","月")+"日");
		//评测
		if(data[i].evaluate==1){
			clone.find(".evaluate span").html("好评如潮");
			clone.find(".evaluate span").css({color:"#f09"});

		}
		if(data[i].evaluate==2){
			clone.find(".evaluate span").html("特别好评");
			clone.find(".evaluate span").css({color:"#3d9"});

		}
		if(data[i].evaluate==3){
			clone.find(".evaluate span").html("多半好评");
			clone.find(".evaluate span").css({color:"#df6"});

		}
		if(data[i].evaluate==4){
			clone.find(".evaluate span").html("褒贬不一");
			clone.find(".evaluate span").css({color:"#ef3"});

		}
		if(data[i].evaluate==5){
			clone.find(".evaluate span").html("多半差评");
			clone.find(".evaluate span").css({color:"#ff0"});

		}
		if(data[i].evaluate==6){
			clone.find(".evaluate span").html("差评如潮");
			clone.find(".evaluate span").css({color:"#fa9"});

		}
		if(data[i].evaluate==7){
			clone.find(".evaluate span").html("无评论");
			clone.find(".evaluate span").css({color:"#aa9"});

		}
		//评测数量
		clone.find(".evaluate i").html(data[i].evaluatingCount.toLocaleString())
		//标签
		for (var m = 0; m < data[i].label.length; m++) {
			var span=document.createElement("span");
			clone.find(".label").append(span);
			$(span).html(data[i].label[m])
		}
	}
	//图片
	$("a").mouseenter(function(){
		var _index=0;
		var upimg=$(this).find(".up").find(".imgbox").find("img");
		$(this).find(".up").fadeIn();
		upimg.hide().eq(0).fadeIn();
		auto=setInterval(function(){
			_index++;
			if(_index<=upimg.length){
				if(_index==upimg.length){
					_index=0;
				}
				upimg.hide().eq(_index).fadeIn();
			}
		},900)
	}).mouseleave(function(){
		clearInterval(auto);
		$(this).find(".up").fadeOut()
	})
	$(".box a").eq(0).fadeIn();
	//左右点击事件
	var _index=0;
	var alist=$(".box a");
	$(".btn-r").click(function(){
		_index++;
		if(_index<=alist.length){
			if(_index==alist.length){
				_index=0
			}
			follow();
			alist.hide().eq(_index).fadeIn()
		}
	})
	$(".btn-l").click(function(){
		_index--;
		if(_index>=0){
		}else{
			_index=alist.length-1
		}
			alist.hide().eq(_index).fadeIn();
			follow()
	})
	//动态添加小圆点
	for(var l=0;l<alist.length;l++){
		var round=document.createElement("span");
		$(".round").append(round);
		$(round).attr("index",l);
		var spanlist=$(".round span");
		round.onclick=function(){
			_index=$(this).attr("index");
			spanlist.removeClass("select").eq(_index).addClass("select");
			alist.hide().eq(_index).fadeIn()
		}
	}
	spanlist.eq(0).addClass("select");
	//小圆点跟随函数
	function follow(){
		spanlist.removeClass("select").eq(_index).addClass("select");
	}
	//鼠标移上移出事件
	$(".copy .gameimg img").mouseenter(function(){
		$(this).parents(".copy").children("img").attr("src",this.src);
	})
	$(".copy .gameimg img").mouseleave(function(){
		$(this).parents(".copy").children("img").attr("src",$(this).parent().children("img")[0].src)
	})
	//本地存储
	$(".box a").click(function(){
		if(!localStorage.getItem("history")){
			localStorage.setItem("history",$(this).find("h3").html())
		}else{
			localStorage.setItem("history",`${localStorage.getItem("history")},${$(this).find("h3").html()}`)
		}
	})
	if(localStorage.getItem("history")){
		var hisArr=localStorage.getItem("history").split(",");
		var history= new Set(hisArr);
		history.forEach( function(element, index) {
			let hia=$("<a href='#'></a>");
			hia.html(element);
			$(".nav .cookie").append(hia);
		});
	}		
}
window.onload=function(){
//利用script标签向后端服务器发送http请求
	var script=document.createElement("script");
	document.getElementsByTagName('head')[0].appendChild(script);
	script.src="http://wangdawei.tech:81/recommendGame?callback=fn"
	
}