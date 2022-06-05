export class Format
{
    /** Русские буквы, для преобразования в английскую раскладку */
    static KEYBOARD_RU = [
        "й","ц","у","к","е","н","г","ш","щ","з","х","ъ",
        "ф","ы","в","а","п","р","о","л","д","ж","э",
        "я","ч","с","м","и","т","ь","б","ю"
    ];
    /** Английские буквы, для преобразования в русскую раскладку */
    static KEYBOARD_EN = [
        "q","w","e","r","t","y","u","i","o","p","\\[","\\]",
        "a","s","d","f","g","h","j","k","l",";","'",
        "z","x","c","v","b","n","m",",","\\."
    ]
    /** 
     * Преобразовать секунды в веденный формат 
     * 
     * Часы считаются с ограничением в 24, остаток записывается в дни. Если указать формат без DD, то весь остаток запишется в часы
     * @param units - обозначение дней, например '10 дней' или '10 days'
     * 
     * @example format = 'DD hh:mm:ss'; // default
     * 
     * Format.getFormatSeconds(1000000, 'DD hh:mm:ss'); // '11 13:46:40';
     * Format.getFormatSeconds(1000000, 'hh:mm:ss'); // '277:46:40';
    */
    static getFormatSeconds(seconds:number, format?, units?)
    {
        let days, hours, minutes, sec;
        let out = format ? format : "DD hh:mm:ss";
        if(out.indexOf('DD') !== -1) {
            days = Math.floor(seconds / 3600 / 24);
            hours = Math.floor(seconds / 3600 % 24);
            out = out.replace("DD", (days > 0 ? (days + (units ? units.day : "")) : ""));
        }
        else hours = Math.floor(seconds / 3600);
        minutes = Math.floor(seconds / 60 % 60);
        sec = Math.floor(seconds % 60);
        
        out = out.replace("hh", this.zero(hours));
        out = out.replace("mm", this.zero(minutes));
        out = out.replace("ss", this.zero(sec));
        return out;
    }
    /** 
     * Преобразовать дату в нужный формат
     * 
     * Можно передать значение даты в формате YYYY-MM-DD hh:mm:ss, UTC, а также в миллисекундах 
     * 
     * @example format = 'DD.MM.YYYY hh:mm:ss'; // default
     *
     * Format.getFormat('2021-06-15', 'DD.MM.YYYY'); // 15.06.2021
     * Format.getFormat(new Date(), 'DD.MM.YYYY'); // 15.06.2021
     * Format.getFormat(1623751680766, 'DD.MM'); // 15.06
     */
    static getFormat(_date, format?)
    {
        let out = format ? format : "DD.MM.YYYY hh:mm:ss";
       
        let date = new Date(_date);
        let day = this.zero(date.getDate());
        let month = this.zero(date.getMonth() + 1);
        let year = date.getFullYear();
        let hours = this.zero(date.getHours());
        let minutes = this.zero(date.getMinutes());
        let seconds = this.zero(date.getSeconds());
        
        out = out.replace("YYYY", year);
        out = out.replace("YY", year);
        out = out.replace("MM", month);
        out = out.replace("DD", day);
        out = out.replace("hh", hours);
        out = out.replace("mm", minutes);
        out = out.replace("ss", seconds);
        return out;
    }
    /** 
     * Преобразует значение даты из формата 'DD.MM.YYYY hh:mm:ss' в 'YYYY-MM-DD hh:mm:ss' 
     * 
     * @example 
     * Format.getDateFrom('15.06.2021'); // 2021-06-15
     * Format.getDateFrom('15.06.2021 10:00'); // 2021-06-15 10:00
     */
    static getDateFrom(_date:string)
    {
        let _in = _date.split(" ");
        let date = _in[0].split(".");
        return `${date[2]}-${date[1]}-${date[0]}${ _in[1] ? " " + _in[1] : "" }`;
    }
    /** Разбирает строку из location.href на параметры */
    static getParamsFromLocation(array, location)
    {
        if(location == undefined) return;
        let params = location.replace("?", "").split("&");
        let i = 0;
        if(params[0] != "")
            for(; i < params.length; i++)
            {
                let a = params[i].split('=');
                array.params[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            }
    }
    /** Преобразует строку из Snake case('text_text') в Camel case('textText') */
    static getCamelCase(str)
    {
        let words = str.split("_");
        let out = words[0];
        for(let i = 1; i < words.length; i++)
            out += words[i][0].toUpperCase() + words[i].slice(1);
        return out;
    }
    /** Возвращает строку с замененными символами для нужной клавиатуры (en, ru) */
    static autoKeyboardLang(str, keyboard)
    {
        let masterBoard = keyboard == "en" ? this.KEYBOARD_EN : this.KEYBOARD_RU;
        let slaveBoard = keyboard == "en" ? this.KEYBOARD_RU : this.KEYBOARD_EN;
        for(var i = 0; i < masterBoard.length; i++)
        {
            var reg = new RegExp(masterBoard[i], 'mig');
            str = str.replace(reg, a => a == a.toLowerCase() ? slaveBoard[i] : slaveBoard[i].toUpperCase());
        }
        return str;
    }
    private static S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    /**
     * Каждый элемент получает уникальный идентификатор
     * @example '372fd757-106c-ba24-849b-e2ce7345b86c'
     */
    static getGUID(/** 'S4' - Набор из 4 цифр в 16-ой системе */map = "S4S4-S4-S4-S4-S4-S4S4S4"):string
    {
        return map.split("S4").reduce((prev, curr) => prev + Format.S4() + curr);
    }
    /** Дополняет значение нулями, если число меньше 10*/
    static zero(value)
    {
        return (value < 10 ? "0" : "") + value;
    }
}