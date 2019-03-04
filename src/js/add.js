$(function () {
    $('.userlist').on('click',function(){
        setTimeout(() => {
            location.href="userlist.html"
        },1000);
        
    })
    // console.log($('.layui-btn'))
    $('.layui-btn').on('click', function () {
        layui.use(['form', 'layedit', 'laydate'], function () {
            var form = layui.form,
                layer = layui.layer,
                layedit = layui.layedit,
                laydate = layui.laydate;

            //日期
            laydate.render({
                elem: '#date'
            });
            laydate.render({
                elem: '#date1'
            });

            //创建一个编辑器
            var editIndex = layedit.build('LAY_demo_editor');

            //自定义验证规则
            form.verify({
                title: function (value) {
                    if (value.length < 1) {
                        return '标题至少得1个字符啊';
                    }
                },
                pass: [
                    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
                ],
                content: function (value) {
                    layedit.sync(editIndex);
                },
                city: function (value) {
                    if (value.length < 1) {
                        return '不能为空';
                    }
                },
                zy: function (value) {
                    if (value.length < 1) {
                        return '不能为空';
                    }
                },
                qm: function (value) {
                    if (value.length < 1) {
                        return '不能为空';
                    }
                },
                pf: function (value) {
                    if (value.length < 1) {
                        return '不能为空';
                    }
                }
            });

            //监听指定开关
            form.on('switch(switchTest)', function (data) {
                layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
                    offset: '6px'
                });
                layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
            });

            //监听提交
            // form.on('submit(demo1)', function(data){
            //   layer.alert(JSON.stringify(data.field), {
            //     title: '最终的提交信息'
            //   })
            //   return false;
            // });

            //表单初始赋值
            form.val('example', {
                "username": "贤心" // "name": "value"
                    ,
                "password": "123456",
                "interest": 1,
                "like[write]": true //复选框选中状态
                    ,
                "close": true //开关状态
                    ,
                "sex": "女",
                "desc": "我爱 layui"
            })


        });
        var yonghuming = $('#yonghuming').val();
        // console.log($('#yonghuming'))
        // console.log($('#yonghuming').val())
        var psw = $('.psw').val();
        var phone = $('.phone').val();
        var qm = $('.qm').val();
        var xb = $('#xb').val();
        var pf = $('.pf').val();
        var city = $('.city').val();
        var zy = $('.zy').val();
        var textarea = $('.layui-textarea').val();
        if (yonghuming) {
            if (psw) {
                if (phone) {
                    if (qm) {
                        if (xb) {
                            if (pf) {
                                if (city) {
                                    if (zy) {
                                        $.post('http://localhost:1811/api/add', {
                                            username: yonghuming,
                                            password: psw,
                                            telephone: phone,
                                            signature: qm,
                                            gender: xb,
                                            grade: pf,
                                            city: city,
                                            zy: zy,
                                            text: textarea,
                                        }, function (res) {
                                            // console.log(res)
                                            if (res == 'yes') {
                                                // console.log(111)
                                                layer.msg('用户名太受欢迎');
                                            } else {
                                                layer.msg('添加成功');
                                                setTimeout(function(){location.href='userlist.html'},1000);
                                                // location.href = 'userlist.html';
                                                //   console.log(111)
                                            }
                                            // console.log(res)
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // console.log(yonghuming,psw,phone,qm,xb,pf,city,zy,textarea)
        //发送post请求


    })
})