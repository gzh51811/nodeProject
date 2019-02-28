$(function () {

    //渲染数据
    $.ajax({
        type: "post",
        url: 'http://localhost:1811/api/goodslistRouter',
        data: {
            qty: 8,
            page: 1
        },
        success: function (str) {
            //str:数组
            //console.log(str);
            //渲染数据
            let { data, len } = str;
            console.log(len)
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
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-2">${item.name}</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-3"><em>精华</em></div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-4">${item.passPrice}</div>
                                </td>
                                <td class="">
                                    <div class="layui-table-cell laytable-cell-1-0-5">${item.nowPrice}</div>
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
                                        <a class="layui-btn layui-btn-xs">编辑</a>
                                        <a class="layui-btn layui-btn-danger layui-btn-xs">删除</a>
                                        <a class="layui-btn layui-btn-normal layui-btn-xs">下架</a>
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
                    , count: len  //总共商品数量
                    , layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                    , jump: function (obj) {
                        console.log(obj);
                        let { curr } = obj;  //当前页数
                        console.log(curr);
                        
                        //请求当前页数数据
                    }
                });   

            });

        }

    });





})


