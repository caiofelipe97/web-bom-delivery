export const formatMoney = (value)=>{
    if(!value){
        return 'R$ 0,00'
    }
    let formated = parseFloat(value).toFixed(2).replace('.', ',');
    formated = 'R$' + formated;
    return formated;
}