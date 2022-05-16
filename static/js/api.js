let data_url = '';

data_url = "http://192.168.1.13:5000";

function sendDataWithCallback(url, data, callback) {
    $.ajax({
        url:url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        async: false,
        beforeSend: function(){
            console.log("sending")
        },
        complete: function(){
            console.log("done sending");
        },
        success: function(data) {
            callback(data)
        },
        error: function() {
            console.log("error occured in sending to " + url);
        }
    });
}


function sendDataWithCallbackForm(btn, url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        contentType: false,
        processData:false,
        cache: false,
        beforeSend: function(){
            console.log("sending")
            btn_process.spinner_initializing(btn);
        },
        complete: function(){
            console.log("done sending");
        },
        success: function(data) {
            callback(data)
            btn_process.spinner_remove(btn);
        },
        error: function() {
            console.log("error occured in sending to " + url);
            btn_process.spinner_remove(btn);
        }
    });
}

function getDataWithCallback(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            callback(data)
        },
        error: function() {
            console.log("error occured in receiving from " + url);
        }
    });
}


// serailizing form data to json object
function serializeFormData(formData) {
    var json_obj = {};
    formData.forEach(function(value, key){
        json_obj[key] = value;
    });
    return json_obj
}

// Clearall
function clearAll(data) {
    var dataArr = data.split(',');
    for(var i = 0; i <dataArr.length; i++) {
        var id =  document.getElementById(dataArr[i]);
        if(id) {    
            if(id.tagName.toLocaleLowerCase() == 'input' || id.tagName.toLocaleLowerCase() == 'textarea' || id.tagName.toLocaleLowerCase() == 'select') {
                id.value="";
            }else {
                id.innerHTML = "";
            }
        }else {
            console.log('id not found');
        }
    }
}


// datatable

function recalc_table_withdata(tbl,cols,datas) {
    if ($.fn.DataTable.isDataTable(tbl)) {
        $(tbl).DataTable().destroy();
    }
    var table;
    let prom = new Promise( (resolve, reject)=> {
        table =  $(tbl).DataTable( {
            dom: 'Bfrtip',
            data:datas,
            columns: cols,
            buttons: [
                {
                    extend: 'print'
                }
            ],
            responsive: true
        });
        resolve();
    })
    
    prom.then( ()=> {
        table.columns.adjust().responsive.recalc();
    })
}

function recalc_table_withdata_it_inv(tbl,cols,datas) {
    if ($.fn.DataTable.isDataTable(tbl)) {
        $(tbl).DataTable().destroy();
    }
    var table;
    let prom = new Promise( (resolve, reject)=> {
        table =  $(tbl).DataTable( {
            dom: 'Bfrtip',
            data:datas,
            columns: cols,
            buttons: [
                {
                    extend: 'print'
                },
                {
                    text: 'Add new',
                    action: function (){
                        clear_inv()
                        $('#inventory_modal_id').modal();
                    }
                }
            ],
            responsive: true
        });
        resolve();
    })
    
    prom.then( ()=> {
        table.columns.adjust().responsive.recalc();
    })
}


function loadDataTable(route,table,col){
    getDataWithCallback(route,function(data){
        recalc_table_withdata(table,col,data);
    });
}

function loadDataTablePOST(route,data,table,col){
    sendDataWithCallback(route,data,function(res){
        recalc_table_withdata(table,col,res);
    });
}

function recalc_table_budget(cols,datas) {
    if ($.fn.DataTable.isDataTable('#tbl_budget')) {
        $('#tbl_budget').DataTable().destroy();
    }
    var table_budget;
    let prom = new Promise( (resolve, reject)=> {
        table_budget = $('#tbl_budget').DataTable( {
            dom: 'Bfrtip',
            data : datas,
            columns: cols,
            buttons: [
                {
                    extend: 'print', footer: true
                }
            ],
            responsive: true,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false
                }
            ],
            "footerCallback": function ( row, data, start, end, display ) {
                var api = this.api(), data;
    
                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
                };
    
                // Total over all pages
                total_amt = api
                    .column( 8 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                total_deduction = api
                    .column( 9 )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
    
                // Update footer
                $( api.column( 8 ).footer() ).html(
                    "TOTAL:" + total_amt
                );
                $( api.column( 9 ).footer() ).html(
                    "TOTAL:" + total_deduction
                );
                $( api.column( 3 ).footer() ).html(
                    "TOTAL BUDGET REAMAINING:" + (total_amt - total_deduction)
                );
            }
        })
        resolve();
    })
    
    prom.then( ()=> {
        table_budget.columns.adjust().responsive.recalc();
    })
}



function print_div(div,elem) {
    var s = "#"+elem+"{display: block!important;}"
    printJS({printable:div, type: 'html', scanStyles: false, style:s})
}

function get_dateNow(div){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();
    if (dd<10) {dd = '0'+dd;}
    if (mm<10) {mm = '0'+mm;}
    today = yy+'-'+mm+'-'+dd;
    document.getElementById(div).value = today;
}

function download_image(img_div){
    var image =byId(img_div).getAttribute('src');
    var fileName  = getFileName(image);
    saveAs(image,fileName)
}

function getFileName(str) {
    return str.substring(str.lastIndexOf('/') + 1)
}


$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var byId = function( id ) { return document.getElementById( id ); };
var createElem = function( id ) { return document.createElement( id ); };
