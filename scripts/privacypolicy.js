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