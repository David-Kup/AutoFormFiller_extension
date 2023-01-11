
if(document.getElementsByClassName('ce_main1').length != 0) {
    document.querySelector('body').removeChild(document.getElementsByClassName('ce_main1')[0]);
}


var ce_main_container;
var ce_exit;

var header, title, editOption;
header = document.createElement('DIV');
title = document.createElement('H2');
editOption = document.createElement('H2');


var excelData, filename="";
chrome.storage.local.get('excelData', data => {
    if (chrome.runtime.lastError) {
        return;
    }
    excelData = data.excelData  ? data.excelData : [];
    browse_label1.innerHTML = 'Browse Excel File';
    for(var i = 0 ; i < excelData.length; i ++){
        if(excelData[i].url == window.location.href){
            browse_label1.innerHTML = excelData[i].fileName;
            filename = excelData[i].fileName;
            break;
        }
    }
});
var form, editdiv, editlabel, editinput;
editdiv = document.createElement('DIV');
editlabel = document.createElement('label');
editinput = document.createElement('input');
editdiv.classList.add('flex_container');
editinput.type = 'text';
editinput.id = 'KindOfSong';
editinput.value = "";
editlabel.setAttribute("for", "staticText");
editlabel.innerHTML = 'KindOfSong';
editdiv.appendChild(editlabel);
editdiv.appendChild(editinput);

var editdiv1, editlabel, editinput1;
editdiv1 = document.createElement('DIV');
editlabel1 = document.createElement('label');
editinput1 = document.createElement('input');
editdiv1.classList.add('flex_container');
editinput1.type = 'text';
editinput1.id = 'SongMoods';
editinput1.value = "";
editlabel1.setAttribute("for", "staticText");
editlabel1.innerHTML = 'SongMoods';
editdiv1.appendChild(editlabel1);
editdiv1.appendChild(editinput1);

var editdiv2, editlabel2, editinput2;
editdiv2 = document.createElement('DIV');
editlabel2 = document.createElement('label');
editinput2 = document.createElement('input');
editdiv2.classList.add('flex_container');
editinput2.type = 'text';
editinput2.id = 'SongStyles';
editinput2.value = "";
editlabel2.setAttribute("for", "staticText");
editlabel2.innerHTML = 'SongStyles';
editdiv2.appendChild(editlabel2);
editdiv2.appendChild(editinput2);

form = document.createElement('FORM');
ce_exit = document.createElement('DIV');
ce_exit.innerHTML = "X";
ce_exit.id = 'exit';
ce_main_container = document.createElement('DIV');
ce_main_container.appendChild(ce_exit);
title.classList.add('myformtitle');
title.innerHTML = 'Button Filler!';
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

var browse_label1 = document.createElement('label'), browse_input1=document.createElement('input'), browse1 = document.createElement('DIV');
browse_label1.setAttribute("for", "excelFile");
browse_label1.innerHTML = excelData ? excelData :'Browse Excel File';
browse_label1.classList.add('selectExcel');
browse_input1.type = 'file';
browse_input1.id = 'excelFile';
browse_input1.accept = '.xlsx, .xls, .xlsm';
browse_input1.classList.add('invis');
browse1.classList.add('browse');
browse1.appendChild(browse_label1);
browse1.appendChild(browse_input1);



form.appendChild(border);
form.appendChild(browse1);


var fieldset = null;
if(/^https?:\/\/artists.amazon.com/.test(window.location.href)){
    form.appendChild(editdiv);
    form.appendChild(editdiv1);
    form.appendChild(editdiv2);
}
else if(/^https?:\/\/artists.spotify.com/.test(window.location.href)){
    fieldset = document.querySelectorAll('fieldset');
    for(var i = 0 ; i < fieldset.length; i ++){
        var temp_label = document.createElement('label'), temp_input = document.createElement('input'), temp_div = document.createElement('div');
        temp_label.setAttribute('for', fieldset[i].firstChild.firstChild.innerHTML);
        temp_label.innerHTML = fieldset[i].firstChild.firstChild.innerHTML;
        temp_input.type = 'text';
        temp_input.id = fieldset[i].firstChild.firstChild.innerHTML;
        temp_input.value = '';
        temp_div.classList.add('flex_container');
        temp_div.appendChild(temp_label);
        temp_div.appendChild(temp_input);
        form.appendChild(temp_div);
    }
}

