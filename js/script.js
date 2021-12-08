



// =========================================================================




$(document).ready(function(){
    // Mobile nav touch
    // $('.left-sb-wrapper').on("swipeleft", closeNav);


    // function disabledraggable(item){
    //   if(item.find('.total').val() < 1){
    //     $(item).draggable({ disabled: true });
    //   }
    //   else{
    //     return;
    //   }
    // }




  var fakeWrapper = `<div class="open-box-wrapper empty-box">
                        <div class="open-box">

                      </div>
                    </div>

                   `;
  var fakeDropbox = `<div class="dropped-box"></div>`;

   var fakeItems = `<div class="item" data-item="milk" >  
              <a href="javascript:void(0)">
                <img src="https://ychef.files.bbci.co.uk/976x549/p07vvrpj.jpg" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="5" readonly="readonly"> шт.
            </div>
        
            <div class="item"  data-item="cola" > 
              <a href="javascript:void(0)">
                <img src="https://media.istockphoto.com/photos/coke-picture-id458464735?k=20&m=458464735&s=612x612&w=0&h=CW8rzEiIMvuO23X9I3b6U_g2aBUQSZnWYLjWauLMxtg=" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="3" readonly="readonly"> шт.
            </div>

            <div class="item" data-item="fanta" > 
              <a href="javascript:void(0)">
                <img src="https://www.coca-cola.ru/content/dam/one/ru/ru/products/fanta-orange-330-glass.png" width="35" height="35">
              </a>
              <input type="text" name="total" class="total" value="1" readonly="readonly"> шт.
            </div>`;

    // var fakeBasket = `<div class="basket">  
    //         <p>Перетащите товар сюда</p>
    //         <img src="https://media.istockphoto.com/photos/isolated-shot-of-opened-blank-cardboard-box-on-white-background-picture-id1128890899?k=20&m=1128890899&s=612x612&w=0&h=GfjgLKbgACDs0WcVQXie7fw0_NNwu2w01RmX2MKcC-Q=" class="open-box">   
    //       </div>`;

    var fakeBasket = `<div class="basket">  
      <h5>Перетащите товар сюда</h5>
      <p>Чтобы отправить его пакупателью в отдельной упаковке</p>
    </div>`;

    var fakeTitle = `<h5 class="title">Отправление <span></span></h5>`;

     // ========================

    // $('#main').append(fakeWrapper);
    // $('.dropped-box-wrapper .dropped-box:nth-child(1) ').append(fakeItems);
    // $('.open-box-wrapper').eq(1).prepend(fakeBasket);
    $('.open-box-wrapper').eq(1).prepend(fakeTitle);
    $('.open-box-wrapper').eq(1).find('.title > span').text( parseInt( $('.open-box-wrapper').eq(0).find('.title > span').text() ) + 1);




    $(".item").draggable({
      revert: "invalid",
      containment: "document",
      helper: "clone",
      cursor: "move",
      start  : function(event, ui){
          $(ui.helper).css('width', `${ $(event.target).width() }px`);
      }
    });





    function updateDroppables(){
        $( ".open-box-wrapper" ).droppable({
            accept: ".item",
            // accept: function(e){
            //       // alert(e.attr('class'));
            //   if(e.hasClass('item' )){
            //     return "item";
            //   }
            // },
            // activeClass: "ui-droppable",
            // out: function( event, ui ) {
            //   itemcounter = $(ui.draggable).siblings().length;
            //   console.log( itemcounter);

            // },

            drop: function(event, ui) {
              // console.log(  $(ui.draggable).siblings('.item').length -1);
              // if ( ($(ui.draggable).siblings('.item').length -1) == 0) {
              //       // alert('065453');
              //       $(ui.draggable).parents('.open-box-wrapper').html(' ');
              //       // $(ui.draggable).parents('.open-box-wrapper').css('background', 'red');
              //       // if(this.item === undefined) {console.log(this.item)}
              // }


              event.preventDefault();
              var draggableItemTitle = $(ui.draggable).parents('.open-box-wrapper').find('.title');

          


              // debugger
               if ($(this).find('.item[data-item="' + $(ui.draggable).data('item') +'"]').length == 1  ) {

                  $(this).find('.item[data-item="'+ $(ui.draggable).data('item') +'"]').find('.total').text( parseInt($(ui.draggable).find('.total').text()) +   parseInt( $(this).find('.item[data-item="'+ $(ui.draggable).data('item') +'"]').find('.total').text() )  );

                  $(ui.draggable).remove();

                }
          



              if ($(this).find('.item[data-item="'+ $(ui.draggable).data('item') +'"]').length < 1) {
 
                // if there is no an item inside of box with same name as draggable item , than add it to a new box
                $(this).find('.open-box').append($(ui.draggable) );

                if (!$(this).hasClass('open-box')) {
                  $(this).find('.item').removeClass('main-item');
                }

                // $(this).find('.item').removeClass('main-item');


                // // delete current item from main items
                // $('.main-item[data-item="' + $(ui.draggable).data('item') +'"]').remove();

              }

              ;
              if ($(this).find('.item').length == 1  ) {

                if($(this).next('.open-box-wrapper').find('.title').length  == 1){
                  return;
                }
                else{
                // adding new box wrapper

                $(this).after(fakeWrapper);
                // adding new dropping title
                $(this).next('.open-box-wrapper').prepend(fakeTitle);
                $(this).next('.open-box-wrapper').find('.title > span').text( parseInt( $(this).find('.title > span').text() ) + 1);

                }
              }



              // console.log(draggableItemTitle.parents('.open-box-wrapper').find('.item').length-1);


              if ( (draggableItemTitle.parents('.open-box-wrapper').find('.item').length-1) == 0 ) {

                draggableItemTitle.parents('.open-box-wrapper').addClass('empty-box');



                if (draggableItemTitle.parents('.open-box-wrapper').hasClass('main-box')) {
                  return;
                }
                else{
                  draggableItemTitle.parents('.open-box-wrapper').remove();
                  $('.title').each(function(index){

                    $(this).find('span').text( index + 1 );
                    
                  });
                }
              }

              

              $('.open-box-wrapper').each(function(){
                if ($(this).find('.item').length  > 0) {
                  $(this).removeClass('empty-box');
                }

              });








              // if ( (draggableItemTitle.parents('.open-box-wrapper').find('.item').length-1) > 0 ){
              //   draggableItemTitle.parents('.open-box-wrapper').removeClass('.empty-box');
              // }


              // $('.title').each(function(index, elem){
              //   // console.log(draggableItemTitle.find('span').text());
              //   // if ( $(this).find('.span').text() == '0' ) {
              //     // console.log($(this).html());
              //     // console.log($(this).find('span').text());
              //   //   // console.log($(draggableItemTitle).parents('.open-box-wrapper').find('.item').length - 1 );
              //     if(parseInt($(elem).find('span').text()) != 0 ){
              //       console.log($(elem).find('span').text());
              //     }
              //   // }
              //   // console.log($(this).text());
   

              // });




              updateDroppables();

            }
        });


    };


    updateDroppables();



});




$(document).on('click','.minus-item',function(){

  $(this).siblings('.total').text(parseInt($(this).siblings('.total').text()) - 1 );  


  // remove item from box
  if ($(this).siblings('.total').text() == 0) {

     // remove box if its empty
    if ($(this).parents('.open-box-wrapper').find('.item').length == 1) {
      $(this).parents('.open-box-wrapper').remove();

      $('.title').each(function(index){

        $(this).find('span').text( index + 1 );
      });
    }

    // remove item from the box
    $(this).parents('.item').remove();


  }



  // plus one more item to main box
  if ($('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).length  == 1  ){
    $('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).find('.total').text( parseInt( $('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).find('.total').text() ) + 1);    
  }

  // send  first item to main box
  if ($('.main-open-box').find($('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]')).length < 1 ) {
    $('.main-open-box').append($(this).parents('.item').clone().draggable({
                                                              revert: "invalid",
                                                              containment: "document",
                                                              helper: "clone",
                                                              cursor: "move"
                                                            }).addClass('main-item'));
    $('.main-item[data-item="'+ $(this).parents('.item').data('item') +'"]').find('.total').text(1);

  
  };

  if ($('.main-box').find('.item').length > 0) {
    $('.main-box').removeClass('empty-box');
  }


});

