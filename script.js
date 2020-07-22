
jQuery(document).ready(function(){
    const arr = ["red","orange","blueviolet","blue", "green","yellow"];
    const listItem = [];
    var count = 1;

    //  здесь хранится переменная цвета
    let color = "";

    // вызов функции возвращает рандомный цвет типа строка из массива цветов
    function getRandomColor() {
        let numRand = Math.round(Math.random() * (arr.length-1));
        return arr[numRand];
    }
    for(let i = 0; i < arr.length; i++){
        $('#color_picker').append('<button id="b_' + arr[i] + '" class="b_color"></button>');
    }


    $('#b_red').on('click', function () {
        console.log('click b1');
        color = 'red';
        updateColor(color);

    })
    $('#b_orange').on('click', function () {
        console.log('click b2');
        color = 'orange';
        updateColor(color);
    })
    $('#b_blueviolet').on('click', function () {
        console.log('click b3');
        color = 'blueviolet';
        updateColor(color);
    })
    $('#b_blue').on('click', function () {
        console.log('click b4');
        color = 'blue';
        updateColor(color);
    })
    $('#b_green').on('click', function () {
        console.log('click b5');
        color = 'green';
        updateColor(color);
    })
    $('#b_yellow').on('click', function () {
        console.log('click b6');
        color = 'yellow';
        updateColor(color);
    })

    const updateColor = (color) => {
        listItem.map((el) => {
            if(el.status){
                let id = el.id;

                let itemCheckbox = '#d_checkbox_item_' + id;
                let itemName = '#d_item_name_' + id;

                $(itemCheckbox).css('background-color', color);
                $(itemName).css('background-color', color);
            }
        })
    }

    // add method call newItem()
    $(document).keydown((ev)  => {
        if(ev.keyCode === 13){
            //console.log('enter click');
            let str = '';

            $('#input_item').val(function (index, x) {  //получаем текст из инпут
                str = x.trim();
            })
            if(str !== ''){
               newItem(count, str, color);
            }
        }
    })

 // ВЫТАЩИТЬ ИЗ keydown и b_add обработку и перенести ее в один метод

    $('#b_add_item').on('click',function () {
        let str = '';
        $('#input_item').val(function (index, x) {  //получаем текст из инпут
            str = x.trim();
        })
        if(str !== ''){  //проверка на пустую строку или пробелы
            newItem(count, str, color);
        }
    });

    //creating a new obj(item) with properties
    const newItem = (number, textItem, colorItem) => {

        let color = colorItem === '' ? getRandomColor() : colorItem;

        if(color === ''){
            color = getRandomColor();
        }
        const item = {  //возможно не будет работать из-за const
            id: number,
            title: textItem,
            status: false,
            color: color
        }
        listItem.push(item);

        createItem(item);
    }

    const updateStatus = (id) => {
        listItem.map((el) => {
            if(el.id === id){
                el.status = !el.status;
            }
        })
    }

    const createItem = (item) => {
        $('#div_item').append(renderItem(item));

        $('#checkbox_' + item.id).on('click',()=>{
            console.log('onclick FROM createItem      id: ' + item.id + ', title: ' + item.title + ', status: ' + item.status);
            //console.log('list item test = ' + listItem)
            console.log('%%%  id push = ' + item.id);
            updateStatus(item.id);
        })
        count++;
    }
   const renderItem = (item) => {
      // console.log('renderItem');
        return "<div id = '" + item.id + "' class = 'd_new_item'>" +
            "<div id ='d_checkbox_item_" + item.id  + "' class = 'd_checkbox_item' style = 'background-color: " + item.color  + "'>" +
            "<input id = 'checkbox_" + item.id  + "' class = 'i_checkbox_item' type = 'checkbox'></div>" +
            "<div id = 'd_item_name_" + item.id  + "' class = 'd_item_name' style = 'background-color: " + item.color + "'>" + item.title + "</div>" +
            "</div>"
    }

    // Это рабочий метод нахождения элемента и его родителя
    /*console.log($('#div_item .i_checkbox_item:checked'));
    $('#div_item .i_checkbox_item:checked').map((index,item,)=>{
        const test = $(`#${item.id}`).parent().parent()
        console.log(test);
    })*/

});



