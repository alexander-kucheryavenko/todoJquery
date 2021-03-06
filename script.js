jQuery(document).ready(function () {
    const arr = ["red", "orange", "blueviolet", "blue", "green", "yellow"];

    //create color picker
    const $color_picker = $('#color_picker');
    for (let i = 0; i < arr.length; i++) {
        $color_picker.append('<button id = "b_' + arr[i] + '" class = "b_color"></button>');
    }

    var count = 1;  //counter
    const listItem = [];  //saved todoItem objects
    const $input_item = $('#input_item');
    const $b_color = $('.b_color');
    const $b_add_item = $('#b_add_item');
    const $div_item = $('#div_item');
    const $div = $("<div>");
    let color = "";

    function getRandomColor() {
        let numRand = Math.round(Math.random() * (arr.length - 1));
        return arr[numRand];
    }

    $b_color.on('click', function () {
        let clickId = $(this).attr('id');

        switch (clickId) {
            case 'b_red':
                color = 'red';
                break;
            case 'b_orange':
                color = 'orange';
                break;
            case 'b_blueviolet':
                color = 'blueviolet';
                break;
            case 'b_blue':
                color = 'blue';
                break;
            case 'b_green':
                color = 'green';
                break;
            case 'b_yellow':
                color = 'yellow';
                break;
            default:
                break;
        }
        updateColor(color);
    })

    const updateColor = (color) => {
        listItem.map((el) => {
            if (el.status) {
                let id = el.id;

                let itemCheckbox = '#d_checkbox_item_' + id;
                let itemName = '#d_item_name_' + id;

                $(itemCheckbox).css('background-color', color);
                $(itemName).css('background-color', color);
            }
        })
    }

    $input_item.keydown((ev) => {
        if (ev.keyCode === 13) {
            $input_item.val(function (index, x) {
                newItem(count, x, color);
            })
        }
    })

    $b_add_item.on('click', function () {
        $input_item.val(function (index, text) {
            newItem(count, text, color);
        })
    });

    //creating a new obj(item) with properties
    const newItem = (number, text, colorItem) => {

        let textItemTest = text.trim();

        if (textItemTest === '') {
            return;
        }
        //$("div.someClass").text(textItem);
        let textItem = $div.text(textItemTest).html();

        let color = colorItem === '' ? getRandomColor() : colorItem;

        if (color === '') {
            color = getRandomColor();
        }
        const item = {
            id: number,
            title: textItem,
            status: false,
            color: color
        }
        listItem.push(item);
        createItem(item);
    }

    //called when the checkbox changes
    const updateStatus = (id) => {
        listItem.map((el) => {
            if (el.id === id) {
                el.status = !el.status;
            }
        })
    }

    const createItem = (item) => {
        $div_item.append(renderItem(item));
        $('#checkbox_' + item.id).on('click', () => {
            updateStatus(item.id);
        })
        count++;
        color = '';
    }
    const renderItem = (item) => {
        return "<div id = '" + item.id + "' class = 'd_new_item'>" +
            "<div id ='d_checkbox_item_" + item.id + "' class = 'd_checkbox_item' style = 'background-color: " + item.color + "'>" +
            "<input id = 'checkbox_" + item.id + "' class = 'i_checkbox_item' type = 'checkbox'></div>" +
            "<div id = 'd_item_name_" + item.id + "' class = 'd_item_name' style = 'background-color: " + item.color + "'>" + item.title + "</div>" +
            "</div>"
    }
});