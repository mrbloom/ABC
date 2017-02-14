"use strict";

/**
* Created by mrbloom on 23.01.2017.
**/
// event.type должен быть keypress
//import from which.js


var letters = [];
var num_letters = 0;
var counter = 0;
var letter_delay = 2000;
var node_map = {};
var hidden_class = "hidden";
var red_number = 0;
var red_color = "crimson";
var cont_id = "cont";

function nodes2map(nodes) {
    var map = {};
    nodes.forEach(function (node) {
        map[node.innerHTML] = node;
    });
    return map;
}

function shuffle(div_list) {
    var arr = Array.prototype.slice.call(div_list);
    arr.forEach(function (e, i, a) {
        var j = Math.floor(Math.random() * i);
        var _ref = [a[j], a[i]];
        a[i] = _ref[0];
        a[j] = _ref[1];
    });
    print_nodes(arr);
    return arr;
}

function print_nodes(arr) {
    var txt = "[";
    for (var i = 0; i < arr.length; i++) {
        txt += arr[i].innerHTML + ",";
    }
    txt += "]";
    console.log(txt);
}

window.onload = function () {
    letters = document.querySelectorAll(".letter");
    num_letters = letters.length;
    node_map = nodes2map(letters);

    letters.forEach(function (letter) {
        letter.remove();
    });

    letters = shuffle(letters);
    letters[red_number].style.color = red_color;
    red_number++;
    //console.log(window.innerHeight);
};

var timer = window.setInterval(function () {
    var cont = document.getElementById(cont_id);
    if (counter < num_letters) {
        letters[counter].classList.toggle(hidden_class);
        cont.appendChild(letters[counter]);
        counter++;
    } else {
        window.clearInterval(timer);
    }
}, letter_delay, letters);

document.onkeydown = function (event) {
    var code = event.which || event.keyCode;

    function hide_red(ch) {
        if (ch in node_map) {
            //console.log(ch)
            //console.log(node_map[ch])
            if (!node_map[ch].classList.contains(hidden_class) && node_map[ch].style.color == red_color) {
                node_map[ch].classList.add(hidden_class);

                if (red_number < num_letters) {
                    letters[red_number].style.color = red_color;
                    red_number++;
                }
            }
        }
    }

    function proccess_lang(which) {
        var ch = which[code];
        try {
            hide_red(ch);
            var CH = ch.toUpperCase();
            hide_red(CH);
        } catch (err) {
            console.error(err);
        }
    }

    proccess_lang(whichUA);
    proccess_lang(whichEN);
    proccess_lang(whichNUM);
};