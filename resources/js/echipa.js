window.onload=function(){
    let btn=document.getElementById('filtreaza')
    btn.onclick=function(){
    let echipaReq=document.getElementById('echipa-dorita').value
    let jucatori=document.getElementsByClassName('jucator');
    var exista=''
    for(let juc of jucatori) {
        let echipe=juc.getElementsByClassName('val-foste_echipe')[0].innerHTML
        exista+=echipe
    }
    var radio=document.getElementsByName('rad')
    var taraReq=''
    for(let i=0; i<radio.length; i++) {
        if(radio[i].checked) {
            taraReq=radio[i].value
            break
        }
    }
    let pozitii=document.getElementsByName('ck')
    let pozitiiSelectate=''
    for(let ch of pozitii) {
        if(ch.checked) {
            pozitiiSelectate+=ch.value
        }
    }
    if(exista.toLowerCase().includes(echipaReq.toLowerCase())) {
        for(let juc of jucatori){
            juc.style.display='none'
            
            //getElementsbyclassnaeme returneaza ocolectie din care luamprimul element (de faptsingurul)
            let echipe=juc.getElementsByClassName('val-foste_echipe')[0].innerHTML
            let conditie1=echipe.toLowerCase().includes(echipaReq.toLowerCase()) ? true : false
            
            let tara=juc.getElementsByClassName('val-tara')[0].innerHTML
            let conditie2=tara==taraReq ? true : false
            
            let pozitie=juc.getElementsByClassName('val-pozitie')[0].innerHTML
            let conditie3=pozitiiSelectate.toLowerCase().includes(pozitie.toLowerCase()) ? true : false
            
            let conditieT=conditie1&&conditie3&&conditie2

            if(conditieT)
                juc.style.display='block'
        }
    }
    else {
        var text=document.createElement('p')
            text.innerHTML='Echipa introdusa nu exista'
            document.getElementById('mydiv').appendChild(text)
            setTimeout(function(){if(text){text.remove()}}, 2000)
    }
    btn=document.getElementById('reset')
    btn.onclick=function(){
        let jucatori=document.getElementsByClassName('jucator');
        for(let juc of jucatori)
            juc.style.display='block'
    }
    }
    function sortare(factor) {
        var jucatori=document.getElementsByClassName('jucator');
        var arrayJucatori=Array.from(jucatori)
        arrayJucatori.sort(function(j1,j2){
            let nume1=j1.getElementsByClassName('val-nume')[0].innerHTML
            let nume2=j2.getElementsByClassName('val-nume')[0].innerHTML

            let h1=j1.getElementsByClassName('val-inaltime')[0].innerHTML
            let h2=j2.getElementsByClassName('val-inaltime')[0].innerHTML
            if(h1==h2) {
                return factor*nume1.localeCompare(nume2)
            }
            return factor*h1.localeCompare(h2)
        })
        for(let juc of arrayJucatori){
            juc.parentNode.appendChild(juc);
        } 
    }
    btn=document.getElementById('sorteaza-crescator')
    btn.onclick=function() {
        sortare(1)
    }
    btn=document.getElementById('sorteaza-descrescator')
    btn.onclick=function() {
        sortare(-1)
    }
    var verif=true;
    btn=document.getElementById('calcul')
    btn.onclick=function(){
        var jucatori=document.getElementsByClassName('jucator');
        var s=0
        var c=0
        for(let juc of jucatori){
            //if(juc.style.display=='block'){
                s+=parseFloat(juc.getElementsByClassName('val-inaltime')[0].innerHTML)
                c+=1
            //}
        }
        if(verif) {
            var infoMedie=document.createElement('p')
            infoMedie.innerHTML='Media este: '+(s/c).toFixed(2)
            document.getElementById('mydiv').appendChild(infoMedie)
        }
        setTimeout(function(){if(infoMedie){infoMedie.remove()}; verif=true}, 2000)
        verif=false
    }
}