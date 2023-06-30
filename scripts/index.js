//affiche ou non le bloc 2 si la checkbox est coche
const checkbox1 = document.querySelector("input[name=checkbox_1]");
checkbox1.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.getElementById("bloc_2").hidden = false;
    } else {
        document.getElementById("bloc_2").hidden = true;
        // on deselectionne les elements du bloc 2
        document.getElementById("check_2_1").checked = false;
        document.getElementById("check_2_2").checked = false;
        document.getElementById("check_2_3").checked = false;
    }
});

// <!------------ bloc 2    -->
const checkbox2 = document.querySelector("input[name=checkbox_2_2]"); // checkbox pour le gaz
checkbox2.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.getElementById("bloc_3").hidden = false;
    } else {
        document.getElementById("bloc_3").hidden = true;
        document.getElementById("consogaz").value = "";
    }
});

const checkbox3 = document.querySelector("input[name=checkbox_2_3]"); // checkbox pour le mazout
checkbox3.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.getElementById("bloc_4").hidden = false;
    } else {
        document.getElementById("bloc_4").hidden = true;
        document.getElementById("consomazout").value = "";
    }
});

// <!------------ bloc 10    -->
const checkbox10 = document.querySelector("input[name=personneserre]");
checkbox10.addEventListener("change", (e) => {
    if (parseFloat(checkbox10.value) > 0) {
        document.getElementById("bloc_11").hidden = false;

    } else {
        document.getElementById("bloc_11").hidden = true;
        document.getElementById("personnevoiture").value = "";
    }
    
});

checkbox10.addEventListener("input", (e) => {
    if (parseFloat(checkbox10.value) > 0) {
        document.getElementById("bloc_11").hidden = false;

    } else {
        document.getElementById("bloc_11").hidden = true;
        document.getElementById("personnevoiture").value = "";
    }
    
});

// <!------------ bloc 11    -->

const checkbox11 = document.querySelector("input[name=personnevoiture]"); // checkbox pour le gaz
checkbox11.addEventListener("change", (e) => {
    if (parseFloat(checkbox11.value) > 0) {
        document.getElementById("bloc_12").hidden = false;
        document.getElementById("bloc_13").hidden = false;
    } else {
        document.getElementById("bloc_12").hidden = true;
        document.getElementById("bloc_13").hidden = true;
        document.getElementById("distanceserre").value = "";
        document.getElementById("nombretrajet").value = "";
        document.getElementById("bloc_14").hidden = true;
    }
});

checkbox11.addEventListener("input", (e) => {
    if (parseFloat(checkbox11.value) > 0) {
        document.getElementById("bloc_12").hidden = false;
        document.getElementById("bloc_13").hidden = false;
    } else {
        document.getElementById("bloc_12").hidden = true;
        document.getElementById("bloc_13").hidden = true;
        document.getElementById("distanceserre").value = "";
        document.getElementById("nombretrajet").value = "";
        document.getElementById("bloc_14").hidden = true;
    }
});

// <!------------ Calcul chauffage (bloc 5)    -->

document.getElementById("consoelec").addEventListener('change', calculate);
document.getElementById("consoelec").addEventListener('input', calculate);
document.getElementsByName("consogaz")[0].addEventListener('change', calculate);
document.getElementsByName("consogaz")[0].addEventListener('input', calculate);
document.getElementsByName("consomazout")[0].addEventListener('change', calculate);
document.getElementsByName("consomazout")[0].addEventListener('input', calculate);

document.getElementById("check_2_1").addEventListener('change', calculate);
document.getElementById("check_2_2").addEventListener('change', calculate);
document.getElementById("check_2_3").addEventListener('change', calculate);


function calculate() {
    var conso_elec = 0;

    if (document.getElementById("consoelec").value != "") {
        document.getElementById("result").value = conso_elec = parseFloat(document.getElementById("consoelec").value);
    }

    
    document.getElementById("result").value = conso_elec * 1.5 / 1000; //ajout conso elec 

    if (document.querySelector("input[name=checkbox_2_2]").checked == true && document.getElementById("consogaz").value != "") {
        var conso_gaz = parseFloat(document.getElementById("consogaz").value) * (1.878 + 25 * 37 / 1000000 + 298 * 35 / 1000000); // ajout conso gaz
        document.getElementById("result").value = parseFloat(document.getElementById("result").value) + parseFloat(conso_gaz);
    }

    if (document.querySelector("input[name=checkbox_2_3]").checked == true && document.getElementById("consomazout").value != "") {
        var conso_mazout = parseFloat(document.getElementById("consomazout").value) * (2.725 + 25 * 18 / 100000 + 298 * 31 / 1000000) / 1000; // ajout conso mazout
        document.getElementById("result").value = parseFloat(document.getElementById("result").value) + parseFloat(conso_mazout);
    }

    let value = Math.round(document.getElementById("result").value * 100) / 100; // on supprime tout ce qui est apres la 10^-2, on n'arrondit pas !!!! 
    document.getElementById('result').innerHTML = value + ' kg';

    if (document.getElementById("result").value > 0) {
        document.getElementById("bloc_5").hidden = false;

    } else {
        document.getElementById("bloc_5").hidden = true;
    }
}

