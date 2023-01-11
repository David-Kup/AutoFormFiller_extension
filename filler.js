var excelData;
chrome.storage.local.get('excelData', data => {
    if (chrome.runtime.lastError) {
        return;
    }
    excelData = data.excelData ? data.excelData : [];
});
var currentProfile, activeElement1;
chrome.storage.local.get('currentProfile', data => {
    if (chrome.runtime.lastError) {
        return;
    }
    currentProfile = data.currentProfile ? data.currentProfile : "Default";
});
function isSameUrl(url1, url2){
    if(/^https?:\/\/artists.amazon.com/.test(url1) && /^https?:\/\/artists.amazon.com/.test(url2)) return true;
    if(/^https?:\/\/artists.spotify.com/.test(url1) && /^https?:\/\/artists.spotify.com/.test(url2)) return true;
    return url1 == url2;
}
async function fillForm(data){
    fillerArr = data.formfiller;
    if(!fillerArr){
        console.log("no pre filler!!!");
        return;
    }
    console.log(fillerArr)


    // for(var i = 0 ; i < excelData.length; i ++){
    //     if(excelData[i].url == window.location.href){
    //         excelData = excelData[i];
    //         break;
    //     }
    // }
    excelData = excelData[0];

    for(var i = 0 ; i < fillerArr.length; i ++){
        if(isSameUrl(window.location.href, fillerArr[i].site)  )   {
            var value = "";
            console.log(currentProfile);
            if(fillerArr[i].preset != currentProfile) continue;
            if(fillerArr[i].ruleType == 0 && fillerArr[i].excelFile == excelData.fileName){
                value = excelData.data[fillerArr[i].value] ? excelData.data[fillerArr[i].value].w: '';
                if(value != excelData.data[fillerArr[i].value].v){
                    if(value.indexOf('/') != -1){
                        
                        let dateoffset = new Date(Date.UTC(1970,1,1,0,0,0)) - new Date(Date.UTC(1900,1,1,0,0,0));
                        let yourDate = new Date(excelData.data[fillerArr[i].value].v * 3600 * 24 * 1000 - dateoffset );
                        const offset = yourDate.getTimezoneOffset();
                        yourDate = new Date(yourDate.getTime() - (offset*60*1000));
                        value = yourDate.toISOString().split('T')[0];
                    }
                }
            }
            else if(fillerArr[i].ruleType == 1) value = fillerArr[i].value;
            else if(fillerArr[i].ruleType == 2){
                for(var j = 0 ; j < fillerArr[i].value.length; j ++){
                    if(fillerArr[i].value[j] == '#'){
                        var temp="";
                        while(fillerArr[i].value[++j] != '#'){
                            temp+=fillerArr[i].value[j];
                        }
                        var tempValue = (excelData.data[temp] ? excelData.data[temp].w : '');
                        console.log(temp)
                        if(tempValue.indexOf('/') != -1){
                            try {
                                let dateoffset = new Date(Date.UTC(1970,1,1,0,0,0)) - new Date(Date.UTC(1899,12,31,0,0,0));
                                let yourDate = new Date(excelData.data[temp].v * 3600 * 24 * 1000 - dateoffset );
                                const offset = yourDate.getTimezoneOffset();
                                yourDate = new Date(yourDate.getTime() - (offset*60*1000));
                                tempValue = yourDate.toISOString().split('T')[0];
                            } catch (error) {
                                console.log(error);
                            }   

                        }
                        value += tempValue;
                    }
                    else value += fillerArr[i].value[j];
                }
            }
            if(fillerArr[i].role == 'button'){
                value = value.replaceAll('&', '&amp;');
                console.log(value)
                var divlist = document.querySelectorAll('.col-auto');
                for(var j = 0 ; j < divlist.length;  j ++){
                    if(divlist[j].firstChild.getAttribute('id').indexOf(fillerArr[i].selector) != -1&& value.indexOf(divlist[j].firstChild.firstChild.innerHTML) != -1){
                        divlist[j].firstChild.click();
                    }
                }
                continue;
            }
            if(fillerArr[i].role == 'button1'){
                if(value == '') continue;
                value = value.replace('&', '&amp;');
                var divlist = document.querySelectorAll('fieldset');
                for(var j = 0 ; j < divlist.length;  j ++){
                    if(divlist[j].firstChild.firstChild.innerHTML != fillerArr[i].selector) continue;
                    console.log(fillerArr[i].selector);
                    for(var k = 0 ; k < divlist[j].childNodes[1].childElementCount; k ++){
                        var tempEle = divlist[j].childNodes[1].childNodes[k];
                        if(tempEle.tagName == 'BUTTON' || tempEle.tagName == 'button'){
                            if(tempEle.childElementCount != 0 ) {
                                tempEle.click();
                                await timeout(100);
                            }
                        }
                    }
                    for(var k = 0 ; k < divlist[j].childNodes[1].childElementCount; k ++){
                        var tempEle = divlist[j].childNodes[1].childNodes[k];
                        if(tempEle.tagName == 'BUTTON' || tempEle.tagName == 'button'){
                            if(value.indexOf(tempEle.innerHTML) != -1){
                                tempEle.click();
                                await timeout(100);
                            }
                        }
                        else{
                            if(tempEle.childNodes[1].childNodes[1].firstChild.innerHTML == value) 
                            {
                                tempEle.firstChild.click();
                            }
                        }
                    }
                }
                continue;
            }
            activeElement1 = document.querySelector(fillerArr[i].selector);
            if(!activeElement1) continue;
            if(fillerArr[i].role == 'text' || (fillerArr[i].role == 'combobox'))
            {
                var tempvalue = value;
                if(/^https?:\/\/artists.amazon.com/.test(fillerArr[i].site) && value.indexOf('**') != -1) tempvalue = '';
                if(/^https?:\/\/artists.spotify.com/.test(fillerArr[i].site) && value.indexOf('**') != -1) tempvalue = '';
                if(fillerArr[i].type == 'date'){
                    tempvalue = tempvalue.split('.').reverse().join("-");
                    
                }
                var event = new InputEvent('input', {
                    bubbles: true,
                    cancelable: false,
                    data: tempvalue
                });

                activeElement1.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement1.value = e.data;}});
                activeElement1.dispatchEvent(event);
            }
            else if(fillerArr[i].role == 'radio1'){
                   try {
                    for(var j = 0 ; j < activeElement1.parentElement.parentElement.parentElement.parentElement.childElementCount; j ++){
                        var radioValue = activeElement1.parentElement.parentElement.parentElement.parentElement.childNodes[j].firstChild;
                        if(radioValue.childNodes[1].firstChild.firstChild.innerHTML == value){
                            radioValue.firstChild.firstChild.click();
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

            }
            else if(fillerArr[i].role == 'radio'){

                let valueForOther = '';
                if(value.indexOf(':') != -1){
                    valueForOther = value.substring(6);
                    value = value.substring(0,6);
                }
                for(var j = 0 ; j < activeElement1.parentElement.parentElement.parentElement.parentElement.parentElement.childElementCount; j ++){
                    var optionValue = activeElement1.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[j].firstChild.firstChild.firstChild.firstChild;
                    if(value == optionValue.parentElement.parentElement.childNodes[1].firstChild.firstChild.innerHTML){
                        if(optionValue == activeElement1){
                            if(activeElement1.getAttribute('aria-checked') != 'true') activeElement1.childNodes[2].firstChild.click();
                            //activeElement1.childNodes[2].firstChild.click();
                        } 
                        else
                        {
                            activeElement1 = optionValue;
                            if(activeElement1.getAttribute('aria-checked') != 'true') activeElement1.childNodes[2].firstChild.click();
                        }
                        if(activeElement1.getAttribute('data-value') == '__other_option__'){
                            //if(activeElement1.getAttribute('aria-checked') != 'true') activeElement1.childNodes[2].firstChild.click();
                            activeElement1.parentElement.parentElement.parentElement.parentElement.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.value = valueForOther;
                        }
                    }
                }
                          
            }
            else if(fillerArr[i].role == 'list'){
                let valueForOther = '';
                if(value.indexOf(':') != -1){
                    for(var j = value.indexOf(':') + 1; j < value.length && value[j] != '*'; j ++){
                        valueForOther += value[j];
                    }
                    value = value.substring(0, value.indexOf(':')+1) + value.substring(j);
                }
                var tempValueList = value.split('**');
                for(var j = 0 ; j < activeElement1.childElementCount; j ++){
                    var optionValue = activeElement1.childNodes[j].firstChild.firstChild.firstChild;
                    if(j == activeElement1.childElementCount - 1) optionValue = activeElement1.childNodes[j].firstChild.firstChild.firstChild.firstChild;
                    if(tempValueList.indexOf(optionValue.getAttribute('aria-label')) != -1){
                        if(activeElement1.childNodes[j].firstChild.firstChild.firstChild.getAttribute('aria-checked') != 'true') activeElement1.childNodes[j].firstChild.firstChild.firstChild.click();
                        if(optionValue.getAttribute('data-answer-value') == '__other_option__'){
                            optionValue.parentElement.parentElement.parentElement.childNodes[1].firstChild.firstChild.firstChild.firstChild.value = valueForOther;
                        }
                    }
                }
            }

            if(/^https?:\/\/artists.amazon.com/.test(fillerArr[i].site)){
                if(value.indexOf('**') != -1){
                    var tempArr = value.split('**');
                    tempArr.shift();
                    tempArr.pop();
                    for(var k = 0 ; k < tempArr.length; k ++)
                    {
                        var event = new InputEvent('input', {
                            bubbles: true,
                            cancelable: false,
                            data: tempArr[k]
                        });
                        activeElement1.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement1.value = e.data;}});
                        activeElement1.dispatchEvent(event);
                        await timeout(3000);
                        await multipleSelection1(tempArr[k]);
                    }
                }
            }
            else if(/^https?:\/\/artists.spotify.com/.test(fillerArr[i].site)){
                if(value.indexOf('**') != -1){
                    var tempArr = value.split('**');
                    tempArr.shift();
                    tempArr.pop();
                    for(var k = 0 ; k < tempArr.length; k ++)
                    {
                        var event = new InputEvent('input', {
                            bubbles: true,
                            cancelable: false,
                            data: tempArr[k]
                        });
                        activeElement1.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement1.value = e.data;}});
                        activeElement1.dispatchEvent(event);
                        await timeout(100);
                        await multipleSelection2(tempArr[k]);
                    }
                }
                else if(activeElement1.getAttribute('role') == 'combobox' && activeElement1.getAttribute('placeholder')=='Search'){
                    // console.log("hello");
                    // console.log(document.body.lastChild);
                    // activeElement1.nextSibling.click();
                    try {
                        
                    await timeout(3000);
                    document.body.lastChild.firstChild.firstChild.firstChild.click();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
    }
 
}

