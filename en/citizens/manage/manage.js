let manageSec = $('.managementSection');
let listSec = $('.listSection');
let checkSec = $('.checkSection');

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


function hideAllSections() {
    manageSec.hide();
    listSec.hide();
    checkSec.hide();
}
