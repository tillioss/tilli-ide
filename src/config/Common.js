import MyConstant from './MyConstant';


export function doGetConnect(subUrl) {
    return fetch(MyConstant.keyList.apiURL + subUrl, {
        method: "GET",
        mode: 'cors',
        redirect: 'follow',
    }).then(
        function (response) {
            return response.json();
        }
    ).then(function (dataresponse) {
        return dataresponse;
    });
}


export function isObject(obj) {
    return obj === Object(obj);
}

export function removeValueFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

export function checkNullAndReturnString(str) {
    if(str!=null && str!=undefined && str!="")
    {
        return true
    }
    return false
}


export async function doFileConnect(dataJson) {

   // alert(JSON.stringify(dataJson))
    if( dataJson != "{}" && Object.keys(dataJson).length>0){
        var i =0
        const postFileUpload = new FormData();
        postFileUpload.append('file' + (i+1), dataJson.file);
        postFileUpload.append('fileName' + (i+1), dataJson.fileName);
        postFileUpload.append('processType' + (i+1), dataJson.processType);
        postFileUpload.append('docsId' + (i+1), dataJson.docsId);
      //  postFileUpload.append('userId', dataJson.userId);
       // alert(MyConstant.keyList.apiURL + "uploads/" + dataJson.processType + "/" + dataJson.fileType + "/" + dataJson.fileName)

        fetch(MyConstant.keyList.apiURL + "uploads/" + dataJson.processType + "/" + dataJson.fileType + "/" + dataJson.fileName, {
            method: "POST",
            mode: 'cors',
            redirect: 'follow',
            body: postFileUpload,
        }).then(
            function (response) {
                return response.json();
            }
        ).then(json => {
            return json.response;
        }).catch(error => console.warn(error));
    }


}



export async function doConnect(subUrl, method, postJson) {
    let startTime=Date.now();
    return fetch(MyConstant.keyList.apiURL + subUrl, {
        method: method,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify(postJson),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(
        function (response) {
            // let endTime=Date.now();
            // console.log(`Time taken to get login submit before parsing--> ${endTime-startTime}ms`)
            return response.json();
        }
    ).then(function (dataresponse) {
        let endTime=Date.now();
        console.log(`TimeElapsed on HTTP - login submit - after parse : ${endTime-startTime}ms`)
        return dataresponse;
    });
}




export function timeConverter(ts){
    var date_ob = new Date(parseInt(ts));
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    var hours = ("0" + date_ob.getHours()).slice(-2);
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}

export function getMonthAndDate(UNIX_timestamp,fullmonth=false){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    //var time = month + ' ' + date;
    let day=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var time = fullmonth ?day[a.getDay()] + ', ' +  month + ' ' + date:month + ' ' + date;
    return time;
}

export function pageNumbers(totalPages, page, maxLength) {
    if (maxLength < 5) throw "maxLength must be at least 5";
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
    let pagination = [];
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
    if (totalPages <= maxLength) {
        // no breaks in list
        pagination = range(1, totalPages);
    } else if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        pagination = range(1, maxLength - sideWidth - 1)
            .concat(0, range(totalPages - sideWidth + 1, totalPages));
    } else if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        pagination = range(1, sideWidth)
            .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    } else {
        // Breaks on both sides
        pagination = range(1, sideWidth)
            .concat(0, range(page - leftWidth, page + rightWidth),
                0, range(totalPages - sideWidth + 1, totalPages));
    }

    return pagination;
}