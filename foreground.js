
if(document.getElementsByClassName('ce_main').length != 0) {
    document.querySelector('body').removeChild(document.getElementsByClassName('ce_main')[0]);
}

var activeElement = document.activeElement;

var ce_main_container;
var ce_exit;

var header, title, editOption;
header = document.createElement('DIV');
title = document.createElement('H2');
editOption = document.createElement('H2');
var preList = [];
var fillerArr = [];
var excelData;
var arrayList;
var filename;
chrome.storage.local.get('excelData', data => {
    if (chrome.runtime.lastError) {
        return;
    }
    excelData = data.excelData  ? data.excelData : [];
    browse_label.innerHTML = 'Browse Excel File';
    // for(var i = 0 ; i < excelData.length; i ++){
    //     if(excelData[i].url == window.location.href){
            browse_label.innerHTML = excelData[0].fileName;
            filename = excelData[0].fileName;
    //         break;
    //     }
    // }
});

function isSameUrl(url1, url2){
    if(/^https?:\/\/artists.amazon.com/.test(url1) && /^https?:\/\/artists.amazon.com/.test(url2)) return true;
    if(/^https?:\/\/artists.spotify.com/.test(url1) && /^https?:\/\/artists.spotify.com/.test(url2)) return true;
    return url1 == url2;
}
var bodyRect = document.body.getBoundingClientRect();

var selector = "";

getSelector();



console.log(selector);
var form, browse, browse_label, browse_input, answerOption, static_label, static_check, dynamic_label, dynamic_check, staticAnswer, staticAns_label, staticAns_input, 
    dynamicAnswer, column, column_label, column_input, row, row_label, row_input, fill_btn, answerDiv, modify_label1, modify_label2, modify_check, modify,
     staticAnswerPreset, presetList, presetLabel, staticAnswerSet, presetBtn, presetResultLabel;

function getSelector(){
    selector = activeElement.tagName ;
    selector = selector + (activeElement.getAttribute('name') ? ('[name="' + activeElement.getAttribute('name') + '"]') : '');
    selector = selector + (activeElement.getAttribute('id') && !/^react-aria/.test(activeElement.getAttribute('id')) ? ('[id="' + activeElement.getAttribute('id') + '"]') : '');
    selector = selector + (activeElement.getAttribute('title') ? ('[title="' + activeElement.getAttribute('title') + '"]') : '');
    selector = selector + (activeElement.getAttribute('placeholder') ? ('[placeholder="' + activeElement.getAttribute('placeholder') + '"]') : '');
    selector = selector + (activeElement.getAttribute('aria-label') ? ('[aria-label="' + activeElement.getAttribute('aria-label') + '"]') : '');
    selector = selector + (activeElement.getAttribute('aria-labelledby') && !/^react-aria/.test(activeElement.getAttribute('aria-labelledby')) ? ('[aria-labelledby="' + activeElement.getAttribute('aria-labelledby') + '"]') : '');
    selector = selector + (activeElement.getAttribute('aria-describedby') ? ('[aria-describedby="' + activeElement.getAttribute('aria-describedby') + '"]') : '');
    selector = selector + (activeElement.getAttribute('data-bind') ? ('[data-bind="' + activeElement.getAttribute('data-bind') + '"]') : '');
    selector = selector + (activeElement.getAttribute('data-reactid') ? ('[data-reactid="' + activeElement.getAttribute('data-reactid') + '"]') : '');
    selector = selector + (activeElement.getAttribute('ng-model') ? ('[ng-model="' + activeElement.getAttribute('ng-model') + '"]') : '');
    selector = selector + (activeElement.getAttribute('class') && activeElement.getAttribute('role') == 'null' ? ('[class="' + activeElement.getAttribute('class') + '"]') : '');
    selector = selector + (activeElement.getAttribute('src') ? ('[src="' + activeElement.getAttribute('src') + '"]') : '');
    selector = selector + (activeElement.getAttribute('data-value') ? ('[data-value="' + activeElement.getAttribute('data-value') + '"]') : '');
    selector = selector + (activeElement.getAttribute('jsname') ? ('[jsname="' + activeElement.getAttribute('jsname') + '"]') : '');
    selector = selector + (activeElement.hasAttribute('required') ? ('[required]') : '');                                                         
}

