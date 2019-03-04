$(function(){
  $('.userlist').on('click',function(){
    setTimeout(() => {
        location.href="userlist.html"
    },1000);
    
})
$('.useradd').on('click',function(){
  setTimeout(() => {
      location.href="add.html"
  },1000);
  
})

    var data = decodeURI(location.search);//获取传过来的id
    var now = data.slice(1);//切割？1
    // console.log(now)
    //渲染表单和数据
    
    // console.log(data)
    $.post('http://localhost:1811/api/add_',{
            dataid:now
    },
    function(res){
        var arr=res;
        console.log(res)
        let html=arr.map(function(item){
            return `<div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-block">
              <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入用户名" value="${item.username}" class="layui-input"
                id="yonghuming">
            </div>
          </div>
  
          <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-inline">
              <input type="password" name="password" lay-verify="pass" placeholder="请输入密码" autocomplete="off" class="layui-input psw" value="${item.password}">
            </div>
            <div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>
          </div>
  
          <div class="layui-form-item">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
              <input type="password" name="password" lay-verify="pass" placeholder="请输入密码" autocomplete="off" class="layui-input psw1" value="${item.password}">
            </div>
          </div>
  
          <div class="layui-form-item">
            <div class="layui-inline">
              <label class="layui-form-label">手机号</label>
              <div class="layui-input-inline">
                <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input phone"
                  placeholder="请输入手机号" value="${item.telephone}">
              </div>
            </div>
            
            
          <div class="layui-form-item">
          <label class="layui-form-label">性别</label>
          <div class="layui-input-block">
            <select name="" id="xb">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>
  
            <div class="layui-form-item">
              <label class="layui-form-label">城市</label>
              <div class="layui-input-block">
                <input type="text" class="city" placeholder="请输入城市" lay-verify="city" value="${item.city}">
              </div>
            </div>
  
            <div class="layui-form-item">
              <label class="layui-form-label">职业</label>
              <div class="layui-input-block">
                <input type="text" class="zy" placeholder="请输入职业" lay-verify="zy" value="${item.zy}">
              </div>
            </div>
  
            <div class="layui-form-item">
              <label class="layui-form-label">签名</label>
              <div class="layui-input-block">
                <input type="text" class="qm" placeholder="请输入签名" lay-verify="qm" value="${item.signature}">
              </div>
            </div>
  
            <div class="layui-form-item">
              <label class="layui-form-label">评分</label>
              <div class="layui-input-block">
                <input type="text" class="pf" placeholder="0-10分" lay-verify="pf" value="${item.grade}">
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">注册时间</label>
              <div class="layui-input-block">
              <div class="time">${item.time}</div>
              </div>
            </div>

            <div class="layui-form-ite">
            <div class="layui-input-block">
              <button class="layui-btn affirm" lay-submit="" lay-filter="demo1">确认</button>
            </div>
          </div>
            
           `
        }).join('')
        $('#biaodan').append(html);
        $('.affirm').on('click',function(){
            let yonghuming=$('#yonghuming').val();
            let psw=$('.psw1').val();
            let xb=$('#xb').val();
            let phone=$('.phone').val();
            let city=$('.city').val();
            let zy=$('.zy').val();
            let qm=$('.qm').val();
            let pf=$('.pf').val();
            let time=$('.time').text();
            let text=$('.text').text();
            // console.log(yonghuming,psw,phone,city,zy,qm,pf,text)
            $.post('http://localhost:1811/api/updata',{
                username:yonghuming,
                password:psw,
                telephone:phone,
                gender:xb,
                city:city,
                zy:zy,
                signature:qm,
                grade:pf,
                text:text,
                time:time,
                dataid:now
            },function(res){
                if(res=='yes'){
                    layer.msg('修改成功');
                    setTimeout(function(){location.href='userlist.html'},1000);
                    // location.href='userlist.html';
                }
                else{
                  layer.msg('用户名太受欢迎');
                    // setTimeout(function(){location.href='userlist.html'},2000);
                }
            })
        })
    })
})