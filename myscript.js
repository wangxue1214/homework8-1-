var mymusic=document.getElementById('mymusic');
var play_btn=document.getElementById('play_btn');
var play_progressBar=document.getElementById('play_progressBar');
var schedule_btn=document.getElementById('schedule_btn');
var prograssBar=document.getElementById('prograssBar');
var play_time=document.getElementById('play_time');
var voice=document.getElementById('voice');
var look_comment=document.getElementById('look_comment');
var expression=document.getElementById('expression');
var wordsnum=document.getElementById('wordsnum');
var submit=document.getElementById('submit');
var commentcon=document.getElementById('comment');
var commentsum=document.getElementById('commentsum');
var presentpage=1;
var paging=document.getElementById('paging');
var page1=document.getElementById('page1');
var left_arrow=document.getElementById('left_arrow');
var right_arrow=document.getElementById('right_arrow');
var pages=paging.children;
//播放和暂停
play_btn.onclick=function(){
    if(mymusic.paused){
        this.style.backgroundPosition='-207px -48px';
        mymusic.play();
        var intervalId=setInterval(changeProgress,1000);
    }else{
        this.style.backgroundPosition='-162px 0';
        mymusic.pause();
        clearInterval(intervalId);
    }
}
play_btn.onmouseover=function(){
    if(mymusic.paused){
        this.style.backgroundPosition='-162px 0';
    }else{
        this.style.backgroundPosition='-207px -48px';
    }
}
play_btn.onmouseout=function(){
    if(mymusic.paused){
        this.style.backgroundPosition='-110px 0';
    }else{
        this.style.backgroundPosition='-207px 0';
    }
}
voice.onclick=function(){
    if(mymusic.muted){
        mymusic.muted=false;
        voice.style.background='url(./images/img15.png) no-repeat';
    }else{
        mymusic.muted=true;
        voice.style.background='url(./images/img13.png) no-repeat';
    }
    voice.style.backgroundSize='100% 100%';
}
voice.onmouseover=function(){
    if(mymusic.muted){
        voice.style.background='url(./images/img13.png) no-repeat';
    }else{
        voice.style.background='url(./images/img15.png) no-repeat';
    }
    voice.style.backgroundSize='100% 100%';
}
voice.onmouseout=function(){
    if(mymusic.muted){
        voice.style.background='url(./images/img12.png) no-repeat';
    }else{
        voice.style.background='url(./images/img14.png) no-repeat';
    }
    voice.style.backgroundSize='100% 100%';
}
function changeProgress(){
    var playTime=mymusic.currentTime;
    var totalTime=mymusic.duration;
    var rate=playTime/totalTime;
    var totalWidth=play_progressBar.offsetWidth;
    prograssBar.style.width=`${rate*totalWidth}px`;
    schedule_btn.style.left=`${rate*totalWidth}px`;
    var minutes=parseInt(playTime/60);
    var seconds=parseInt(playTime%60);
    minutes=minutes>9?minutes:'0'+minutes;
    seconds=seconds>9?seconds:'0'+seconds;
    play_time.innerHTML=`${minutes}:${seconds}`;
}
var obj1={
    userphoto:'./images/img8.jpg',
    userName:'郭子仪',
    content:'Too',
    comment_time:'2017-06-10&nbsp07:00:42',
    flag:0,
    supportnum:163
}
var obj2={
    userphoto:'./images/img5.jpg',
    userName:'Forget',
    content:'我喜欢很多歌曲，喜欢过很多唱歌的人，那些有时不是我的爱好，已经成为了我那段青春的回忆，我现在可以很骄傲',
    comment_time:'2017-06-03&nbsp16:58:02',
    flag:0,
    supportnum:149
}
var obj3={
    userphoto:'./images/img5.jpg',
    userName:'亚里士多德',
    content:'学校晚会表演这歌开心',
    comment_time:'2017-05-14&nbsp16:16:53',
    flag:0,
    supportnum:106
}
function store_reviews(obj){
    var commentList=localStorage['commentList'];
    if(commentList==null || commentList==''){
        commentList='[]';
    }
    commentList=JSON.parse(commentList);
    commentList.push(obj);
    commentList=JSON.stringify(commentList);
    localStorage['commentList']=commentList;
    console.log(localStorage['commentList']);
}
function CommentObj(context,publishtime){
    this.userphoto='./images/img8.jpg';
    this.userName='郭子仪';
    this.content=context;
    this.comment_time=publishtime;
    this.flag=0;
    this.supportnum=0;
}
document.onkeyup=function(){
    var len=commentcon.value.length;
    wordsnum.innerHTML=`已输入${len}个字`;
}
submit.onclick=function publishComment(){
    if(commentcon.value!=''){
        var publishtime=moment().format('YYYY-MM-DD HH:mm:ss');
        var obj=new CommentObj(commentcon.value,publishtime);
        store_reviews(obj);
        show_reviews(1);
        reviewsnum();
        addpage();
        commentcon.value='';
    }else{
        alert('内容不能为空！！');
    }
}
var dels=new Array();
var index=0;
var currentpage=0;
function show_reviews(page){
    currentpage=page;
    look_comment.innerHTML='';
    var commentList=localStorage['commentList'];
    commentList=JSON.parse(commentList);
    var length=commentList.length;
    var index=length-1-(page-1)*3;
    for(let i=index;i>=index-2 && i>=0;i--){
        var commentNode=document.createElement('div');
        var userPhoto=document.createElement('div');
        var right_node=document.createElement('div');
        var userName=document.createElement('div'); 
        var content=document.createElement('div');
        var timer=document.createElement('div');
        var share=document.createElement('a');
        let supportnum=document.createElement('div');
        var support=document.createElement('div');
        var report=document.createElement('a');
        look_comment.style.borderTop='1px solid rgb(196, 193, 190)';
        commentNode.style.width='600px';
        commentNode.style.height='300px';
        commentNode.style.height='90px';
        commentNode.style.display='flex';
        commentNode.style.justifyContent='space-between';
        commentNode.style.marginTop='20px';
        commentNode.style.borderBottom='1px dashed rgb(196, 193, 190)'
        userPhoto.style.width='60px';
        userPhoto.style.height='60px';
        userPhoto.innerHTML=`<img src=${commentList[i].userphoto} width='60px' height='60px' display='inline-block'>`;
        userPhoto.style.display='inline-block';
        right_node.style.width='500px';
        right_node.style.display='flex';
        right_node.style.flexDirection='column';
        right_node.style.class='rightnode';
        userName.innerHTML=commentList[i].userName;
        share.innerHTML='分享';
        userName.appendChild(share);
        userName.style.position='relative';
        share.style.position='absolute';
        share.style.right='0';
        share.style.top='0';
        share.style.color='black';
        share.style.fontSize='14px';
        share.style.textDecoration='none';
        content.innerHTML=commentList[i].content;
        timer.innerHTML=commentList[i].comment_time;
        timer.style.position='relative';
        timer.style.fontSize='14px';
        if(commentList[i].userName=='郭子仪'){
            var del=document.createElement('a');
            timer.appendChild(del);
            del.innerHTML='删除';
            del.style.position='absolute';
            del.style.right='100px';
            del.style.top='0';
            del.style.color='black';
            del.style.textDecoration='none';
        }
        timer.appendChild(supportnum);
        supportnum.style.position='absolute';
        supportnum.style.right='60px';
        supportnum.style.top='0';
        supportnum.style.display='inline-block';
        supportnum.style.width='30px';
        supportnum.style.height='20px';
        supportnum.innerHTML=commentList[i].supportnum;
        timer.appendChild(support);
        support.style.display='inline-block';
        support.style.width='20px';
        support.style.height='20px';
        support.innerHTML=`<img src='./images/img16.png' width='20px' height='20px' display='inline-block' position='absolute' right='30px' top='0'>`;
        support.style.position='absolute';
        support.style.right='40px';
        support.style.top='0';
        support.onclick=function(){
            if(commentList[i].flag%2==0){
                this.innerHTML=`<img src='./images/img17.png' width='20px' height='20px' display='inline-block' position='absolute' right='30px' top='0'>`;
                commentList[i].supportnum+=1;
            }else{
                this.innerHTML=`<img src='./images/img16.png' width='20px' height='20px' display='inline-block' position='absolute' right='30px' top='0'>`;
                commentList[i].supportnum-=1;
            }
            commentList[i].flag=(commentList[i].flag+1)%2;
            supportnum.innerHTML=''+commentList[i].supportnum;
        };
        timer.appendChild(report);
        report.innerHTML='回复';
        report.style.position='absolute';
        report.style.right='0';
        report.style.top='0';
        report.style.color='black';
        report.style.fontSize='14px';
        report.style.textDecoration='none';
        commentNode.appendChild(userPhoto);
        commentNode.appendChild(right_node);
        right_node.appendChild(userName);
        right_node.appendChild(content);
        right_node.appendChild(timer);
        look_comment.appendChild(commentNode);
    }
}
window.onload=function(){
    var commentList=localStorage['commentList'];
    if(commentList==null || commentList==''){
        store_reviews(obj3);
        store_reviews(obj2);
        store_reviews(obj1);
    }
    reviewsnum();
    addpage();
    show_reviews(presentpage);
    pages[presentpage].style.backgroundColor='rgb(245, 187, 29)';
}
function reviewsnum(){
    var commentList=localStorage['commentList'];
    commentList=JSON.parse(commentList);
    commentsum.innerHTML="评论&nbsp"+(commentList.length-3+1703)+"条评论";
}
var presentpagesum=1;
var pageNodes=new Array();
pageNodes[0]=page1;
pageNodes[0].onclick=function(){
    show_reviews(1);
}
function addpage(){
    var commentList=localStorage['commentList'];
    commentList=JSON.parse(commentList);
    if(commentList.length>3*presentpagesum){
        var addpagenum=Math.ceil(commentList.length/3)-presentpagesum;
        for(let i=presentpagesum+1;i<=presentpagesum+addpagenum;i++){
            pageNode=document.createElement('div');
            pageNode.style.width='30px';
            pageNode.style.height='30px';
            pageNode.style.backgroundColor='rgb(228, 225, 222)';
            pageNode.style.borderRadius='50%';
            pageNode.style.display='inline-block';
            pageNode.style.textAlign='center';
            pageNode.style.lineHeight='30px';
            pageNode.style.marginRight='5px';
            pageNode.style.cursor='default';
            pageNode.innerHTML=i;
            pageNode.id=i;
            pageNodes[i-1]=pageNode;          
            pageNodes[i-1].onclick=function(){
                show_reviews(i);
                for(var other=0;other<pageNodes.length;other++){
                    pageNodes[other].style.backgroundColor='rgb(228, 225, 222)';
                }
                this.style.backgroundColor='rgb(245, 187, 29)';
                
            }
            page1.onclick=function(){
                show_reviews(1);
                for(var other=0;other<pageNodes.length;other++){
                    pageNodes[other].style.backgroundColor='rgb(228, 225, 222)';
                }
                this.style.backgroundColor='rgb(245, 187, 29)';
            }
            left_arrow.onclick=function(){
                if(currentpage-1>1){
                    show_reviews(currentpage-1);
                    for(var other=0;other<pageNodes.length;other++){
                        pageNodes[other].style.backgroundColor='rgb(228, 225, 222)';
                    }
                    pageNodes[currentpage-1].style.backgroundColor='rgb(245, 187, 29)';
                    
                }else if(currentpage-1==1){
                    show_reviews(1);
                    for(var other=0;other<pageNodes.length;other++){
                        pageNodes[other].style.backgroundColor='rgb(228, 225, 222)';
                    }
                    page1.style.backgroundColor='rgb(245, 187, 29)';
                }
            }
            right_arrow.onclick=function(){
                if(currentpage+1<=pageNodes.length){
                    show_reviews(currentpage+1);
                    for(var other=0;other<pageNodes.length;other++){
                        pageNodes[other].style.backgroundColor='rgb(228, 225, 222)';
                    }
                    pageNodes[currentpage-1].style.backgroundColor='rgb(245, 187, 29)';
                }
            }
            paging.insertBefore(pageNode,paging.lastElementChild);
        }
        presentpagesum+=addpagenum;
    }
}