form = document.createElement('FORM');
browse = document.createElement('DIV');
browse_label = document.createElement('LABEL');
browse_input = document.createElement('input');
answerOption = document.createElement('DIV');
static_label = document.createElement('LABEL');
static_check = document.createElement('input');
dynamic_label = document.createElement('LABEL');
dynamic_check = document.createElement('input');
staticAnswerPreset = document.createElement('DIV');
presetLabel = document.createElement('LABEL');
presetList = document.createElement('select');
staticAnswerSet = document.createElement('DIV');
staticAns_label = document.createElement('LABEL');
staticAns_input = document.createElement('input');
staticAnswer = document.createElement('DIV');
dynamicAnswer = document.createElement('DIV');
presetBtn = document.createElement('INPUT');
column = document.createElement('DIV');
column_label = document.createElement('LABEL');
column_input = document.createElement('input');
row = document.createElement('DIV');
row_label = document.createElement('LABEL');
row_input = document.createElement('input');
fill_btn = document.createElement('DIV');
answerDiv = document.createElement('DIV');
modify_label1 = document.createElement('p');
modify_label2 = document.createElement('LABEL');
modify_check = document.createElement('input');
modify = document.createElement('DIV');
presetResultLabel = document.createElement('p');
deletepresetBtn = document.createElement('input');
ce_exit = document.createElement('DIV');
ce_exit.innerHTML = "X";
ce_exit.id = 'exit';
ce_main_container = document.createElement('DIV');
ce_main_container.appendChild(ce_exit);
title.classList.add('myformtitle');
title.innerHTML = 'Form Filler!';
editOption.id = "edit";
editOption.innerHTML = 'clear';
editOption.style.fontSize = "15px";
editOption.style.marginTop = "15px";
editOption.style.textDecoration = 'underline';
header.appendChild(title);
header.appendChild(editOption);

header.classList.add('flex_container');
var border = document.createElement('DIV');
border.style.height = '3px';
border.style.backgroundColor = 'grey';
border.style.marginTop = '-5px';
border.style.marginBottom = '8px';
form.append(border);
browse_label.setAttribute("for", "excelFile");
browse_label.innerHTML = excelData ? excelData :'Browse Excel File';
browse_label.classList.add('selectExcel');
browse_input.type = 'file';
browse_input.id = 'excelFile';
browse_input.accept = '.xlsx, .xls, .xlsm';
browse_input.classList.add('invis');
browse.classList.add('browse');
browse.appendChild(browse_label);
browse.appendChild(browse_input);
form.appendChild(browse);

modify_label1.innerHTML = 'Already Added Rule!'
modify_label1.classList.add('addedRule');
modify_label2.classList.add('modifycheck');
modify_label2.innerHTML = 'If you want to change the rule, click this checkbox.';
modify_label2.setAttribute('for', 'editable');
modify_check.type = 'checkbox';
modify_check.id = "editable";
modify.appendChild(modify_label1);
modify.appendChild(modify_label2);

modify.appendChild(modify_check);
modify.style.visibility = "hidden";
form.appendChild(modify);

static_label.setAttribute("for", "static");
static_label.innerHTML = 'Static Answer';
dynamic_label.setAttribute("for", "dynamic");
dynamic_label.innerHTML = 'Dynamic Answer';
static_check.type = 'checkbox';
static_check.id = "static";
static_check.name = "method1";
dynamic_check.type = 'checkbox';
dynamic_check.id = "dynamic";
dynamic_check.name = "method2";