var buttonfill =  document.createElement('DIV');
buttonfill.id = "btn1";
buttonfill.innerHTML = "Button Select";


var presetLabel1 = document.createElement('LABEL'), presetList = document.createElement('SELECT'), preset = document.createElement('DIV');
preset.classList.add('flex_container');
presetLabel1.setAttribute("for", "brandsOne");
presetLabel1.innerHTML = "Preset List";
preset.classList.add('flex_container');
presetList.id = 'brandsOne';
var option = document.createElement("option");
option.value = "";
option.text = "";
presetList.appendChild(option);
preset.appendChild(presetLabel1);
preset.appendChild(presetList);
form.appendChild(preset);
form.appendChild(buttonfill);
form.classList.add('block_container');
ce_main_container.classList.add('ce_main1');
ce_main_container.appendChild(header);
ce_main_container.appendChild(form);
ce_main_container.style.top = (document.documentElement.scrollTop || document.body.scrollTop) + 450 + 'px';

if(document.getElementsByClassName('ce_main1')[0]) document.querySelector('body').removeChild(document.getElementsByClassName('ce_main1')[0]);
document.querySelector('body').appendChild(ce_main_container);
var selectBox2 = null;
function initMultiOption(id) {
    selectBox2 = new vanillaSelectBox("#brandsOne", { "keepInlineStyles":true,"maxHeight": 200,"maxWidth":178,"minWidth":178, "search": true, "placeHolder": "Choose a profile..." });
}
function isSameUrl(url1, url2){
    if(/^https?:\/\/artists.amazon.com/.test(url1) && /^https?:\/\/artists.amazon.com/.test(url2)) return true;
    if(/^https?:\/\/artists.spotify.com/.test(url1) && /^https?:\/\/artists.spotify.com/.test(url2)) return true;
    return url1 == url2;
}
chrome.storage.local.get('presetList', data1 => {
    if(!data1.presetList) return false;

    chrome.storage.local.get('currentProfile', data2 => {
                    

        for (var j = 0; j < data1.presetList.length; j++) {
            var option = document.createElement("option");
            option.value = data1.presetList[j];
            option.text = data1.presetList[j];
            
            if(option.text == data2.currentProfile) option.setAttribute("selected", true);
            presetList.appendChild(option);
        }
        initMultiOption1('#brandsOne');

    })
})

var fillerArr = [];
setTimeout(()=> {
    chrome.storage.local.get('formfiller', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        fillerArr = data.formfiller ? data.formfiller : [];
        for(var i = 0 ; i < fillerArr.length; i ++){
            if(isSameUrl(fillerArr[i].site , window.location.href) && (fillerArr[i].role == 'button' || fillerArr[i].role == 'button1')){
                try {
                    
               document.getElementById(fillerArr[i].selector).value = fillerArr[i].value.replace('&amp;', '&');
                } catch (error) {
                    console.log(error);
                }
            }
        }
        
    });
}, 1000);



function getRuleType(value){
    if(value.indexOf('#') != -1) return 2;
    return 1;
}

