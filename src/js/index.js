/**
 * Created by mrbloom on 23.01.2017.
 **/
// event.type должен быть keypress
//import from which.js


let letters=[];
let num_letters = 0;
let counter = 0;
let letter_delay = 2000;
let node_map = {};
let hidden_class = "hidden";
let red_number = 0;
let red_color = "crimson";
let cont_id = "cont";

function nodes2map(nodes){
    let map={};
    nodes.forEach(function (node){
        map[node.innerHTML]=node
    });
    return map;
}

function shuffle(div_list){
    var arr = Array.prototype.slice.call(div_list);
    arr.forEach(function(e,i,a){
        let j = Math.floor(Math.random() * i);
        [a[i], a[j]] = [a[j], a[i]];
    });
    print_nodes(arr);
    return arr;
}

function print_nodes(arr){
    let txt = "[";
    for (let i=0; i<arr.length; i++){
        txt += arr[i].innerHTML + ",";
    }
    txt += "]";
    console.log(txt)
}

window.onload = function(){
    letters = document.querySelectorAll(".letter");
    num_letters = letters.length;
    node_map = nodes2map(letters);

    letters.forEach(function (letter){
        letter.remove()
    });

    letters = shuffle(letters);
    letters[red_number].style.color = red_color;
    red_number++;
    //console.log(window.innerHeight);
};

let timer = window.setInterval(function(){
    let cont = document.getElementById(cont_id);
    if(counter<num_letters) {
        letters[counter].classList.toggle(hidden_class);
        cont.appendChild(letters[counter]);
        counter++;
    }else {
        window.clearInterval(timer);
    }
},letter_delay,letters);

document.onkeydown = function(event){
    let code = event.which || event.keyCode;

    function hide_red(ch){
        if(ch in node_map){
            //console.log(ch)
            //console.log(node_map[ch])
            if (!node_map[ch].classList.contains(hidden_class) && (node_map[ch].style.color == red_color) ){
                node_map[ch].classList.add(hidden_class);

                if(red_number<num_letters){
                    letters[red_number].style.color = red_color;
                    red_number++;
                }
            }
        }
    }

    function proccess_lang(which){
        let ch = which[code];
        try {
            hide_red(ch);
            let CH = ch.toUpperCase();
            hide_red(CH);
        }
        catch(err){
            console.error(err);
        }
    }

    proccess_lang(whichUA);
    proccess_lang(whichEN);
    proccess_lang(whichNUM);
};
