$(function () {


    let qty = 8;
    let page = 1;
    //渲染数据
    $.ajax({
        type: "post",
        url: 'http://localhost:1811/api/goodslistRouter',
        data: {
            qty: qty,
            page: page
        },
        success: function (str) {
            //str:数组
            //console.log(str);
            //渲染数据

            let { data, len } = str;
            console.log(data)
            let html = data.map(function (item) {
                return `<tr data-id='${item.goodId}'>
                                <td class="layui-table-col-special">
                                    <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
                                        <input type="checkbox" name="layTableCheckbox" lay-skin="primary" checked="">
                                        <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
                                            <i class="layui-icon layui-icon-ok"></i>
                                        </div>
                                    </div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-1">${item.goodId}</div>
                                </td>
                                <td class="goodsname">
                                    <div class="layui-table-cell laytable-cell-1-0-2">${item.name}</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-3"><em>${classification(item.classification)}</em></div>
                                </td>
                                <td class="originalPrice">
                                    <div class="layui-table-cell laytable-cell-1-0-4">${originalPrice(item.passPrice)}</div>
                                </td>
                                <td class="presentPrice">
                                    <div class="layui-table-cell laytable-cell-1-0-5">${originalPrice(item.nowPrice)}</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-6">${item.inventory}
                                    </div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-7">上线</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-8">${item.addTime}
                                    </div>
                                </td>
                                <td class="layui-table-col-special">
                                    <div class="layui-table-cell laytable-cell-1-0-11">
                                        <a class="layui-btn layui-btn-xs edit">编辑</a>
                                        <a class="layui-btn layui-btn-danger layui-btn-xs delete">删除</a>
                                        <a class="layui-btn layui-btn-normal layui-btn-xs shelves">下架</a>
                                    </div>
                                </td>
                            </tr>`;
            }).join('');
            //console.log(html);
            $('#tbody').html(html);


            //页数渲染
            layui.use(['laypage', 'layer'], function () {
                var laypage = layui.laypage
                    , layer = layui.layer;


                //完整功能
                laypage.render({
                    elem: 'page'
                    , count: len,  //总共商品数量
                    limit: qty
                    , layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                    , jump: function (obj) {
                        console.log(obj);
                        let { curr } = obj;  //当前页数
                        //console.log(curr);
                        // var url = `http://localhost:1811/api/list?page=${curr}&qty=${qty}`;
                        // //console.log(url)
                        // //请求当前页数数据
                        // $.ajax({
                        //     type: 'get',
                        //     data: curr,
                        //     url: url,
                        //     success: function (str) {
                        //         //console.log(str.data)
                        //         $('tbody').html(render(str.data));

                        //     }
                        // });

                        //查看cookie中状态
                        //$.removeCookie('name', { path: '/' });
                        //需求： 可以按goodID/价格排序
                        let sorting = $.cookie('name');
                        //console.log(sorting);
                        $.ajax({
                            type: 'get',
                            data: {
                                sorting: sorting,
                                curr: curr,
                                qty: qty
                            },
                            url: 'http://localhost:1811/api/list/sorting/page',
                            success: function (str) {
                                $('tbody').html(render(str.data));
                            }
                        });


                        //搜索某一类
                        $('.goods_searchBtn').on('click', function () {
                            let classifiedContent = $('#classifiedContent').val().trim();
                            let title = $('#title').val();
                            if (classifiedContent && title) {
                                //console.log(classification, title);
                                $('#classifiedSearch').find('dd').each(function (i, item) {
                                    if ($(item).html() == classifiedContent) {
                                        classifiedContent = $(item).attr('data-classification');
                                    }
                                })
                                $.ajax({
                                    type: 'get',
                                    data: {
                                        sorting,
                                        curr: curr,
                                        qty: qty,
                                        title: title,
                                        classifiedContent: classifiedContent
                                    },
                                    url: 'http://localhost:1811/api/list/sorting/search',
                                    success: function (str) {
                                        $('tbody').html(render(str.data));
                                        //console.log(str)
                                        console.log(1)
                                        layui.use(['laypage', 'layer'], function () {
                                            var laypage = layui.laypage
                                                , layer = layui.layer;
                                            laypage.render({
                                                elem: 'page',
                                                count: str.len,  //总共商品数量
                                                limit: qty,
                                                layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                                                jump: function (obj) {
                                                    let { curr } = obj;
                                                    let sorting = $.cookie('name');
                                                    //console.log(sorting);
                                                    
                                                    $.ajax({
                                                        type: 'get',
                                                        data: {
                                                            sorting: sorting,
                                                            curr: curr,
                                                            qty: qty,
                                                            title: title,
                                                            classifiedContent: classifiedContent
                                                        },
                                                        url: 'http://localhost:1811/api/list/sorting/search',
                                                        success: function (str) {
                                                            //console.log(2222)
                                                            $('tbody').html(render(str.data));
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            } else {
                                alert('请输入分类和内容')
                            }
                        });

                    }
                });

            });

        }

    });

    //封装渲染数据函数
    function render(data) {
        let html = data.map(function (item) {
            return `<tr data-id='${item.goodId}'>
                                <td class="layui-table-col-special">
                                    <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
                                        <input type="checkbox" name="layTableCheckbox" lay-skin="primary" checked="">
                                        <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
                                            <i class="layui-icon layui-icon-ok"></i>
                                        </div>
                                    </div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-1">${item.goodId}</div>
                                </td>
                                <td class="goodsname">
                                    <div class="layui-table-cell laytable-cell-1-0-2">${item.name}</div>
                                </td>
                                <td class="classification">
                                    <div class="layui-table-cell laytable-cell-1-0-3"><em>${classification(item.classification)}</em></div>
                                </td>
                                <td class="originalPrice">
                                    <div class="layui-table-cell laytable-cell-1-0-4">${originalPrice(item.passPrice)}</div>
                                </td>
                                <td class="presentPrice">
                                    <div class="layui-table-cell laytable-cell-1-0-5">${originalPrice(item.nowPrice)}</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-6">${item.inventory}
                                    </div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-7">上线</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-8">${item.addTime}
                                    </div>
                                </td>
                                <td class="layui-table-col-special">
                                    <div class="layui-table-cell laytable-cell-1-0-11">
                                        <a class="layui-btn layui-btn-xs edit">编辑</a>
                                        <a class="layui-btn layui-btn-danger layui-btn-xs delete">删除</a>
                                        <a class="layui-btn layui-btn-normal layui-btn-xs shelves">下架</a>
                                    </div>
                                </td>
                            </tr>`;
        }).join('');

        return html;
    }


    //分类函数封装
    function classification(data) {

        //面霜
        if (data == 'faceCream') {
            return '面霜';
        } else if (data == 'essence') {
            return '精华';
        }
        else if (data == 'cleanser') {
            return '洁面乳';
        }
        else if (data == 'sunscreen') {
            return '防晒霜';
        }
        else if (data == 'lipstick') {
            return '口红';
        }
        else if (data == 'eyeCream') {
            return '眼霜';
        }

    }

    //可恶的价钱
    function originalPrice(data) {
        if (!data) {
            return 888.99
        } else {

            data = parseFloat(data).toFixed(2);

            return data;
        }
    }

    //选择分类
    $('.layui-select-title').on('click', function (e) {
        //console.log($(this).next())
        $(this).next().css({ 'display': 'block' });

        $(this).next().find('dd').on('click', function (e) {
            //console.log($(this).html())
            $('#classifiedContent').attr('value', $(this).html())
            setTimeout(function () {
                $("#classifiedSearch").css({ "display": "none" });
            }, 300);

            e.stopPropagation();
        });

        e.stopPropagation();

    });

    //查询
    function query() {

    }

    //升序
    $('#ascending').on('click', function () {
        //用cookie存起当前的状态
        $.cookie('name', 1);
        $.ajax({
            type: 'get',
            data: {
                sorting: 1,
                qty: qty,
                page: page
            },
            url: `http://localhost:1811/api/list/sorting`,
            success: function (str) {
                //console.log(str.data)
                $('tbody').html(render(str.data));


            }
        });
    });



    //降序
    $('#descending').on('click', function () {
        //用cookie存起当前的状态
        $.cookie('name', -1);
        $.ajax({
            type: 'get',
            data: {
                sorting: -1,
                qty: qty,
                page: page
            },
            url: `http://localhost:1811/api/list/sorting`,
            success: function (str) {
                //console.log(str.data)
                $('tbody').html(render(str.data));

            }
        });
    });


    //添加商品
    $('#add').on('click', function () {
        location.href = './addGoods.html';
    });


    //编辑商品
    $('#tbody').on('click', '.edit', function () {
       
        let id = $(this).parents('tr').attr('data-id');

        location.href = './edit.html?' + id;
    });

    //删除商品
    $('#tbody').on('click', '.delete', function () {

        let res = window.confirm('您真的不要我了吗？');
        if (res) {
            let goods_name = '';
            goods_name = $(this).parents('tr').find('.goodsname').find('div').html();
            console.log(goods_name)
            $(this).parents('tr').remove();
            
            //请求数据库删除
            $.ajax({
                type: 'get',
                data: {
                    goods_name
                },
                url: 'http://localhost:1811/api/delete',
                success: function (str) {
                    if (str == 'yes') {
                        alert('删除商品成功')
                    }
                }
            })

        }
    });

    //商品下架
    $('#tbody').on('click', '.shelves', function () {

        let res = window.confirm('您真的需要下架该商品吗？');
        if (res) {
            let goods_name = '';
            goods_name = $(this).parents('tr').find('.goodsname').find('div').html();
            
           

            //请求数据库下架
            $.ajax({
                type: 'get',
                data: {
                    goods_name,
                    shelves: true
                },
                url: 'http://localhost:1811/api/delete',
                success: function (str) {
                    if (str == 'yes') {
                        alert('商品下架成功');
                    }
                }
            })

        }
    });


})