answerOption.appendChild(static_check);
answerOption.appendChild(static_label);
answerOption.appendChild(dynamic_check);
answerOption.appendChild(dynamic_label);
answerOption.classList.add('flex_container');

staticAnswerSet.classList.add('flex_container');
staticAns_input.type = 'text';
staticAns_input.id = 'staticText';
staticAns_input.value = staticAns_input.value ? staticAns_input.value :(activeElement.getAttribute('role')  == 'radio' ||  activeElement.getAttribute('role')  == 'option'? activeElement.getAttribute('data-value') :activeElement.getAttribute('role')  == 'checkbox' ? activeElement.getAttribute('aria-label') : activeElement.value);
if(activeElement.getAttribute('role') == 'radio'){
    staticAns_input.value = activeElement.parentElement.parentElement.childNodes[1].firstChild.firstChild.innerHTML;
}
staticAns_label.setAttribute("for", "staticText");
staticAns_label.innerHTML = 'Answer';
staticAnswerSet.appendChild(staticAns_label);
staticAnswerSet.appendChild(staticAns_input);

staticAnswerPreset.classList.add('flex_container');
presetList.id = 'brandsOne';
var option = document.createElement("option");
option.value = "";
option.text = "";
presetList.appendChild(option);
// presetList.setAttribute('multiple', true);
// presetList.setAttribute('size', "3");

presetLabel.setAttribute("for", "addPreset");
presetLabel.innerHTML = 'Add Preset';
presetBtn.type ='button'
presetBtn.id = 'presetBtn';
presetBtn.value = 'ADD';
var presetAddInput = document.createElement('INPUT');
presetAddInput.type = 'text';
presetAddInput.id = 'addPreset';

var presetLabel1 = document.createElement('LABEL');
presetLabel1.setAttribute("for", "brandsOne");
presetLabel1.innerHTML = "Preset List";

staticAnswerPreset.appendChild(presetLabel1);
staticAnswerPreset.appendChild(presetList);
// staticAnswerPreset.appendChild(presetList);
var presetListDiv = document.createElement('DIV');
presetListDiv.classList.add('flex_container');
presetListDiv.appendChild(presetLabel);
presetListDiv.appendChild(presetAddInput);
presetListDiv.appendChild(presetBtn);


// staticAnswerPreset.appendChild(presetBtn);

staticAnswer.classList.add('block_container');
staticAnswer.classList.add('displayNone');
staticAnswer.id = "staticSetting";
presetResultLabel.innerHTML = ''
presetResultLabel.classList.add('addedRule');
staticAnswer.appendChild(staticAnswerSet);
staticAnswer.appendChild(staticAnswerPreset);
staticAnswer.appendChild(presetListDiv);
staticAnswer.appendChild(presetResultLabel);

column.classList.add('flex_container');
column_input.type = 'text';
column_input.id = 'column';
column_input.classList.add("centerText");
column_label.setAttribute("for", "column");
column_label.innerHTML = 'ColumnLetter';
column.appendChild(column_label);
column.appendChild(column_input);

row.classList.add('flex_container');
row_input.type = 'text';
row_input.id = 'row';
row_input.classList.add("centerText");
row_label.setAttribute("for", "row");
row_label.innerHTML = 'RowNumber';
row.appendChild(row_label);
row.appendChild(row_input);

dynamicAnswer.classList.add('block_container');
dynamicAnswer.classList.add('displayNone');
dynamicAnswer.id = "dynamicSetting";
dynamicAnswer.appendChild(column);
dynamicAnswer.appendChild(row);
fill_btn.id = "btn";
fill_btn.innerHTML = "SAVE";
answerDiv.classList.add("answerDiv");
answerDiv.appendChild(staticAnswer);
answerDiv.appendChild(dynamicAnswer);

