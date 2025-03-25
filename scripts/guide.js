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


