document.getElementById("privacyPolicy").addEventListener("click", function(){
    window.open("../privacypolicy.html");
});

document.getElementById("darkMode").addEventListener("click", function(){
    if(document.getElementById("darkMode").innerHTML == "dark mode"){
        document.querySelector("link").href = "./styles/darkmodeguide.css";
        document.getElementById("darkMode").innerHTML = "light mode";
    } else{
        document.querySelector("link").href = "./styles/guide.css";
        document.getElementById("darkMode").innerHTML = "dark mode";
    }
});

plusminus = 0;

document.getElementById("minun").addEventListener("click", function(){
    if(plusminus > -0.5){
        plusminus-=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        h2s = document.getElementsByTagName("h2");
        h3s = document.getElementsByTagName("h3");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        newh2size = `${2 + plusminus}`;
        newh3ize = `${1.5 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
        for(i = 0; i < h2s.length; i++){
            h2s[i].style.fontSize = `${newh2size}em`;
        }
        for(i = 0; i < h3s.length; i++){
            h3s[i].style.fontSize = `${newh3size}em`;
        }
    }
});

document.getElementById("plusle").addEventListener("click", function(){
    if(plusminus < 0.5){
        plusminus+=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        h2s = document.getElementsByTagName("h2");
        h3s = document.getElementsByTagName("h3");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        newh2size = `${2 + plusminus}`;
        newh3ize = `${1.5 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
        for(i = 0; i < h2s.length; i++){
            h2s[i].style.fontSize = `${newh2size}em`;
        }
        for(i = 0; i < h3s.length; i++){
            h3s[i].style.fontSize = `${newh3size}em`;
        }
    }
});