form.appendChild(answerOption);
form.appendChild(answerDiv);
form.appendChild(fill_btn);
form.classList.add('block_container');
ce_main_container.classList.add('ce_main');
ce_main_container.appendChild(header);
ce_main_container.appendChild(form);
ce_main_container.style.top = (activeElement.getBoundingClientRect().top - bodyRect.top + 250) + 'px';

if(activeElement.tagName!= 'BODY'){
    ;    if(document.getElementsByClassName('ce_main')[0]) document.querySelector('body').removeChild(document.getElementsByClassName('ce_main')[0]);
        document.querySelector('body').appendChild(ce_main_container);
    }
    
    var selectBox2 = null;
function initMultiOption(id) {
    selectBox2 = new vanillaSelectBox("#brandsOne", {"disableSelectAll": true, "maxHeight": 200,"itemsSeparator":", ", "search": true ,"translations": { "all": "All", "items": "items","selectAll":"Check All","clearAll":"Clear All"}});
}

if(activeElement.getAttribute('role') == 'option'){
    activeElement = activeElement.parentElement.parentElement.parentElement;
    getSelector();
}
if(activeElement.getAttribute('role') == 'checkbox'){
    if(activeElement.getAttribute('data-answer-value') == '__other_option__') activeElement = activeElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    else    activeElement = activeElement.parentElement.parentElement.parentElement.parentElement;
    getSelector();
}
console.log(selector);
chrome.storage.local.get('presetList', data1 => {
    if(!data1.presetList) return false;
    for (var j = 0; j < data1.presetList.length; j++) {
        var option = document.createElement("option");
        option.value = data1.presetList[j];
        option.text = data1.presetList[j];
        presetList.appendChild(option);
    }
    preList = data1.presetList;
    
    initMultiOption("brandsOne");
})

// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '30.0s';
// document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(3600deg)';

function isSameField(selector1, selector2, role){
    if(role == 'option'){
        return (document.querySelector(selector1).parentElement == document.querySelector(selector2).parentElement);
    }
    else if(role == 'radio') {
        return (document.querySelector(selector1).parentElement.parentElement.parentElement.parentElement.parentElement == document.querySelector(selector2).parentElement.parentElement.parentElement.parentElement.parentElement);
    }
    else{
        return selector1 == selector2;
    }
}



chrome.storage.local.get('formfiller', data => {
    if (chrome.runtime.lastError) {
        return;
    }
    fillerArr = data.formfiller ? data.formfiller : [];
    for(var i = 0 ; i < fillerArr.length; i ++){
        if(isSameUrl(fillerArr[i].site , window.location.href) && isSameField(fillerArr[i].selector, selector, fillerArr[i].role)){
            modify.style.visibility = 'visible';
            if(fillerArr[i].ruleType == 0){
                dynamic_check.checked = true;

                for(var j = 0 ; j < fillerArr[i].value.length; j ++){
                    if(fillerArr[i].value[j] >= '0' && fillerArr[i].value[j] <= '9') break;
                }
                column_input.value = fillerArr[i].value.substring(0, j);
                row_input.value = fillerArr[i].value.substring(j);

            }
            else if(fillerArr[i].ruleType == 1) {
                static_check.checked = true;
                staticAns_input.value = fillerArr[i].value;
            }
            else if(fillerArr[i].ruleType == 2) {
                static_check.checked = true;
                dynamic_check.checked = true;
                staticAns_input.value = fillerArr[i].value;
            }
            for(var j = 0 ; j < presetList.length; j ++){
                if(fillerArr[i].preset == presetList.options[j].value){
                    presetList.options[j].setAttribute("selected", true);
                }
            }
            initMultiOption("brandsOne");
            staticChecked = static_check.checked;
            dynamicChecked = dynamic_check.checked;
            static_check.disabled = true;
            dynamic_check.disabled = true;
            break;
        }
    }
    if(i == fillerArr.length){
        modify_label1.style.visibility = 'hidden';
        modify_label2.style.visibility = 'hidden';
        modify_check.style.visibility = 'hidden';
    }
    
});



