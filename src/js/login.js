
$(function () {
    //用户名
    $('#yonghu').on('change', function () {
        $('#yonghu1').on('blur', function () {
            var username = $('#yonghu1').val().trim();
            if (username) {
            } else {
                alert('用户名不能为空');
            }
        })
    })

    //密码
    $('#mima1').on('change', function () {
        $('#mima1').on('blur', function () {
            var password = $('#mima1').val().trim();
            if (password) {
            } else {
                alert('密码不能为空');
            }
        })
    })

    //随机验证码
    var res4 = randomCode();
    $('.yanzheng').text(res4);
    $('.yanzheng').css('color', randomColor(16));
    // console.log( $('.yanzheng').html(res4))
    $('#yanzhengma1').on('change', function () {
        $('#yanzhengma1').on('blur', function () {
            var yzm = $('#yanzhengma1').val().trim();
            if (yzm) {
                if (yzm == res4.toLocaleLowerCase()) {

                }
                else {
                    alert('验证码不正确')
                }
            } else {
                alert('密码不能为空');
            }
        })
    })
    //换验证码
    $('.yanzheng').on('click', function () {
        var res5 = randomCode();
        $('.yanzheng').html(res5);
        $('.yanzheng').css('color', randomColor(16));
    });

    $('.btn').click(function () {
        var username = $('#yonghu1').val().trim();
        var password = $('#mima1').val().trim();
        var yzm = $('#yanzhengma1').val().trim();
        if (username) {
            if (password) {
                if (yzm) {
                    $.post('/api/login', {
                        username: username,
                        password: password
                    }, function (res) {
                        console.log(res)
                        let res1 = JSON.stringify(res);
                        let { status } = res;
                        console.log(status);
                        if (status == 'ok') {
                            alert('登录成功');
                            localStorage.setItem('user', res1);
                            location.href = 'html/index.html';
                        }
                        else if (status == 'no') {
                            alert('用户名或密码不正确')
                        }

                        
                    })
                }
                else {
                    alert('验证码不能为空')
                }
            }
            else {
                alert('密码不能为空')
            }
        }
        else {
            alert('用户名不能为空')
        }
        // console.log(username,password)

    })

})