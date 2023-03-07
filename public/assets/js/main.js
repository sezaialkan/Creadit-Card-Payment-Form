const card = document.querySelector('.card')

let cardnumber_mask = new IMask(numberform, {
    mask: '0000 0000 0000 0000'
});


let cardvalid_mask = new IMask(validform, {
    mask: '00 / 00'
});

let cardcvc_mask = new IMask(cvcform, {
    mask: '0000'
});

let formBuild = (item, cardItem, valid, face) => {

    item.addEventListener('keyup', () => {

        if(item.value){
            cardItem.innerHTML = item.value
        }else{
            cardItem.innerHTML = valid
        }
    
    })

    item.addEventListener('click', () => {
        if(face){
            card.classList.add('reverse')
        }else{
            card.classList.remove('reverse')
        }
    })
    
}

card.addEventListener('click', () => {
    card.classList.toggle('reverse')
})

formBuild(numberform, cardNumber, 'XXXX XXXX XXXX XXXX', false)
formBuild(validform, validNumber, 'XX / XX', false)
formBuild(nameform, cardName, 'XXXXX XXXXX', false)
formBuild(cvcform, cvcNumber, 'XXX', true)