// chrome.runtime.sendMessage({ 
//     message: "get_name"
// }, response => {
//     if (response.message === 'success') {
//         ce_name.innerHTML = `Hello ${response.payload}`;
//     }
// });

// ce_button.addEventListener('click', () => {
//     chrome.runtime.sendMessage({ 
//         message: "change_name",
//         payload: ce_input.value
//     }, response => {
//         if (response.message === 'success') {
//             ce_name.innerHTML = `Hello ${ce_input.value}`;
//         }
//     });
// });

function excelFileToJSON(file){
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function(e) {
  
          var data = e.target.result;
          var workbook = XLSX.read(data, {
              type : 'binary'
          });
          var result = {};
          var firstSheetName = workbook.SheetNames[0];
          console.log(workbook.Sheets[firstSheetName])
          //reading only first sheet data
        //   for(var i = 0 ; i < excelData.length; i ++){
        //     if(excelData[i].url == window.location.href){
        //         excelData[i].fileName = file.name;
        //         excelData[i].data = workbook.Sheets[firstSheetName];

        //         break;
        //     }
        //   }
          excelData = [];
          excelData.push({url: window.location.href, fileName: file.name, data: workbook.Sheets[firstSheetName]});
          console.log(excelData);
          chrome.storage.local.set({excelData: excelData});
          chrome.storage.local.get('excelData', data => {
            console.log(data.excelData);
          })
          }
      }catch(e){
          console.error(e);
      }
  }

ce_exit.addEventListener('click', () => {
    document.querySelector('body').removeChild(ce_main_container);
});
var staticChecked=false, dynamicChecked=false;
static_check.addEventListener('change', function(event){
    staticChecked = event.target.checked;
    if(staticChecked) {
        document.getElementById('staticSetting').style.display = "block";
        if(dynamicChecked) document.getElementById('dynamicSetting').style.display = "none";
    }
    else{
        document.getElementById('staticSetting').style.display = "none";
        if(dynamicChecked) document.getElementById('dynamicSetting').style.display = "block";
    } 

  });
dynamic_check.addEventListener('change', function(event){
    dynamicChecked = event.target.checked;
    if(dynamicChecked && !staticChecked) document.getElementById('dynamicSetting').style.display = "block";
    else document.getElementById('dynamicSetting').style.display = "none";
 });

browse_input.addEventListener('change', function(event){
    if(this.files.length==0){
        alert("Please choose any file...");
        return;
    }
    filename = this.files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX' || extension == '.XLSM') {
        browse_label.innerHTML = this.files[0].name;
        excelFileToJSON(this.files[0]);
        
    }else{
        alert("Please select a valid excel file.");
    }
    this.files = null;
});

staticAns_input.addEventListener('input', function(event){
    var event = new InputEvent('input', {
        bubbles: true,
        cancelable: false,
        data: event.target.value
    });
    activeElement.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement.value = e.data;}});
    activeElement.dispatchEvent(event);
});

