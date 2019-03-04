$(function(){
//点击的时候添加用户
$('.btn').on('click',function(){
    setTimeout(() => {
        location.href="add.html"
    },1000);
    
})
$('.useradd').on('click',function(){
    setTimeout(() => {
        location.href="add.html"
    },1000);
    
})
// $('.layui-icon').attr('type','checkbox');


    //用户名渲染
    // $.post('http://localhost:1811/api/userlist',{
    //     data:1
    // },function(res){
    //    console.log(res)
    // })
    $.ajax({
        type:'post',
        url:'http://localhost:1811/api/userlist',
        data:{
            num:8,
        },
        success:function(res){
            // console.log(res)
            var arr=res;
            var html=arr.map(function(item){
                return ` <tr class="">
                <td class="layui-table-col-special">
                    <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
                        <input type="checkbox" name="layTableCheckbox" lay-skin="primary" checked="">
                        <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
                            <i class="layui-icon layui-icon-ok id"></i>
                        </div>
                    </div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-1">${item.dataid}</div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-2 name">${item.username}</div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-3"><em>${item.gender}</em></div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-4">${item.city}</div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-5">${item.signature}</div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-6">${item.zy}
                    </div>
                </td>
                <td class="">
                    <div class="layui-table-cell laytable-cell-1-0-6">${item.grade}
                    </div>
                </td>
                <td class="">
                <div class="layui-table-cell laytable-cell-1-0-8">${item.time}
                </div>
            </td>
                <td class="layui-table-col-special">
                <div class="layui-table-cell laytable-cell-1-0-11">
                <button class="layui-btn btn1"><i class="layui-icon"></i></button>
                <button class="layui-btn btn2"><i class="layui-icon"></i></button>
                </div>
            </td>
            </tr>`
            }).join('')
            $('#tbody').html(html);
            $('#tbody i').attr('type','checkbox');





            //点击修改用户信息
            $('#tbody').on('click','.btn1',function(){
                // console.log($('.name'))
                let data=$($(this).parent().parent().parent().children()[1]).find('div').html();
                // console.log(data)
                // console.log(data)
                location.href='add_.html?'+data;
            });


            //点击单个删除
            $('#tbody').on('click','.btn2',function(){
               let del=$($(this).parent().parent().parent().children()[2]).find('div').html();
            //    console.log(del)
                let del1=$(this).parent().parent().parent();
                del1.remove();
            // console.log(del1)
            $.post('http://localhost:1811/api/delete',{
                delete:del
            },function(res){
                // console.log(res)
            })
            })

                //点击全选
                $('thead i').on('click',function(){
                    if($('#tbody .id').attr('data-id')){
                        $('#tbody .id').css('background-color','#fff')
                        $('#tbody .id').removeAttr('data-id','id');//删除属性
                        $(this).css('background-color','#fff')
                        // console.log(1)
                    
                    }else{
                        $('#tbody .id').css('background-color','red')
                        $('#tbody .id').attr('data-id','id');//加入这个属性
                        $(this).css('background-color','red')
                        $(this).css('background-color','red')
                    }
                  
                })




              //点击一个的时候背景色变化
                $('#tbody').on('click','i',function(){
                    if($(this).attr('data-id')){
                        $(this).css('background-color','#fff');
                        $(this).removeAttr("data-id");//删除属性
                    }else{
                        $(this).css('background-color','red')
                        $(this).attr('data-id','id');//加入这个属性
                    }
                   
                
                })
                // console.log(arr)
                //点击删除的时候把勾选的删除
            $('.del').on('click',function(){
                var arr=[];
                for(var i=0;i<$('#tbody tr').length;i++){
                    if($('#tbody tr').eq(i).find('i').attr('data-id')){
                        arr.push(i);
                    } 
                }
                // console.log(arr)
                for(var j=arr.length-1;j>=0;j--){
                    // console.log($($('#tbody tr').eq(arr[j]).children()[1]).find('div').html())
                    let nom=$($('#tbody tr').eq(arr[j]).children()[2]).find('div').html()
                    console.log(nom)
                    // $.post('http:localhost:1811/api/delete',{
                    //     dataid:nom,
                    // },function(res){
                    //     // console.log(res)
                    $.ajax({
                        type:'post',
                        url:'http://localhost:1811/api/delete',
                        data:{
                        delete:nom,
                        },success:function(){
    
                        }
                    });
                    // })
                    $('#tbody tr').eq(arr[j]).remove();
                    // arr[j].remove();
                }
               
               
            })


            //分页
            layui.use(['laypage', 'layer'], function(){
                let total;
                $.get('http://localhost:1811/api/userpage',{
            
            },function(res){
                // console.log(res)
                  total=res.total;//总条数
            
            
                var laypage = layui.laypage
                ,layer = layui.layer;
            
            
              //完整功能
              
              laypage.render({
                elem: 'demo7'
                ,count:total,//总条数
                limit:8,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                ,jump: function(obj){
                //   console.log(obj)
                  let num=obj.curr;//下标
                //   console.log(num)
                  $.get('http://localhost:1811/api/userpage',{
                    index:num,
                    limit:8,
                  },
                  function(res){
                    // console.log(res)
                    var arr1=res.name1;
                    var html1=arr1.map(function(item){
                        return ` <tr class="">
                        <td class="layui-table-col-special">
                            <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
                                <input type="checkbox" name="layTableCheckbox" lay-skin="primary" checked="">
                                <div class="layui-unselect layui-form-checkbox" lay-skin="primary">
                                    <i class="layui-icon layui-icon-ok id"></i>
                                </div>
                            </div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-1">${item.dataid}</div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-2 name">${item.username}</div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-3"><em>${item.gender}</em></div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-4">${item.city}</div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-5">${item.signature}</div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-6">${item.zy}
                            </div>
                        </td>
                        <td class="">
                            <div class="layui-table-cell laytable-cell-1-0-6">${item.grade}
                            </div>
                        </td>
                        <td class="">
                        <div class="layui-table-cell laytable-cell-1-0-8">${item.time}
                        </div>
                    </td>
                        <td class="layui-table-col-special">
                        <div class="layui-table-cell laytable-cell-1-0-11">
                        <button class="layui-btn btn1"><i class="layui-icon"></i></button>
                        <button class="layui-btn btn2"><i class="layui-icon"></i></button>
                        </div>
                    </td>
                    </tr>`
                    }).join('')
                    $('#tbody').html(html1);
                  })
                }
              });
                //   console.log(total)

                //点击页码时
                // $(this).on('click',function(){
                    // let index=$(this);
                   
                //     $.get('http://localhost:1811/api/userpage',{
                        
                //     })
                // })
            })
              
              
            });


        }
        
        
    });

    
    //删除
    //修改
    // console.log($('#tbody #btn1'))
   
    

})