

(function () {

    //id:
    let id = location.search;
    id = id.split('?')[1];
    //console.log(id)   2

    $.ajax({
        type: 'get',
        data: {
            id
        },
        url: '/api/editGoods',
        success: function (str) {
            console.log(str);
            let data = str[0];
            var html = `<form class="layui-form" action="" id="edit_goods" data-id="${data.goodId}">
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品名称</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" required lay-verify="required" 
                                    autocomplete="off" class="layui-input" id="goods_name" value="${data.name}">
                            </div>
                            <div class="layui-form-mid layui-word-aux" id="detail">50字以内</div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品价格</label>
                            <div class="layui-input-inline">
                                <input type="text" name="password" required lay-verify="required" placeholder=""
                                    autocomplete="off" class="layui-input" id="originalPrice" value="${data.nowPrice}">
                            </div>
                            <label class="layui-form-label">销售价格</label>
                            <div class="layui-input-inline">
                                <input type="text" name="" required lay-verify="required" placeholder=""
                                    autocomplete="off" class="layui-input" id="salespPrice" value="${data.passPrice}">
                            </div>

                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品分类</label>
                            <div class="layui-input-block" id="fenlei">
                                <select name="" lay-verify="required" required="">
                                    <option value=""></option>
                                    <option value="faceCream">面霜</option>
                                    <option value="lipstick">口红</option>
                                    <option value="cleanser">洁面乳</option>
                                    <option value="essence">精华</option>
                                    <option value="eyeCream">眼霜</option>
                                    <option value="sunscreen">防晒霜</option>
                                </select><div class="layui-unselect layui-form-select"><div class="layui-select-title"><input type="text" placeholder="请选择" value="" readonly="" class="layui-input layui-unselect"><i class="layui-edge"></i></div><dl class="layui-anim layui-anim-upbit" style="display: none;"><dd lay-value="" class="layui-select-tips">请选择</dd><dd lay-value="faceCream" class="layui-this">面霜</dd><dd lay-value="lipstick" class="">口红</dd><dd lay-value="cleanser" class="">洁面乳</dd><dd lay-value="essence" class="">精华</dd><dd lay-value="eyeCream" class="">眼霜</dd><dd lay-value="sunscreen" class="">防晒霜</dd></dl></div>
                            </div>
                        </div>
                        
                        <div class="layui-form-item">
                            <label class="layui-form-label">库存</label>
                            <div class="layui-input-inline">
                                <input type="text" name="password" required lay-verify="required" placeholder=""
                                    autocomplete="off" class="layui-input" id="stock" value="${data.inventory}">
                            </div>


                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品图片</label>
                            <div class="layui-input-block">
                                <div
                                    style="width:150px;height:150px;border:2px solid #0099CC;border-radius: 5px;padding: 3px;">
                                    <img style="max-width: 150px;max-height:150px;" id="preview" src="../assets/images/goods/${data.imgsrc}">
                                </div>
                            </div>


                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">商品属性</label>
                            <div class="layui-input-block">
                                <input type="checkbox" name="like[write]" title="热卖"><div class="layui-unselect layui-form-checkbox"><span>热卖</span><i class="layui-icon layui-icon-ok"></i></div>
                                <input type="checkbox" name="like[read]" title="推荐"><div class="layui-unselect layui-form-checkbox"><span>推荐</span><i class="layui-icon layui-icon-ok"></i></div>
                                <input type="checkbox" name="like[dai]" title="促销"><div class="layui-unselect layui-form-checkbox"><span>促销</span><i class="layui-icon layui-icon-ok"></i></div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">上架</label>
                            <div class="layui-input-block">
                                <input type="checkbox" name="switch" lay-skin="switch"><div class="layui-unselect layui-form-switch layui-form-onswitch" lay-skin="_switch"><em></em><i></i></div>
                            </div>
                        </div>

                        <div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">商品描述</label>
                            <div class="layui-input-block">
                                <textarea name="desc" placeholder="请输入内容" class="layui-textarea"
                                    id="goods_content">${data.name}</textarea>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <input type="button" class="layui-btn" value="确认" id="submit" required>

                            </div>
                        </div>
                    </form>`;

            $('.goods_coantainer').html(html);
            //商品分类
            $('#fenlei').on('click', function (e) {
                $(this).find('.layui-anim-upbit').css({ 'display': 'block' });
                $(this).find('dd').on('click', function () {
                    $(this).parent().prev().find('input').val($(this).html())
                    $(this).parent().stop().slideUp();
                    console.log($(this).html());
                    e.stopPropagation();
                });
                e.stopPropagation();
            });

            $('.goods_coantainer').on('click', '.layui-form-checkbox', function () {
                console.log($(this));
                if ($(this).find('span').attr('style')) {
                    $(this).find('span').attr('style', '')
                } else {
                    $(this).find('span').css({ 'background': '#58bc58' })
                }
                
            })
            window.onload = function () {
                layui.use('form', function () {
                    var form = layui.form;

                    //监听提交
                    form.on('submit(formDemo)', function (data) {
                        layer.msg(JSON.stringify(data.field));
                        return false;
                    });
                });

            }
        }
    });

    //编辑商品
    $('.goods_coantainer').on('click', '#submit', function () {
        let goodId = $('#edit_goods').attr('data-id');
        let goods_name = $("#goods_name").val();
        let originalPrice = $("#originalPrice").val();
        let salespPrice = $("#salespPrice").val();
        let classification = '';
        let stock = $("#stock").val();

        //获取分类
        $('.layui-anim-upbit').find('dd').each(function (i, item) {

            if ($(item).attr('class') == 'layui-this') {
                classification = $(item).attr('lay-value');

            }
        });


        console.log(goodId, goods_name, originalPrice, salespPrice, classification, stock)

        $.ajax({
            type: 'post',
            data: {
                goodId, goods_name, originalPrice, salespPrice, classification, stock
            },
            url: '/api/editGoods',
            success: function (str) {
                if(str == 'ok') {
                    alert('编辑商品成功');
                }
            }
        })
    })


})()