column_input.addEventListener('input', function(event){
    this.value = this.value.toUpperCase();
})
fill_btn.addEventListener('click', function(event){
    if(!filename && dynamicChecked){
        alert("Please select excel file!!!");
        return;
    }
    if(!staticChecked && !dynamicChecked) return;
    if(staticChecked && !staticAns_input.value) return;
    var ruleType = staticChecked ? (dynamicChecked ? 2 : 1) : 0;
    var colRow = column_input.value+row_input.value;
    if(ruleType == 0){
        chrome.storage.local.set({
            currentRow: row_input.value
        })
    }

    
    if(activeElement.getAttribute('role') == 'radio'){
       
        for(var i = 0 ; i < activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.childElementCount; i ++){
            var optionValue = activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[i].firstChild.firstChild.firstChild.firstChild;
            if(staticAns_input.value == optionValue.getAttribute('data-value')){
                if(optionValue == activeElement){
                    activeElement.childNodes[2].firstChild.click();
                    activeElement.childNodes[2].firstChild.click();
                } 
                else
                {
                    optionValue.childNodes[2].firstChild.click();
                    activeElement = optionValue;
                }
            }

        }
    }

    let result = "Default";
    for (var i = 0; i < presetList.length; i++) {
        if(presetList.options[i].selected) {
            result = presetList.options[i].value ? presetList.options[i].value : result;
        }
    }
    var filler = {selector: selector, value: ruleType ? staticAns_input.value : colRow, type:activeElement.type, 
                    site:  window.location.href, ruleType: ruleType, excelFile: filename, role : activeElement.getAttribute('role') ? activeElement.getAttribute('role') : 'text', preset: result};
    if(activeElement.tagName == 'BUTTON' && filler.role == 'text'){
        filler.role = 'radio1';
    }
    for(var i = 0 ; i < fillerArr.length; i ++){
        if(isSameUrl(fillerArr[i].site , filler.site) && isSameField(fillerArr[i].selector, filler.selector, filler.role) && fillerArr[i].preset == result ){
            fillerArr.splice(i,1);
            break;
        }
    }
    fillerArr.push(filler);
    chrome.storage.local.set({
        formfiller: fillerArr 
    });
    var curExcelData=excelData[0];
    // for(var i = 0 ; i < excelData.length; i ++){
    //     if(excelData[i].url == window.location.href){
    //         curExcelData = excelData[i];
    //         break;
    //     }
    // }
    for(var i = 0 ; i < fillerArr.length; i ++){
        if(isSameUrl(window.location.href , fillerArr[i].site))     {
            var value;
            if(fillerArr[i].selector != selector) continue;
            if(fillerArr[i].ruleType == 0 && fillerArr[i].excelFile == curExcelData.fileName){
                value = curExcelData.data[fillerArr[i].value].w;
                console.log(curExcelData.data[fillerArr[i].value]);
                if(value != curExcelData.data[fillerArr[i].value].v){
                    if(value.indexOf('/') != -1 || value.indexOf('.') != -1){
                        console.log(value);
                        let dateNum = curExcelData.data[fillerArr[i].value].v
                        let dateoffset = new Date(Date.UTC(1970,1,1,0,0,0)) - new Date(Date.UTC(1899,12,31,0,0,0));
                        let yourDate = new Date(dateNum* 3600 * 24 * 1000 - dateoffset );
                        const offset = yourDate.getTimezoneOffset();
                        yourDate = new Date(yourDate.getTime() - (offset*60*1000));
                        value = yourDate.toISOString().split('T')[0];
                    }
                }
            }
            else if(fillerArr[i].ruleType == 1) value = fillerArr[i].value;
            else if(fillerArr[i].ruleType == 2){
                var value1 = "";
                for(var j = 0 ; j < fillerArr[i].value.length; j ++){
                    if(fillerArr[i].value[j] == '#'){
                        var temp="";
                        while(fillerArr[i].value[++j] != '#'){
                            temp+=fillerArr[i].value[j];
                        }
                         console.log(curExcelData);
                        // console.log(curExcelData.data[temp]);
                        
                        value1 += curExcelData.data[temp].w;
                    }
                    else value1 += fillerArr[i].value[j];
                }
                value = value1;
            }

            if(fillerArr[i].role == 'text')
            {
                var event = new InputEvent('input', {
                    bubbles: true,
                    cancelable: false,
                    data: value
                });
                activeElement.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement.value = e.data;}});
                activeElement.dispatchEvent(event);
            }
            else if(fillerArr[i].role == 'radio'){
                let valueForOther = '';
                if(activeElement.getAttribute('data-value') == '__other_option__'){
                    valueForOther = value.substring(6);
                    value = activeElement.parentElement.parentElement.childNodes[1].firstChild.firstChild.innerHTML;
                    console.log(valueForOther);

                }
                for(var j = 0 ; j < activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.childElementCount; j ++){
                    var optionValue = activeElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[j].firstChild.firstChild.firstChild.firstChild;
                    
                    if(value == optionValue.parentElement.parentElement.childNodes[1].firstChild.firstChild.innerHTML){
                        if(optionValue == activeElement){
                            activeElement.childNodes[2].firstChild.click();
                            activeElement.childNodes[2].firstChild.click();
                        } 
                        else
                        {
                            optionValue.childNodes[2].firstChild.click();
                            activeElement = optionValue;
                        }
                        if(activeElement.getAttribute('data-value') == '__other_option__'){
                            activeElement.parentElement.parentElement.parentElement.parentElement.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.value = valueForOther;
                        }
                    }
                }
            }
            else if(fillerArr[i].role == 'radio1'){
                for(var j = 0 ; j < activeElement.parentElement.parentElement.parentElement.parentElement.childElementCount; j ++){
                    var radioValue = activeElement.parentElement.parentElement.parentElement.parentElement.childNodes[j].firstChild;
                    if(radioValue.childNodes[1].firstChild.firstChild.innerHTML == fillerArr[i].value){
                        radioValue.firstChild.firstChild.click();
                    }
                }
            }


            // else if(/^https?:\/\/artists.amazon.com/.test(fillerArr[i].url)){
            //     if(value.indexOf('**') != -1){
            //         var tempArr = value.split('**');
            //         tempArr.shift();
            //         tempArr.pop();
            //         for(var k = 0 ; k < tempArr.length; k ++)
            //         {
            //             var event = new InputEvent('input', {
            //                 bubbles: true,
            //                 cancelable: false,
            //                 data: tempArr[k]
            //             });
            //             activeElement.addEventListener("input", (e)=>{if(!e.isTrusted) {activeElement.value = e.data;}});
            //             activeElement.dispatchEvent(event);
            //             //multipleSelection(value);
            //         }
            //     }
            // }
        }
    }
    modify_label1.style.visibility = 'visible';
    modify_label2.style.visibility = 'visible';
    modify_check.style.visibility = 'visible';
    modify_check.checked = true;
    console.log("success");
    chrome.storage.local.get('formfiller', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        console.log(data);
    });
    chrome.storage.local.get('excelData', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        console.log(data);
    });
    window.location.reload();
});

