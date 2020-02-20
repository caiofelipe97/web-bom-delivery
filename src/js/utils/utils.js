export const formatMoney = (price)=>{
    if(!price){
        return 'R$ 0,00'
    }
    let formated = parseFloat(price).toFixed(2).replace('.', ',');
    formated = 'R$' + formated;
    return formated;
}