// <!------------ Calcul constitution (bloc 9)    -->
document.getElementById("superficieserre").addEventListener('change', calculate_constitution);
document.getElementById("superficieserre").addEventListener('input', calculate_constitution);
document.getElementsByName("checkbox_8")[0].addEventListener('change', calculate_constitution);
document.getElementsByName("checkbox_8")[1].addEventListener('change', calculate_constitution);
document.getElementsByName("checkbox_8")[2].addEventListener('change', calculate_constitution);


function calculate_constitution() {
    var superficie = 0;
    var materiauxserre = 0;

    if (document.getElementById("superficieserre").value != "") {
        superficie = parseFloat(document.getElementById("superficieserre").value);
    }

    if (document.getElementsByName("checkbox_8")[0].checked) {
        materiauxserre = document.getElementsByName("checkbox_8")[0].value;

    }
    else if (document.getElementsByName("checkbox_8")[1].checked) {
        materiauxserre = document.getElementsByName("checkbox_8")[1].value;

    }
    else if (document.getElementsByName("checkbox_8")[2].checked) {
        materiauxserre = document.getElementsByName("checkbox_8")[2].value;
    }

    document.getElementById("resultsuperificie").value = superficie + parseFloat(materiauxserre);

    if (parseFloat(materiauxserre) == 1) { //verre
        document.getElementById("resultsuperificie").value = superficie * 40 * 1.26;

    }
    else if (parseFloat(materiauxserre) == 2) //PVC
    {
        document.getElementById("resultsuperificie").value = superficie * 0.8 * 2.4;
    }
    else {
        document.getElementById("resultsuperificie").value = superficie * 8 * 2.4;
    }

    let value = Math.round(document.getElementById("resultsuperificie").value * 100) / 100; // on supprimme tout ce qui est apres la 10^-2, on n'arrondit pas !!!! 
    document.getElementById('resultsuperificie').innerHTML = value + ' kg';
    
    document.getElementById("bloc_9").hidden = false;
}


//<!------------ Calcul manutention (bloc 14)    -->

document.getElementById("personneserre").addEventListener('change', calculatemanutention);
document.getElementById("personneserre").addEventListener('input', calculatemanutention);
document.getElementById("personneserre").addEventListener('input', () => {

});
document.getElementById("personnevoiture").addEventListener('change', calculatemanutention);
document.getElementById("personnevoiture").addEventListener('input', calculatemanutention);
document.getElementById("distanceserre").addEventListener('change', calculatemanutention);
document.getElementById("distanceserre").addEventListener('input', calculatemanutention);
document.getElementById("nombretrajet").addEventListener('change', calculatemanutention);
document.getElementById("nombretrajet").addEventListener('input', calculatemanutention);

function calculatemanutention() {
    var personneserre = 0;
    var personnevoiture = 0;
    var distanceserre = 0;
    var nombretrajet = 0;
    if (document.getElementById("personneserre").value != "") {
        personneserre = parseFloat(document.getElementById("personneserre").value);
    }

    if (document.getElementById("personnevoiture").value != "") {
        personnevoiture = parseFloat(document.getElementById("personnevoiture").value);
    }

    if (document.getElementById("distanceserre").value != "") {
        distanceserre = parseFloat(document.getElementById("distanceserre").value);
    }

    if (document.getElementById("nombretrajet").value != "") {
        nombretrajet = parseFloat(document.getElementById("nombretrajet").value);
    }

    document.getElementById("resultmanutention").value = personnevoiture * distanceserre * nombretrajet * 12 * 0.24;
    
    let value = Math.round(document.getElementById("resultmanutention").value * 100) / 100; // on supprimme tout ce qui est apres la 10^-2, on n'arrondit pas !!!! 
    document.getElementById('resultmanutention').innerHTML = value + ' kg';
    
    if (document.getElementById("resultmanutention").value > 0) {
        document.getElementById("bloc_14").hidden = false;
    } 
    else 
    {
        document.getElementById("bloc_14").hidden = true;
    }
}