// const multipleSelection = async (value) =>{
//     await setTimeout(() => {}, 1000);
//     for(var j = 1 ; j < activeElement.parentElement.parentElement.nextSibling.firstChild.firstChild.firstChild.childElementCount; j ++){
//         var subElement = activeElement.parentElement.parentElement.nextSibling.firstChild.firstChild.firstChild.childNodes[j];
//         if(value.indexOf(subElement.firstChild.firstChild.firstChild.childNodes[j].innerHTML) != -1){
//             subElement.click();
//         }
//     }
// }
editOption.addEventListener('click', function(event){
    for(var i = 0 ; i < fillerArr.length; i ++){
        if(fillerArr[i].selector == selector && isSameUrl(fillerArr[i].site , window.location.href)){
            fillerArr.splice(i,1);
            break;
        }
    }
    chrome.storage.local.set({
        formfiller: fillerArr 
    });
    modify_label1.style.visibility = 'hidden';
    modify_label2.style.visibility = 'hidden';
    modify_check.style.visibility = 'hidden';
    static_check.disabled = false;
    dynamic_check.disabled = false;
    static_check.checked = false;
    dynamic_check.checked = false;
    document.getElementById('staticSetting').style.display = "none";
    document.getElementById('dynamicSetting').style.display = "none";
    console.log("clear");
    chrome.storage.local.get('formfiller', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        console.log(data);
    });
});

