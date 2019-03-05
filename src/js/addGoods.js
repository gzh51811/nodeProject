//商品分类
$('#fenlei').on('click', function (e) {
    $(this).find('.layui-anim-upbit').css({ 'display': 'block' });
    $(this).find('dd').on('click', function () {
        $('#fenlei').find('.layui-anim-upbit').css({ 'display': 'none' });
        e.stopPropagation();
    });
    e.stopPropagation();
});


//图片上传
layui.use(['form', 'layer', 'upload'], function () {
    var layer = layui.layer;
    var upload = layui.upload;
    var $ = layui.jquery;

    upload.render({
        elem: '#upload',
        url: '{:U("addTL")}',
        auto: false,//选择文件后不自动上传
        bindAction: '#commit',
        // //上传前的回调
        before: function () {
            this.data = {
                name: $('input[name="name"]').val()
            }
        },
        //选择文件后的回调
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#preview').attr('src', result);
            })
        },
        //操作成功的回调
        done: function (res, index, upload) {
            var code = res.code === 0 ? 1 : 2;
            layer.alert(res.msg, { icon: code }, function () {
                parent.window.location.reload();

            })
        },
        //上传错误回调
        error: function (index, upload) {
            layer.alert('上传失败！' + index);
        }
    });
});





$('#submit').on('click', function () {


    //发送图片上传请求
    //let upload = $('#upload').val();
    let goods = document.querySelector('#upload');
    let goods_name = $('#goods_name').val();
    let originalPrice = $('#originalPrice').val();
    let salespPrice = $('#salespPrice').val();
    let classification = '';
    let stock = $('#stock').val();
    let goods_content = $('#goods_content').val();

    //获取分类
    $('.layui-anim-upbit').find('dd').each(function (i, item) {
        
        if ($(item).attr('class') == 'layui-this') {
            classification = $(item).attr('lay-value');
            
        }
    })


    

    let data = new FormData();
    let imgsrc = goods.files[0].name;
    

    for (let i = 0; i < goods.files.length; i++) {
        data.append('goods', goods.files[i]);
    }
     
    //console.log(goods_name, originalPrice, salespPrice, classification, stock, goods_content, data.get('goods'))
    //console.log('goods', data.get('goods'))
    //发送请求
    if (goods_name && originalPrice && salespPrice && classification && stock && goods_content && data.get('goods')) {
        //console.log(goods_name, originalPrice, salespPrice, classification, stock, goods_content);
        console.log(imgsrc);
        
        let xhr = new XMLHttpRequest();
        xhr.open('post', '/api/upload', true);
        xhr.onload = function () {
            //console.log(xhr.responseText);
        }
        
        xhr.send(data);
        $.ajax({
            type: 'get',
            data: {
                goods_name: goods_name,
                originalPrice: originalPrice,
                salespPrice: salespPrice,
                addTime: Date.now(),
                classification: classification,
                stock: stock,
                goods_content: goods_content,
                imgsrc
            },
            url: '/api/insertGoods',
            success: function (str) {
                if (str == 'yes') {
                    alert('添加商品成功');
                    location.href = "./goodslist.html";
               }
            }
        });
    }

});