function convertRealAnswer(value){
    if(getRuleType(value) == 1) return value;

}
buttonfill.addEventListener('click', (e) => {
    let result = "Default";
    for (var i = 0; i < presetList.length; i++) {
        if(presetList.options[i].selected) {
            result = presetList.options[i].value ? presetList.options[i].value : result;
        }
    }
    if(/^https?:\/\/artists.amazon.com/.test(window.location.href)){
        var selectedButtons = editinput.value.split(',');
        var divlist = document.querySelectorAll('.col-auto');
        for(var i = 0 ; i < divlist.length;  i ++){
            if(divlist[i].firstChild.getAttribute('id').indexOf(editlabel.innerHTML) != -1&& selectedButtons.indexOf(divlist[i].firstChild.firstChild.innerHTML) != -1){
                divlist[i].firstChild.click();
            }
        }
    
        var selectedButtons1 = editinput1.value.split(',');
        for(var i = 0 ; i < divlist.length;  i ++){
            if(divlist[i].firstChild.getAttribute('id').indexOf(editlabel1.innerHTML) != -1&& selectedButtons1.indexOf(divlist[i].firstChild.firstChild.innerHTML) != -1){
                divlist[i].firstChild.click();
            }
        }
        var songstyle = editinput2.value;
        var selectedButtons2 = songstyle.split(',');
        for(var i = 0 ; i < divlist.length;  i ++){
            if(divlist[i].firstChild.getAttribute('id').indexOf(editlabel2.innerHTML) != -1&& selectedButtons2.indexOf(divlist[i].firstChild.firstChild.innerHTML) != -1){
                divlist[i].firstChild.click();
            }
        }
        
        var filler = {selector: editlabel.innerHTML, value: editinput.value, 
            site:  window.location.href, ruleType: getRuleType(editinput.value), excelFile: filename, role : 'button', preset: result};
        for(var i = 0 ; i < fillerArr.length; i ++){
            if(isSameUrl(fillerArr[i].site , filler.site) && fillerArr[i].role == 'button' && fillerArr[i].selector == editlabel.innerHTML && fillerArr[i].preset == result){
                fillerArr.splice(i,1);
                break;
            }
        }
        fillerArr.push(filler);
       
        var filler1 = {selector: editlabel1.innerHTML, value: editinput1.value, 
            site:  window.location.href, ruleType: getRuleType(editinput1.value), excelFile: filename, role : 'button', preset: result};
        for(var i = 0 ; i < fillerArr.length; i ++){
            if(isSameUrl(fillerArr[i].site , filler.site) && fillerArr[i].role == 'button' && fillerArr[i].selector == editlabel1.innerHTML && fillerArr[i].preset == result){
                fillerArr.splice(i,1);
                break;
            }
        }
        fillerArr.push(filler1);
       
        var filler2 = {selector: editlabel2.innerHTML, value: songstyle, 
            site:  window.location.href, ruleType: getRuleType(editinput2.value), excelFile: filename, role : 'button', preset: result};
        for(var i = 0 ; i < fillerArr.length; i ++){
            if(isSameUrl(fillerArr[i].site , filler.site) && fillerArr[i].role == 'button' && fillerArr[i].selector == editlabel2.innerHTML && fillerArr[i].preset == result){
                fillerArr.splice(i,1);
                break;
            }
        }
        fillerArr.push(filler2);
    }
    else if(/^https?:\/\/artists.spotify.com/.test(window.location.href)){
        for(var i = 0 ; i < fieldset.length; i ++){
            var tempid = fieldset[i].firstChild.firstChild.innerHTML;
            var filler = {selector: tempid, value: document.getElementById(tempid).value, 
                site:  window.location.href, ruleType: getRuleType(document.getElementById(tempid).value), excelFile: filename, role : 'button1', preset: result};
            for(var j = 0 ; j < fillerArr.length; j ++){
                if(fillerArr[j].site == filler.site && fillerArr[j].role == 'button1' && fillerArr[j].selector == tempid && fillerArr[j].preset == result){
                    fillerArr.splice(j,1);
                    break;
                }
            }
            fillerArr.push(filler);
        }
    }
  
   
    chrome.storage.local.set({
        formfiller: fillerArr 
    });
    chrome.storage.local.get('formfiller', data => {
        if (chrome.runtime.lastError) {
            return;
        }
        console.log(data);
    });
    window.location.reload();
});






ce_exit.addEventListener('click', () => {
    document.querySelector('body').removeChild(ce_main_container);
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

browse_input1.addEventListener('change', function(event){
    if(this.files.length==0){
        alert("Please choose any file...");
        return;
    }
    filename = this.files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX' || extension == '.XLSM') {
        browse_label1.innerHTML = this.files[0].name;
        excelFileToJSON(this.files[0]);
        
    }else{
        alert("Please select a valid excel file.");
    }
    this.files = null;
});

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
          //reading only first sheet data
          var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
          for(var i = 0 ; i < excelData.length; i ++){
            if(excelData[i].url == window.location.href){
                excelData[i].fileName = file.name;
                excelData[i].data = workbook.Sheets[firstSheetName];
                break;
            }
          }
          if(i == excelData.length)     excelData.push({url: window.location.href, fileName: file.name, data: workbook.Sheets[firstSheetName]});
          chrome.storage.local.set({excelData: excelData});
          }
      }catch(e){
          console.error(e);
      }
  }