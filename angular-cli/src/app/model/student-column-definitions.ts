export const STUDENT_GRID_COLUMNS =  [
    {headerName: '', field:"", width: 23, template:`<a class="link" data-action-type="remove" >X</a>`},
    {headerName: "Name", field: "name" , width: 130},
    {headerName: "Age", field: "age", width: 80,  cellClass: 'data-center'},
    {headerName: "Course", field: "course" , width: 130},
    {headerName: "Total Fees", field: "totalFees" , width: 100},
    {headerName: "Fees Paid", field: "feesPaid", width: 80},
    {headerName: '', field:"", width: 50, template:`<a class="link" data-action-type="update" >Edit</a>`},
];