async function fillForm1(data){
    fillerArr = data.formfiller;
    if(!fillerArr){
        console.log("no pre filler!!!");
        return;
    }

    // for(var i = 0 ; i < excelData.length; i ++){
    //     if(excelData[i].url == window.location.href){
    //         excelData = excelData[i];
    //         break;
    //     }
    // }


    for(var i = 0 ; i < fillerArr.length; i ++){
        if(isSameUrl(window.location.href , fillerArr[i].site))     {
            var value = "";
            if(fillerArr[i].preset != currentProfile) continue;
            if(fillerArr[i].ruleType == 0 && fillerArr[i].excelFile == excelData.fileName){
                value = excelData.data[fillerArr[i].value] ? excelData.data[fillerArr[i].value].w: '';
                if(value != excelData.data[fillerArr[i].value].v){
                    if(value.indexOf('/') != -1){
                        
                        let dateoffset = new Date(Date.UTC(1970,1,1,0,0,0)) - new Date(Date.UTC(1899,12,31,0,0,0));
                        let yourDate = new Date(excelData.data[fillerArr[i].value].v * 3600 * 24 * 1000 - dateoffset );
                        const offset = yourDate.getTimezoneOffset();
                        yourDate = new Date(yourDate.getTime() - (offset*60*1000));
                        value = yourDate.toISOString().split('T')[0];
                    }
                }
            }
            else if(fillerArr[i].ruleType == 1) value = fillerArr[i].value;
            else if(fillerArr[i].ruleType == 2){
                for(var j = 0 ; j < fillerArr[i].value.length; j ++){
                    if(fillerArr[i].value[j] == '#'){
                        var temp="";
                        while(fillerArr[i].value[++j] != '#'){
                            temp+=fillerArr[i].value[j];
                        }
                        var tempValue = (excelData.data[temp] ? excelData.data[temp].w : '');
                        value += tempValue;
                    }
                    else value += fillerArr[i].value[j];
                }
            }
            if(fillerArr[i].role == 'listbox'){
                activeElement1 = document.querySelector(fillerArr[i].selector);
                activeElement1.firstChild.click();
                await timeout(1000);
                await listSelection1(value);
            }
        }
    }
 
}
chrome.storage.local.get('formfiller', (data) => {
    if (chrome.runtime.lastError) {
        return;
    }
    fillForm(data);
    fillForm1(data);
   
});
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function multipleSelection1(value) {

    let tempList;
    if(activeElement1.getAttribute('placeholder') != 'Search artists'){
        tempList = activeElement1.parentElement.nextSibling.firstChild;
        let ttt;
        for(var j = 0 ; j < tempList.childElementCount; j ++){
            if(tempList.childNodes[j].style.display != 'none'){
                ttt = tempList.childNodes[j];
            } 
        }
        tempList = ttt.firstChild;
    }
    else tempList = activeElement1.parentElement.nextSibling.firstChild.childNodes[1].firstChild;
    for(var j = 1 ; j < tempList.childElementCount; j ++){
        var subElement = tempList.childNodes[j];
        if(value == subElement.firstChild.lastChild.firstChild.innerHTML){
            
            subElement.firstChild.lastChild.click();
        }
    }
}

function multipleSelection2(value) {

    let tempList;
    if(activeElement1.getAttribute('placeholder') == 'Search languages'){
        tempList = document.querySelectorAll('ul');
        for(var j = 0 ; j < tempList[tempList.length - 1].childElementCount; j ++){
            var subElement = tempList[tempList.length - 1].childNodes[j];
            if(subElement.firstChild.firstChild.innerHTML == value) subElement.click();
        }
    }
    else{
        tempList = activeElement1.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[2].firstChild;
        console.log(tempList);
        for(var j = 0 ; j < tempList.childElementCount; j ++){
            var subElement = tempList.childNodes[j];
            if(subElement.firstChild.innerHTML == value) subElement.click();
        }
    }
}

function listSelection1(value){

    for(var j = 0 ; j < activeElement1.childNodes[1].childElementCount; j ++){
        var optionValue = activeElement1.childNodes[1].childNodes[j].getAttribute('data-value');
        if(value == optionValue){
            activeElement1.childNodes[1].childNodes[j].click();
        }
    }
}