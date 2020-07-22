
jQuery(document).ready(function(){
    const arr = ["red","orange","blueviolet","blue", "green","yellow"];
    let listItem = [];
    var count = 1;

    //  здесь хранится переменная цвета
    let color = "";

    // вызов функции возвращает рандомный цвет типа строка из массива цветов
    function getRandomColor() {
        //console.log('getRandomColor');
        let numRand = Math.round(Math.random() * (arr.length-1));
        return arr[numRand];
    }
    for(let i = 0; i < arr.length; i++){
        $('#color_picker').append('<button id="b_' + arr[i] + '" class="b_color"></button>');
    }
    // цикл добавляет 6 кнопок выбора цвета
    // the loop adds six button to select a color // need to add new button-id
   /* for(let i = 1; i === arr.length; i++){
        console.log('for create color button');
        $('#color_picker').append('<button id="b_' + i+'" class="b_color"></button>');
    }*/


    $('#b_red').on('click', function () {
        console.log('click b1');
        color = 'red';

        updateColor(color);

    })
    $('#b_orange').on('click', function () {
        console.log('click b2');
        color = 'orange';
        updateColor(color);

        // console.log('@@@@@@@222222123123123123123123213            ')
        //getChecked('deeppink')
    })
    $('#b_blueviolet').on('click', function () {
        console.log('click b3');
        color = 'blueviolet';
        updateColor(color);
        //getChecked('blueviolet')
    })
    $('#b_blue').on('click', function () {
        console.log('click b4');
        color = 'blue';
        updateColor(color);
        //getChecked('blue')
    })
    $('#b_green').on('click', function () {
        console.log('click b5');
        color = 'green';
        updateColor(color);
       // getChecked('green')
    })
    $('#b_yellow').on('click', function () {
        console.log('click b6');
        color = 'yellow';
        updateColor(color);
        //getChecked('yellow')
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
                str = x.split();
            })
            if(str !== ''){  //проверка на пустую строку или пробелы
               newItem(count, str, color);
            }
        }
    })


 // ВЫТАЩИТЬ ИЗ keydown и b_add обработку и перенести ее в один метод


    $('#b_add_item').on('click',function () {
        //console.log('click button add')
        let str = '';
        $('#input_item').val(function (index, x) {  //получаем текст из инпут
            str = x.split();
        })
        if(str !== ''){  //проверка на пустую строку или пробелы
            newItem(count, str, color);
        }
    });

    //creating a new obj(item) with properties
    const newItem = (number, textItem, colorItem) => {
        //console.log('newItem()');
        let color = colorItem === '' ? getRandomColor() : colorItem;

        if(color === ''){
            color = getRandomColor();
        }
        let item = {  //возможно не будет работать из-за const
            id: number,
            title: textItem,
            status: false,
            color: color
        }
        listItem.push(item);

        createItem(item);  //test case of calling "create-method" from the current method
    }


    const updateStatus = (id) => {

        listItem.map((el) => {
            if(el.id === id){
                el.status = !el.status;
            }
        })
        //console.log('list map @@@@@@@@  el id: ' + el.id + "  el.status: " + el.status);
    }

    const createItem = (item) => {

        console.log('call method Create Item');

        $('#div_item').append(renderItem(item));

        //здесь можно получать ид выбранного item  и добавлять в массив их id, затем проходиться по массиву
        // или брать id и сравнивать с массивом текущих item, и при совпадении менять статус
        //затем при нажатии на кнопку цвета я беру массив текущих элементов и у тех, у которых статус true я присваиваю бэкгрунд колор в цвет выбранной кнопки

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

   /* const render = (item) => {

        return `
            <div 
             id = item.id 
             class = "d_new_item">
                     <div 
                     class="d_checkbox_item"
                     style = 'background-color: red'
                          >
                          <input 
                           class="i_checkbox_item"
                           type="checkbox">
                     </div>
                     <div
                       class="d_item_name" 
                       style="background-color: red"
                        >
                        
                     </div>
            </div>>
            `;
    }*/















    // Это рабочий метод нахождения элемента и его родителя
    /*console.log($('#div_item .i_checkbox_item:checked'));
    $('#div_item .i_checkbox_item:checked').map((index,item,)=>{
        const test = $(`#${item.id}`).parent().parent()
        console.log(test);
    })*/










    /*    var count = 0;
        var checkColor = '';
        var arrCheckbox = [];  //массив содержащий имена всех чекбоксов

       /!* const arr = ["red","pink", "green","yellow",
            "blue", "orange"];*!/

        // вызов функции возвращает рандомный цвет типа строки
        function getRandomColor() {
            let numRand = Math.round(Math.random() * (arr.length-1));
            return arr[numRand];
        }

        // цикл добавляет 6 кнопок выбора цвета
        for(let i = 1; i <= 6; i++){
            $('#color_picker').append('<button id="b_' + i+'" class="b_color"></button>');
        }

        function getChecked(currentColor){
            for(let i = 0; i < arrCheckbox.length; i++){
                let element = document.getElementById(arrCheckbox[i]);

                if(element.checked){
                   let checkbox = '#d_checkbox_item_' + i;
                   let itemName = '#d_item_name_'+ i;
                   $(checkbox).css('background-color', currentColor);
                   $(itemName).css('background-color', currentColor);
                }
            }
        }*/

    /*$('#b_1').on('click', function () {
        checkColor = 'red';
        getChecked('red');

    })
    $('#b_2').on('click', function () {
        checkColor = 'deeppink';
        getChecked('deeppink')
    })
    $('#b_3').on('click', function () {
        checkColor = 'blueviolet';
        getChecked('blueviolet')
    })
    $('#b_4').on('click', function () {
        checkColor = 'blue';
        getChecked('blue')
    })
    $('#b_5').on('click', function () {
        checkColor = 'green';
        getChecked('green')
    })
    $('#b_6').on('click', function () {
        checkColor = 'yellow';
        getChecked('yellow')
    })*/

   /* $(document).keyup(function (e) {
        if(e.keyCode === 13){
            add();
        }
    })
*/
    /*//обработка нажатия кнопки 'Add'
    $('#b_add_item').on('click',function () {
        add();
    });*/

    // функция получает текст из инпут(при отсутствии текста Ретурн), вызывает метод для создания элемента Item

   /* function add() {
        let str = '';
        $('#input_item').val(function (index, x) {  //получаем текст из инпут
            str = x;
        })

        if(str == ''){
            return;
        }
        createItem(str,checkColor);
        checkColor = '';
        count++;
    }*/

    /*function createItem2(itemName, color) {
        let newColorItem;

        // если цвет не передан, то присваиваем рандомный цвет
        if(color != ''){
            newColorItem = color;
        } else {
            newColorItem = getRandomColor();
        }

        //создание элемента item
        $('#div_item').append(function () {
            return "<div id='"+count+"' class='d_new_item'>" +
                "<div id='d_checkbox_item_"+count+"' class='d_checkbox_item' style='background-color: " + newColorItem  + "'>" +
                "<input id='checkbox_"+ count +"' class='i_checkbox_item' type='checkbox'></div>" +
                "<div id='d_item_name_"+count+"' class='d_item_name' style='background-color: " + newColorItem  + "'>"+itemName+"</div></div>"
        });

        arrCheckbox.push('checkbox_'+ count);

        $('#input_item').focus();

    }*/
});



