export default function DateFormater(param){
    const date = new Date(param)
    return `${date.toString().split('GMT')[0]}`;
}