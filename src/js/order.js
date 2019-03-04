$(function () {


    $('#checkAll').on('click', function () {
        $(this).addClass('layui-form-checked');
        if ($(this).find('i').attr('style')) {
            //全不选
            $(this).find('i').attr('style', '');
            $('.selectedBoxi').attr('style', '');
            $('.selectedBoxi').attr('data-ok', 'false');
        } else {
            //全选
            $(this).find('i').css({ 'background': '#86f567' });
            $('.selectedBoxi').css({ 'background': '#86f567' });
            $('.selectedBoxi').attr('data-ok', 'true');
        }
    });

    var arrselected = [];
    $('#tbody').on('click', '.selectedBoxi', function () {
        arrselected = [];
        $(this).prev().attr('checked');
        $(this).addClass('layui-form-checked');
        if ($(this).attr('style')) {
            $(this).attr('style', '');
            $(this).attr('data-ok', 'false');
        } else {
            $(this).css({ 'background': '#86f567' });
            $(this).attr('data-ok', 'true');
        }


        //存被选中的行的下标数
        for (var i = 0; i < $('.selectedBoxi').size(); i++) {
            if (($('.selectedBoxi').eq(i).attr('data-ok')) === 'true') {

                arrselected.push(i);
            }
        }
        //所有商品被选上时  总开关勾上
        if (arrselected.length == $('#tbody tr').size()) {
            $('#checkAll').find('i').css({ 'background': '#86f567' });
        } else {
            $('#checkAll').find('i').attr('style', '');
        }
    });

    //渲染数据
    $.ajax({
        type: 'get',
        data: {
            m: 'render'
        },
        url: '/api/orderList',
        success: function (str) {
            //console.log(str);
            var html = str.map(function (item) {
                return `<tr class="" data-id="${item.id}">
                                    <td class="layui-table-col-special">
                                        <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
                                            <input type="checkbox" name="layTableCheckbox" lay-skin="primary"
                                                checked="">
                                            <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
                                                <i class="layui-icon layui-icon-ok selectedBoxi"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-1">${item.id}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-2">${item.name}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-3"><em>${item.price}</em></div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-4">${item.qty}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-5">${item.freight}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-6">${item.goodsTotal}
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-7">${item.totalOrder}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-8">2018-11-11
                                        </div>
                                    </td>
                                    <td class="layui-table-col-special" style="text-align: center">
                                        <div class="layui-table-cell laytable-cell-1-0-11">
                                            
                                            <a class="layui-btn layui-btn-danger layui-btn-xs delete">删除</a>
                                            
                                        </div>
                                    </td>
                                </tr>`;
            }).join('');
            $("#tbody").html(html);
        }
    });


    //删除
    $('#tbody').on('click', '.delete', function () {
        let id = $(this).parents('tr').attr('data-id');
        let res = confirm('您真的需要删除该订单信息？');
        let data_ok = $(this).parents('tr').children().eq(0).find('i').attr('data-ok');
        //console.log(data_ok)
        //console.log(id);
        if (res && data_ok == 'true') {
            $.ajax({
                type: 'get',
                data: {
                    m: 'delete',
                    id
                },
                url: '/api/orderList',
                success: function (str) {
                    //console.log(str);
                    if (str.ok == 1) {
                        alert('删除成功');
                    }
                     
                }
            });
            $(this).parents('tr').remove();
        }
        
    });
});