modify_check.addEventListener('change', function(event){
    if(event.target.checked){
        static_check.disabled = false;
        dynamic_check.disabled = false;
        answerDiv.style.visibility = 'visible';
        
    }
    else{
        static_check.disabled = true;
        dynamic_check.disabled = true;
        answerDiv.style.visibility = 'hidden';
    }
    staticChecked = static_check.checked;
    dynamicChecked = dynamic_check.checked;
    if(staticChecked) {
        document.getElementById('staticSetting').style.display = "block";
        if(dynamicChecked) document.getElementById('dynamicSetting').style.display = "none";
    }
    else{
        document.getElementById('staticSetting').style.display = "none";
        if(dynamicChecked) document.getElementById('dynamicSetting').style.display = "block";
    }
    if(dynamicChecked && !staticChecked) document.getElementById('dynamicSetting').style.display = "block";
    else document.getElementById('dynamicSetting').style.display = "none";
});


presetBtn.addEventListener('click', function(event){
    if(presetBtn.value == 'DEL'){

        for (var i = 0; i < presetList.length; i++) {
            if(presetList.options[i].selected == true) {
                preList.splice(i-1, 1);
                for(var j = 0 ; j < fillerArr.length; j ++){
                    if(fillerArr[j].preset == presetList.options[i].value && fillerArr[j].site == window.location.href){
                        fillerArr.splice(j,1);
                        j --;
                    }
                }
                presetList.removeChild(presetList.options[i]);
                break;
            }
        }
        presetBtn.value = 'ADD';
        chrome.storage.local.set({
            formfiller: fillerArr 
        });
    }
    else{
        var option = document.createElement("option");
        option.value = presetAddInput.value;
        option.text = presetAddInput.value;
        if(option.text == '') return;
        for (var i = 0; i < presetList.length; i++) {
            if(presetList.options[i].value == presetAddInput.value) {
                presetResultLabel.innerHTML = 'Already Added Preset!';
                presetResultLabel.style.color = 'red';
                return;
            }
        }
        
        preList.push(presetAddInput.value);
        presetResultLabel.innerHTML = 'Success!';
        presetResultLabel.style.color = 'green';
        presetList.appendChild(option);
    }
    
    initMultiOption("brandsOne");
    presetAddInput.value = '';
    chrome.storage.local.set({
        presetList: preList
    });

    chrome.storage.local.get('presetList', data=> {
        console.log(data.presetList);
    })
});

presetAddInput.addEventListener('input', function(e){
    if(e.target.value) presetBtn.value = 'ADD';
    // staticAns_input.value = e.target.value;
});
presetList.addEventListener('change', function(e){
    if(e.value != '') presetBtn.value = 'DEL';
    for (var i = 0; i < presetList.length; i++) {
        if(presetList.options[i].selected == true) {
            for(var j = 0 ; j < fillerArr.length; j ++){
                if(selector == fillerArr[j].selector && fillerArr[j].preset == presetList.options[i].value && fillerArr[j].site == window.location.href && (fillerArr[j].ruleType == 1 || fillerArr[j].ruleType == 2)){
                    staticAns_input.value = fillerArr[j].value;
                }
            }
            break;
        }
    }
    // staticAns_input.value = e.target.value;
});

var mousePosition;
var offset = [0,0];
var isDown = false;


ce_main_container.addEventListener('mousedown', function(e) {
    if(e.clientY - ce_main_container.getBoundingClientRect().top > 77) return;
    isDown = true;
    offset = [
        ce_main_container.offsetLeft - e.clientX,
        ce_main_container.offsetTop - e.clientY
    ];
});

ce_main_container.addEventListener('mouseup', function() {
    isDown = false;
});

ce_main_container.addEventListener('mousemove', function(event) {
    if (isDown) {
        event.preventDefault();

        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        ce_main_container.style.left = (mousePosition.x + offset[0]) + 'px';
        ce_main_container.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
});