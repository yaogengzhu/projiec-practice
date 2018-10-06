window.onload = function () {
    //  头部搜索下拉颜色渐变 
    searchEvent();
    // 轮播图事件
    bannerEvent();
    // 倒计时事件
    countDownEvent();
    // 操作一键返回顶部按钮事件 
    backTopEvent();
}

//创建滑动渐变色的函数
var searchEvent = function () {
    // 获取顶部搜索栏的的元素  
    var headerBox = document.querySelector(".jd_header_box");
    //获取banner部分的高度 
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;

    // 监听页面滚动事件 获取高度 
    window.onscroll = function () {
        var scrollHeigh = document.documentElement.scrollTop;
        //根据页面滚动来判断是否需要改变颜色 
        if (scrollHeigh <= height) {
            var opacity = scrollHeigh / height * 0.85;
            // 给顶部搜索添加背景
            headerBox.style.backgroundColor = "rgba(201, 21, 35," + opacity + ")";
            headerBox.style.webKitBackgroundColor = "rgba(201, 21, 35," + opacity + ")";
        } else {
            headerBox.style.backgroundColor = "rgba(201, 21, 35,0.85)";
            headerBox.style.webKitBackgroundColor = "rgba(201, 21, 35,0.85)";
        }
    }

}

// 无缝轮播图  

var bannerEvent = function () {
    /**mg
     * 无缝轮播需要做的事情  
     * 1.获取图片盒子     
     * 2.添加定时器   
     * 3.给ul添加过渡   在添加移动
     * 3.判断到倒数第二张的时候，需要瞬间定位到第一张  
     */
    var bannerObj = document.querySelector(".jd_banner");
    // 获取图片的宽度
    var imgWidth = bannerObj.offsetWidth;
    //获取图片盒子 
    var imgBox = bannerObj.querySelector("ul:first-child");
    // 设置定时器 
    // 定义一个变量 index  
    // 拿到所有的li  
    var ponits = bannerObj.querySelector("ul:last-child").querySelectorAll("li");
    var index = 1;
    var timer = setInterval(function () {
        index++;
        // 给图片盒子添加过渡
        imgBox.style.transition = "all 0.2s";
        imgBox.style.webKitTransition = "all 0.2s";
        // 设置移动
        imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
        imgBox.style.webKitTransform = "translateX(" + (-index * imgWidth) + "px)";
    }, 2000);
    // 监听过渡完成后事件 

    imgBox.addEventListener("transitionend", function () {
        if (index > 8) {
            // 瞬间定位
            index = 1;
            // 清除过渡
            imgBox.style.transition = "none";
            imgBox.style.webKitTransition = "none";
            // 设置移动 
            imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
            imgBox.style.webKitTransform = "translateX(" + (-index * imgWidth) + "px)";
        }
        // 为滑动事件铺垫  
        if (index < 1) {
            index = 8;
            // 清除过渡
            imgBox.style.transition = "none";
            imgBox.style.webKitTransition = "none";
            // 设置移动 
            imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
            imgBox.style.webKitTransform = "translateX(" + (-index * imgWidth) + "px)";
        }
        // 小圆点的变化是在过渡完成之后发生的
        ponitsEvent();
    })

    // 小圆点跟随图片滑动 
    var ponitsEvent = function () {
        // 遍历li  清除now   
        for (var i = 0; i < ponits.length; i++) {
            var liObj = ponits[i];
            ponits[i].classList.remove("now");
        }
        ponits[index - 1].classList.add("now");
    }

    //手指touch 事件 
    var startX = 0;
    var distance = 0;
    // 设置一个变量来判断 是否手指滑动
    var ismove = false;
    imgBox.addEventListener("touchstart", function (e) {
        // 手指放上去的时候停止定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        // 手指移动
        ismove = true;
        moveX = e.touches[0].clientX;
        distance = moveX - startX;
        var translateX = -index * imgWidth + distance;
        console.log(translateX);
        imgBox.style.transition = "none";
        imgBox.style.webKitTransition = "none";
        imgBox.style.transform = "translateX(" + translateX + "px)";
        imgBox.style.webKitTransform = "translateX(" + translateX + "px)";
    });

    imgBox.addEventListener("touchend", function (e) {
        // 判断手指滑动了 才做以下事件 
        if (ismove) {
            // 当滑动不超过屏幕的1/3 会被吸附回去 
            if (Math.abs(distance) < imgWidth / 3) {
                imgBox.style.transition = "all 0.2s ";
                imgBox.style.webKitTransition = "all 0.2s ";
                imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
                imgBox.style.webKitTransform = "translateX(" + (-imgWidth * imgWidth) + "px)";
            } else
                // 当滑动超过屏幕的1/3 滑到下一张 
                if (distance > 0) {
                    index--;
                } else {
                    index++;
                }
            imgBox.style.transition = "all 0.2s ";
            imgBox.style.webKitTransition = "all 0.2s ";
            imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
            imgBox.style.webKitTransform = "translateX(" + (-imgWidth * imgWidth) + "px)";
        }

        //还原数据 避免污染
        startX = 0;
        distance = 0;
        ismove = false;
        //  清空定时器 
        clearInterval(timer);
        // 重置定时器 
        timer = setInterval(function () {
            index++;
            // 给图片盒子添加过渡
            imgBox.style.transition = "all 0.2s";
            imgBox.style.webKitTransition = "all 0.2s";
            // 设置移动
            imgBox.style.transform = "translateX(" + (-index * imgWidth) + "px)";
            imgBox.style.webKitTransform = "translateX(" + (-index * imgWidth) + "px)";
        }, 2000);


    })



}

// 倒计时事件 
var countDownEvent = function () {

    // 做倒计时 需要拿到展现倒计时的元素
    var spans = document.querySelector(".sk_time").querySelectorAll("span");
    /**
     * 倒计时需要做的事情 
     * 1.设置倒计时的总时长  设置为秒 ，利用定时器 为1s 的效果 。没一次刷新减去1s 
     * 2.将总时长转化为 小时 分钟 秒  
     * 3.将转换好的时长展示到页面上 
     */
    var time = 2 * 60 * 60;
    // 设置定时器 
    var timer = setInterval(function () {
        // 时间减去一秒
        time--;
        //设置小时分钟秒
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        // 做一个判断 如果time为0 ;清空定时器
        if (time === 0) {
            clearInterval(timer);
        }

    }, 1000);
}

// 操作一键返回顶部事件 
var backTopEvent = function () {
    // 首页需要获取这个元素
    var backObj = document.querySelector(".jd_backTop");
    // 监听滚动事件 拿到滚动的高度 
    document.addEventListener("scroll", function () {
        var height = document.documentElement.scrollTop;
        // 判断这个高度是否大于1000 若大于1000 ， 则显示backtop按钮 
        if (height > 300) {
            // 操作backTop 元素 
            backObj.classList.remove("hidden");
            backObj.classList.add("show");
        } else {
            backObj.classList.remove("show");
            backObj.classList.add("hidden");
        }
    })
}