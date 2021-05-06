let editSec = $('.editSection');
let viewOnlySec = $('.viewOnlySection');

// onLoad via jQuery
$(document).ready(function ()
{
    // Based on user permissions, shows a editable or viewOnly table.
    switch(1)
    {
        case 0:
            viewOnlySec.show();
            populateListTable();
            // DataTables library. Table must be populated before calling this function!
            $('#viewOnlyTable').DataTable();
            break;
        case 1:
            editSec.show();
            populateListTable();
            $('#editTable').DataTable();
    }
})

// Can populate the table in the list section.
function populateListTable()
{
    // Info is to be received in this format.
    let info = [
        {nation: "Heaveria", type: "Forum", duration: "160 Days", status: "Active"},
        {nation: "Tigerania", type: "WA", duration: "3 Years", status: "Left"},
        {nation: "Emaha", type: "WA", duration: "1 Month", status: "CTE"},
        {nation: "South Asians", type: "R/D", duration: "10 Days", status: "Active"},
        {nation: "Sparsdan", type: "WA", duration: "10 Days", status: "Active"}
    ]

    // Each row is added by injecting HTML into the tbody of the viewOnlyTable.
    let viewOnlyTable = document.querySelectorAll('tbody')[0];
    for (let i = 0; i < info.length; i++)
    {
        viewOnlyTable.insertRow(i).outerHTML =
            `<tr>
                <th scope="row">${i.toString()}</th>
                <td>${info[i].nation}</td>
                <td>${info[i].type}</td>
                <td>${info[i].duration}</td>
                <td>${info[i].status}</td>
             </tr>`;
    }

    // Each row is added by injecting HTML into the tbody of the viewOnlyTable.
    let editTable = document.querySelectorAll('tbody')[1];
    for (let i = 0; i < info.length; i++)
    {
        editTable.insertRow(i).outerHTML =
            `<tr>
                <th scope="row">${i.toString()}</th>
                <td contenteditable="false">
                    <i class="fas fa-trash-alt" id="fontIcon" style="font-size: 24px;"></i> 
                    <i class="fas fa-save" id="saveIcon" style="font-size: 24px; color: grey;"></i>
                    <i class="fas fa-times-circle" id="cancelIcon" style="font-size: 24px; color: grey;"></i>
                 </td>
                <td>${info[i].nation}</td>
                <td>${info[i].type}</td>
                <td contenteditable="false">${info[i].duration}</td>
                <td>${info[i].status}</td>
             </tr>`;
    }
}
