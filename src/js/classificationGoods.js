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


    //分类的内容
    let classifiedContent = ['面霜', '口红', '洁面乳', '精华', '眼霜', '防晒霜'];
    let classified = ['faceCream', 'lipstick', 'cleanser', 'essence', 'eyeCream', 'sunscreen'];

    $.ajax({
        type: 'get',
        url: '/api/classificationAdd',
        data: {
            m: "render"
        },
        success: function (str) {
            console.log(str)
            let html = str.data.map(function (item, i) {

                return `<tr class="" data-class=${item.eclass} data-chin="${item.class}" data-id="${item.id}">
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
                                        <div class="layui-table-cell laytable-cell-1-0-1">${i + 1}</div>
                                    </td>
                                    
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-7">${item.class}</div>
                                    </td>
                                    <td class="">
                                        <div class="layui-table-cell laytable-cell-1-0-8">2018-11-11
                                        </div>
                                    </td>
                                    <td class="layui-table-col-special">
                                        <div class="layui-table-cell laytable-cell-1-0-11">
                                            <a class="layui-btn layui-btn-xs edit">编辑</a>
                                            <a class="layui-btn layui-btn-danger layui-btn-xs delete">删除</a>
                                        </div>
                                    </td>
                                </tr>`;
            }).join("");

            $('#tbody').html(html);
        }

    });





    //跳转编辑分类
    $('#tbody').on('click', '.edit', function () {
        location.href = "./classificationEdit.html?" + $(this).parents('tr').attr('data-class');
    });

    //跳转添加分类
    $('#add').on('click', function () {
        location.href = "./classificationAdd.html";
    });


    //编辑删除
    $('#tbody').on('click', '.delete', function () {
        let res = confirm('您真的需要删除该分类');
        let eclass = $(this).parents('tr').attr('data-class');
        if (res) {

            $.ajax({
                type: 'get',
                data: {
                    m: 'delete',
                    eclass

                },
                url: '/api/classificationAdd',
                success: function (str) {

                }
            });

            $(this).parents('tr').remove();
        }
    });



    //删除多条
    $('#deleteAll').on('click', function () {
        //console.log(arrselected)
        if (arrselected.length > 0) {
            let res = window.confirm('您真的要删除这些商品吗？');
            if (res) {
                for (var i = arrselected.length - 1; i >= 0; i--) {

                    let class_id = '';
                    class_id = $('#tbody tr').eq(arrselected[i]).attr('data-id');
                    console.log(class_id)

                    // //请求数据库删除
                    $.ajax({
                        type: 'get',
                        data: {
                            class_id,
                            m: 'deleteId'
                        },
                        url: '/api/classificationAdd',
                        success: function (str) {
                            if (str == 'yes') {

                            }
                        }
                    });
                    $('#tbody tr').eq(arrselected[i]).remove();
                }

            }
        }
    });

})
