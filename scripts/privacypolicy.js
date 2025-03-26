document.getElementById("darkMode").addEventListener("click", function(){
    if(document.getElementById("darkMode").innerHTML == "dark mode"){
        document.querySelector("link").href = "./styles/darkmodemain.css";
        document.getElementById("darkMode").innerHTML = "light mode";
    } else{
        document.querySelector("link").href = "./styles/main.css";
        document.getElementById("darkMode").innerHTML = "dark mode";
    }
});


document.getElementById("guide").addEventListener("click", function(){
    window.open("../guide.html");
})

plusminus = 0;

document.getElementById("minun").addEventListener("click", function(){
    if(plusminus > -0.5){
        plusminus-=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
    }
});

document.getElementById("plusle").addEventListener("click", function(){
    if(plusminus < 0.5){
        plusminus+=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
    }
});