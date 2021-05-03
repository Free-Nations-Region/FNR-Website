let manageSec = $('.managementSection');
let listSec = $('.listSection');
let checkSec = $('.checkSection');

$(document).ready(function () {
    populateListTable();
})

// Controls the UI upon clicking the cards.
function cardsUI(option)
{
    switch(option)
    {
        case 'list':
            hideAllSections();
            listSec.show();
            break;
        case 'check':
            hideAllSections();
            checkSec.show();
            break;
        case 'manage':
            hideAllSections();
            manageSec.show();
    }
}

// To avoid repetitive code in the cardsUI(option) function.
function hideAllSections()
{
    manageSec.hide();
    listSec.hide();
    checkSec.hide();
}

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

    // Each row is added by injecting HTML into the tbody of the table.
    let table = document.querySelector('tbody');
    for (let i = 0; i < info.length; i++)
    {
        table.insertRow(i).outerHTML =
            `<tr>
                <th scope="row">${i.toString()}</th>
                <td>${info[i].nation}</td>
                <td>${info[i].type}</td>
                <td>${info[i].duration}</td>
                <td>${info[i].status}</td>
             </tr>`;
    }
}
