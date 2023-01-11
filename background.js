function AddRule(info, tab){
    const tabId = tab.id;
    chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["./foreground_styles.css"]
    })
        .then(() => {
            console.log("INJECTED THE FOREGROUND STYLES.");

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["./foreground.js", "./xlsx.min.js"],
            })
                .then(() => {
                    console.log("INJECTED THE FOREGROUND SCRIPT.");
                });
        })
        // .catch(err => console.log(err));
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'addrule',
        title: "Add Rule for this field",
        type: 'normal',
        contexts: ['page', 'editable'],
    });
    chrome.contextMenus.create({
        id: 'fillform',
        title: "Fill",
        type: 'normal',
        contexts: ['action'],
    });
    chrome.contextMenus.create({
        id: 'buttonoption',
        title: "ButtonOption",
        type: 'normal',
        contexts: ['action'],
    });
    
    chrome.contextMenus.create({
        id: 'clearAllRule',
        title: "Clear All",
        type: 'normal',
        contexts: ['action'],
    });      
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    if(tab){
        if(info.menuItemId == 'addrule') {
            const tabId = tab.id;
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["./foreground_styles.css", "./vanillaSelectBox.css"]
            })
                .then(() => {
                    console.log("INJECTED THE FOREGROUND STYLES.");
        
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ["./foreground.js", "./xlsx.min.js", "./vanillaSelectBox.js"],
                    })
                        .then(() => {
                            console.log("INJECTED THE FOREGROUND SCRIPT.");
                        });
                })
                // .catch(err => console.log(err));
        }
        else if(info.menuItemId == 'clearAllRule'){
            chrome.storage.local.clear();
            chrome.storage.local.clear();
        }
        else if(info.menuItemId == 'fillform'){
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["./filler.js"]
            })
            .then(() => {
                console.log("Automatic fill the Form.");
                sendResponse({ message: 'success' });     
                return true;
            });
        }
        else if(info.menuItemId == 'buttonoption'){
            const tabId = tab.id;
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["./buttonoption_styles.css","./vanillaSelectBox.css"]
            })
                .then(() => {
                    console.log("INJECTED THE BUTTON OPTION STYLES.");
        
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ["./buttonoption.js", "./xlsx.min.js", "./vanillaSelectBox.js"],
                    })
                        .then(() => {
                            console.log("INJECTED THE buttonoption SCRIPT.");
                        });
                })
        }
    }
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.local.set({
        currentTab: tabId
    });
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        //   chrome.storage.local.clear();
        setTimeout(() => {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["./filler.js"]
            })
            .then(() => {
                console.log("Automatic fill the Form.");
            });
        }, 3000);

        console.log(tabId);
        console.log(tab);
        // chrome.scripting.insertCSS({
        //     target: { tabId: tabId },
        //     files: ["./foreground_styles.css"]
        // })
        //     .then(() => {
        //         console.log("INJECTED THE FOREGROUND STYLES.");

        //         chrome.scripting.executeScript({
        //             target: { tabId: tabId },
        //             files: ["./foreground.js"]
        //         })
        //             .then(() => {
        //                 console.log("INJECTED THE FOREGROUND SCRIPT.");
        //             });
        //     })
        //     .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_url') {
        // chrome.storage.local.get('name', data => {
        //     if (chrome.runtime.lastError) {
        //         sendResponse({
        //             message: 'fail'
        //         });

        //         return;
        //     }

        //     sendResponse({
        //         message: 'success',
        //         payload: data.name
        //     });
        // });
        var excelData;

        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                
            chrome.storage.local.get('excelData', data => {
                if (chrome.runtime.lastError) {
                    return;
                }
                excelData = data.excelData ? data.excelData : [];
                let url = tabs[0].url;
                let length = excelData.length;
                excelData = excelData[0];
                if(length == 0){
                    sendResponse({
                        message: 'success',
                        payload: {
                            url: url,
                            excel: null,
                        }
                    });
                }
                else
                {
                    sendResponse({
                        message: 'success',
                        payload: {
                            url: url,
                            excel: excelData.fileName,
                        }
                    });
                }
            });
            
        });
       

        return true;
    } else if (request.message === 'refresh_page') {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })
        chrome.tabs.query({ currentWindow: true, active: true }, function (data){
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }
            chrome.scripting.executeScript({
                target: { tabId: data[0].id },
                files: ["./filler.js"]
            })
            .then(() => {
                console.log("Automatic fill the Form.");
                sendResponse({ message: 'success' });     
                return true;
            });
       });

    }
});