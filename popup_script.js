var selectBox2 = null;
function initMultiOption1(id) {
    selectBox2 = new vanillaSelectBox("#brandsOne", { "keepInlineStyles":true,"maxHeight": 200,"maxWidth":178,"minWidth":178, "search": true, "placeHolder": "Choose a profile..." });
}
function isSameUrl(url1, url2){
    if(/^https?:\/\/artists.amazon.com/.test(url1) && /^https?:\/\/artists.amazon.com/.test(url2)) return true;
    if(/^https?:\/\/artists.spotify.com/.test(url1) && /^https?:\/\/artists.spotify.com/.test(url2)) return true;
    return url1 == url2;
}
chrome.runtime.sendMessage({ 
    message: "get_url"
}, response => {
    if (response.message === 'success') {
        let fillerArr, row;
        if(!response.payload.excel) document.querySelector('.set').style.display = 'none';
        else
        {
            chrome.storage.local.get('formfiller', data => {
                if (chrome.runtime.lastError) {
                    return;
                }
                fillerArr = data.formfiller ? data.formfiller : [];
                for(var i = 0 ; i < fillerArr.length; i ++){
                    if(isSameUrl(fillerArr[i].site , response.payload.url) && (fillerArr[i].ruleType == 0 || fillerArr[i].ruleType == 2 )){
                        var temp = (fillerArr[i].value.indexOf('#') == -1) ? fillerArr[i].value : fillerArr[i].value.split('#')[1];
                        for(var j = 0 ; j < temp.length; j ++){
                            if(temp[j] >= '0' && temp[j] <= '9') break;
                        }
                        row = temp.substring(j);
                        break;
                    }
                }
                if(i == fillerArr.length){
                    document.querySelector('.set').style.display = 'none';
                }
                else{
                    document.querySelector('.unset').style.display = 'none';
                    document.querySelector('#url').value = `${response.payload.url}`;
                    document.querySelector('#excel').value = `${response.payload.excel}`;
                    document.getElementById('curRow').value = row;
                }
                
            });
        }
        chrome.storage.local.get('formfiller', data => {
            if (chrome.runtime.lastError) {
                return;
            }
            let fillerArr = data.formfiller ? data.formfiller : [], profileList = [];
            console.log(response.payload.url);
            for(var i = 0 ; i < fillerArr.length; i ++){
                if(!profileList.includes(fillerArr[i].preset)) profileList.push(fillerArr[i].preset);
            }
            if(profileList.length == 0){
                document.querySelector('.set1').style.display = 'none';
            }
            else{
                chrome.storage.local.get('currentProfile', data2 => {
                    
                    for (var j = 0; j < profileList.length; j++) {
                        var option = document.createElement("option");
                        option.value = profileList[j];
                        option.text = profileList[j];
                        if(option.text == data2.currentProfile) option.setAttribute("selected", true);
                        document.getElementById('brandsOne').appendChild(option);
                    }
                    console.log(data2.currentProfile);
                    
                    initMultiOption1('#brandsOne');
    
                })
                
                document.querySelector('.unset1').style.display = 'none';

            }
            
        });

    }
    else{
        // document.querySelector('.unset1').style.display = 'none';
        document.querySelector('.set1').style.display = 'none';
        // document.querySelector('.unset').style.display = 'none';
        document.querySelector('.set').style.display = 'none';
    }
});

document.getElementById("useprofile").addEventListener('click', function(e){
    console.log(document.getElementById('brandsOne').value);
    chrome.storage.local.set({
        currentProfile: document.getElementById('brandsOne').value
    })
    chrome.runtime.sendMessage({ 
        message: "refresh_page"
    });
});

document.getElementById("prev").addEventListener('click', function(e){
    let curRow = document.getElementById('curRow');
    let value = curRow.value;
    value --;
    curRow.value = value;
});

document.getElementById("next").addEventListener('click', function(e){
    let curRow = document.getElementById('curRow');
    let value = curRow.value;
    value ++;
    curRow.value = value;
});

document.getElementById("fill").addEventListener('click', function(e){
    chrome.storage.local.get('formfiller', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        let fillerArr = data.formfiller ? data.formfiller : [];
        for(var i = 0 ; i < fillerArr.length; i ++){
            if(fillerArr[i].ruleType == 0){
                for(var j = 0 ; j < fillerArr[i].value.length; j ++){
                    if(fillerArr[i].value[j] >= '0' && fillerArr[i].value[j] <= '9') break;
                }
                fillerArr[i].value = fillerArr[i].value.substring(0, j) + document.getElementById('curRow').value;
            }
            if(fillerArr[i].ruleType == 2){
                var tempArr = fillerArr[i].value.split('#'), value = '';
                for(var k = 0; k < tempArr.length; k ++){
                    if(k % 2 == 1) {
                        for(var j = 0 ; j < tempArr[k].length; j ++){
                            if(tempArr[k][j] >= '0' && tempArr[k][j] <= '9') break;
                        }
                        tempArr[k] = tempArr[k].substring(0, j) + document.getElementById('curRow').value;

                    }
                    value += tempArr[k];
                    value += '#';
                }
                value = value.slice(0, -1);
                fillerArr[i].value = value;
            }
        }
        chrome.storage.local.set({
            formfiller: fillerArr
        });
        chrome.runtime.sendMessage({ 
            message: "refresh_page"
        }, response => {
            if(response.message == 'success'){
                console.log('success');
            }
        });

    });
});
