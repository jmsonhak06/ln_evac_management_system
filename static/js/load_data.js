function loadDataTableEvac(tbl,cols,datas){
	if ($.fn.DataTable.isDataTable(tbl)) {
        $(tbl).DataTable().destroy();
    }
    $(tbl).DataTable({
	    	dom: 'Bfrtip',
	        buttons: [
				{
					extend:    'print',
					text:      '<i class="fa fa-print"></i>',
					titleAttr: 'print',
					className: 'rc_print',
					exportOptions: {columns: [ 0, 1, 2, 3,4,5]}
	            },
	            {
	                extend:    'copyHtml5',
	                text:      '<i class="fa fa-files-o"></i>',
	                titleAttr: 'Copy',
					className: 'rc_copy',
					exportOptions: {columns: [ 0, 1, 2, 3,4,5]}
	            },
	            {
	                extend:    'excelHtml5',
	                text:      '<i class="fa fa-file-excel-o"></i>',
	                titleAttr: 'Excel',
					className: 'rc_excel',
					exportOptions: {columns: [ 0, 1, 2, 3,4,5]}
	            },
	            {
	                extend:    'csvHtml5',
	                text:      '<i class="fa fa-file-text-o"></i>',
	                titleAttr: 'CSV',
					className: 'rc_csv',
					exportOptions: {columns: [ 0, 1, 2, 3,4,5]}
	            },
	            {
	                extend:    'pdfHtml5',
	                text:      '<i class="fa fa-file-pdf-o"></i>',
	                titleAttr: 'PDF',
					className: 'rc_pdf',
					exportOptions: {columns: [ 0, 1, 2, 3,4,5]}
	            }
	        ],
            data:datas,
            columns: cols,
            scrollY: '50vh',
            scrollX: true,
            scrollCollapse: true,
            deferRender: true,
            columnDefs: [{
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
					width: '125px',
                    render: function(data, type, full, meta) {
						return '\
	                        <a onclick="UpdateEvacuationSweet(this)" data-tbl='+tbl+' class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">\
	                            <span class="svg-icon svg-icon-md">\
	                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
	                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
	                                        <rect x="0" y="0" width="24" height="24"/>\
	                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero"\ transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>\
	                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>\
	                                    </g>\
	                                </svg>\
	                            </span>\
	                        </a>\
	                        <a onclick="evac_delete(this)" data-tbl='+tbl+' class="btn btn-sm btn-clean btn-icon" title="Delete">\
	                            <span class="svg-icon svg-icon-md">\
	                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
	                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
	                                        <rect x="0" y="0" width="24" height="24"/>\
	                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
	                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
	                                    </g>\
	                                </svg>\
	                            </span>\
	                        </a>\
	                    ';
                    },
                },
                {
                    targets: 7,
					width: '75px',
                    render: function(data, type, full, meta) {
                        var status = {
                            0: {
                                'title': 'Active',
                                'class': 'label-light-success'
                            },
                            1: {
                                'title': 'Inactive',
                                'class': ' label-light-danger'
                            }
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
                    },
                },
            ],
        });
}