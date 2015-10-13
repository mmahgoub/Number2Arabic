convert_number = function (number, sex)
{
    var number = number;
    if ((number < 0) || (number > 999999999999))
    {
        throw new Error("العدد خارج النطاق");
    }
    var returner = "";
    //convert number into array of (string) number each case
    // -------number: 121210002876-----------//
    // 	0		1		2		3  //
    //'121'	  '210'	  '002'	  '876'
    var english_format_number = number_format(number);
    var array_number = explode(',', english_format_number);
    for (var i = 0; i < array_number.length; i++) {
        var place = array_number.length - i;
        

        returner += convert(array_number[i], place, sex);
        if ((array_number[(i + 1)]) && array_number[(i + 1)] > 0)
            returner += ' و';
    }
    return returner;
};


//private function
function convert(number, place, sex) {
    // take in charge the sex of NUMBERED
    var place = place;
    var place = parseInt(place);
    var sex = sex;

    //the number word in arabic for masculine and feminine
    var words = {
        'male': {
            '0': '', '1': 'واحد', '2': 'اثنان', '3': 'ثلاثة', '4': 'أربعة', '5': 'خمسة',
            '6': 'ستة', '7': 'سبعة', '8': 'ثمانية', '9': 'تسعة', '10': 'عشرة',
            '11': 'أحد عشر', '12': 'اثنا عشر', '13': 'ثلاثة عشر', '14': 'أربعة عشر', '15': 'خمسة عشر',
            '16': 'ستة عشر', '17': 'سبعة عشر', '18': 'ثمانية عشر', '19': 'تسعة عشر', '20': 'عشرون',
            '30': 'ثلاثون', '40': 'أربعون', '50': 'خمسون', '60': 'ستون', '70': 'سبعون',
            '80': 'ثمانون', '90': 'تسعون', '100': 'مئة', '200': 'مئتان', '300': 'ثلاثمائة', '400': 'أربعمائة', '500': 'خمسمائة',
            '600': 'ستمائة', '700': 'سبعمائة', '800': 'ثمانمائة', '900': 'تسعمائة'
        },
        'female': {
            '0': '', '1': 'واحدة', '2': 'اثنتان', '3': 'ثلاث', '4': 'أربع', '5': 'خمس',
            '6': 'ست', '7': 'سبع', '8': 'ثمان', '9': 'تسع', '10': 'عشر',
            '11': 'إحدى عشرة', '12': 'ثنتا عشرة', '13': 'ثلاث عشرة', '14': 'أربع عشرة', '15': 'خمس عشرة',
            '16': 'ست عشرة', '17': 'سبع عشرة', '18': 'ثمان عشرة', '19': 'تسع عشرة', '20': 'عشرون',
            '30': 'ثلاثون', '40': 'أربعون', '50': 'خمسون', '60': 'ستون', '70': 'سبعون',
            '80': 'ثمانون', '90': 'تسعون', '100': 'مئة', '200': 'مئتان', '300': 'ثلاثمائة', '400': 'أربعمائة', '500': 'خمسمائة',
            '600': 'ستمائة', '700': 'سبعمائة', '800': 'ثمانمائة', '900': 'تسعمائة'
        }
    };
    //take in charge the different way of writing the thousands and millions ...
    var mil = {
        '2': {'1': 'ألف', '2': 'ألفان', '3': 'آلاف'},
        '3': {'1': 'مليون', '2': 'مليونان', '3': 'ملايين'},
        '4': {'1': 'مليار', '2': 'ملياران', '3': 'مليارات'}
    };

    var mf = {'1': sex, '2': 'male', '3': 'male', '4': 'male'};
    var number_length = strlen(number);

    if (number == 0){
        return '';
    }else if (number[0] == 0) {
        if (number[1] == 0)
            number = substr(number, -1);
        else
            number = substr(number, -2);
    }
    switch (number_length) {
        case 1:
            {

                switch (place) {
                    case 1:
                        {

                            var returner = words[mf[place]][number];
                        }
                        break;
                    case 2:
                        {

                            if (number == 1)
                                returner = 'ألف';
                            else if (number == 2)
                                returner = 'ألفان';
                            else {
                                returner = words[mf[place]][number] + "" + ' آلاف';
                            }
                        }
                        break;
                    case 3:
                        {
                            if (number == 1)
                                returner = 'مليون';
                            else if (number == 2)
                                returner = 'مليونان';
                            else
                                returner = words[mf[place]][number] + "" + ' ملايين';
                        }
                        break;
                    case 4:
                        {
                            if (number == 1)
                                returner = 'مليار';
                            else if (number == 2)
                                returner = 'ملياران';
                            else
                                returner = words[mf[place]][number] + "" + ' مليارات';
                        }
                        break;
                }
            }
            break;
        case 2:
            {
                if ((words[mf[place]][number]))
                    returner = words[mf[place]][number];
                else {
                    var twoy = number[0] * 10;
                    var ony = number[1];
                    returner = words[mf[place]][ony] + "" + ' و' + "" + words[mf[place]][twoy];
                }
                switch (place) {
                    case 2:
                        {
                            returner += ' ألف';
                        }
                        break;
                    case 3:
                        {
                            returner += ' مليون';
                        }
                        break;
                    case 4:
                        {
                            returner += ' مليار';
                        }
                        break;
                }
            }
            break;
        case 3:
            {
                
                if ((words[mf[place]][number])) {
                    returner = words[mf[place]][number];
                    
                    if (number == 200)
                        returner = 'مئتا';
                    switch (place) {
                        case 2:
                            {
                                returner += ' ألف';
                            }
                            break;
                        case 3:
                            {
                                returner += ' مليون';
                            }
                            break;
                        case 4:
                            {
                                returner += ' مليار';
                            }
                            break;
                    }
                    return returner;
                }
                else {
                    var threey = parseInt(number[0]) * 100;
                    
                    if ((words[mf[place]][threey])) {
                        returner = words[mf[place]][threey];
                    }
                    var twoyony = parseInt(number[1]) * 10 + parseInt(number[2]);
                    
                    if (twoyony == 2) {
                        switch (place) {
                            case 1:
                                twoyony = words[mf[place]][2];
                                break;
                            case 2:
                                twoyony = 'ألفان';
                                break;
                            case 3:
                                twoyony = 'مليونان';
                                break;
                            case 4:
                                number = number;
                                sex = sex;
                                twoyony = 'ملياران';
                                break;
                        }
                        if (threey != 0) {
                            twoyony = 'و' + "" + twoyony;
                        }
                        returner = returner + "" + ' ' + "" + twoyony;
                    }
                    else if (twoyony == 1) {
                        switch (place) {
                            case 1:
                                twoyony = words[mf[place]][1];
                                break;
                            case 2:
                                twoyony = 'ألف';
                                break;
                            case 3:
                                twoyony = 'مليون';
                                break;
                            case 4:
                                twoyony = 'مليار';
                                break;
                        }
                        if (threey != 0) {
                            twoyony = 'و' + "" + twoyony;
                        }
                        returner = returner + "" + ' ' + "" + twoyony;
                    }

                    else {
                        if ((words[mf[place]][twoyony])){
                            
                            twoyony = words[mf[place]][twoyony];
                            }else {
                            twoy = parseInt(number[1]) * 10;
                            ony = parseInt(number[2]);
                            
                            twoyony = words[mf[place]][ony] + ' و' + words[mf[place]][twoy];
                        }
                        if (twoyony != '' && threey != 0)
                            returner = returner + ' و' + twoyony;
                        switch (place) {
                            case 2:
                                {
                                    returner += ' ألف';
                                }
                                break;
                            case 3:
                                {
                                    returner += ' مليون';
                                }
                                break;
                            case 4:
                                {
                                    returner += ' مليار';
                                }
                                break;
                        }
                    }
                }
            }
            break;
    }
    return returner;
}


function number_format(number, decimals, dec_point, thousands_sep) {
  //  discuss at: http://phpjs.org/functions/number_format/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: davook
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Michael White (http://getsprink.com)
  // bugfixed by: Benjamin Lupton
  // bugfixed by: Allan Jensen (http://www.winternet.no)
  // bugfixed by: Howard Yeend
  // bugfixed by: Diogo Resende
  // bugfixed by: Rival
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Luke Smith (http://lucassmith.name)
  //    input by: Kheang Hok Chin (http://www.distantia.ca/)
  //    input by: Jay Klehr
  //    input by: Amir Habibi (http://www.residence-mixte.com/)
  //    input by: Amirouche
  //   example 1: number_format(1234.56);
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ');
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '');
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.');
  //   returns 4: '67,00'
  //   example 5: number_format(1000);
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2);
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1);
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.');
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0);
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2);
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4);
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3);
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ');
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '');
  //  returns 14: '0.00000001'

  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}



function explode(delimiter, string, limit) {
    //  discuss at: http://phpjs.org/functions/explode/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: explode(' ', 'Kevin van Zonneveld');
    //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined')
        return null;
    if (delimiter === '' || delimiter === false || delimiter === null)
        return false;
    if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
            'object') {
        return {
            0: ''
        };
    }
    if (delimiter === true)
        delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split(delimiter);

    if (typeof limit === 'undefined')
        return s;

    // Support for limit
    if (limit === 0)
        limit = 1;

    // Positive limit
    if (limit > 0) {
        if (limit >= s.length)
            return s;
        return s.slice(0, limit - 1)
                .concat([s.slice(limit - 1)
                            .join(delimiter)
                ]);
    }

    // Negative limit
    if (-limit >= s.length)
        return [];

    s.splice(s.length + limit);
    return s;
}


function substr(str, start, len) {
    //  discuss at: http://phpjs.org/functions/substr/
    //     version: 909.322
    // original by: Martijn Wieringa
    // bugfixed by: T.Wild
    // improved by: Onno Marsman
    // improved by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Theriault
    //        note: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
    //   example 1: substr('abcdef', 0, -1);
    //   returns 1: 'abcde'
    //   example 2: substr(2, 0, -6);
    //   returns 2: false
    //   example 3: ini_set('unicode.semantics',  'on');
    //   example 3: substr('a\uD801\uDC00', 0, -1);
    //   returns 3: 'a'
    //   example 4: ini_set('unicode.semantics',  'on');
    //   example 4: substr('a\uD801\uDC00', 0, 2);
    //   returns 4: 'a\uD801\uDC00'
    //   example 5: ini_set('unicode.semantics',  'on');
    //   example 5: substr('a\uD801\uDC00', -1, 1);
    //   returns 5: '\uD801\uDC00'
    //   example 6: ini_set('unicode.semantics',  'on');
    //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
    //   returns 6: '\uD801\uDC00z'
    //   example 7: ini_set('unicode.semantics',  'on');
    //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
    //   returns 7: '\uD801\uDC00z'

    var i = 0,
            allBMP = true,
            es = 0,
            el = 0,
            se = 0,
            ret = '';
    str += '';
    var end = str.length;

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
        case 'on':
            // Full-blown Unicode including non-Basic-Multilingual-Plane characters
            // strlen()
            for (i = 0; i < str.length; i++) {
                if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                    allBMP = false;
                    break;
                }
            }

            if (!allBMP) {
                if (start < 0) {
                    for (i = end - 1, es = (start += end); i >= es; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            start--;
                            es--;
                        }
                    }
                } else {
                    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                    while ((surrogatePairs.exec(str)) != null) {
                        var li = surrogatePairs.lastIndex;
                        if (li - 2 < start) {
                            start++;
                        } else {
                            break;
                        }
                    }
                }

                if (start >= end || start < 0) {
                    return false;
                }
                if (len < 0) {
                    for (i = end - 1, el = (end += len); i >= el; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            end--;
                            el--;
                        }
                    }
                    if (start > end) {
                        return false;
                    }
                    return str.slice(start, end);
                } else {
                    se = start + len;
                    for (i = start; i < se; i++) {
                        ret += str.charAt(i);
                        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                            se++; // Go one further, since one of the "characters" is part of a surrogate pair
                        }
                    }
                    return ret;
                }
                break;
            }
            // Fall-through
        case 'off':
            // assumes there are no non-BMP characters;
            //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
        default:
            if (start < 0) {
                start += end;
            }
            end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
            // PHP returns false if start does not fall within the string.
            // PHP returns false if the calculated end comes before the calculated start.
            // PHP returns an empty string if start and end are the same.
            // Otherwise, PHP returns the portion of the string from start to end.
            return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
    }
    return undefined; // Please Netbeans
}


function strlen(string) {
    //  discuss at: http://phpjs.org/functions/strlen/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Sakimori
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Kirk Strobeck
    // bugfixed by: Onno Marsman
    //  revised by: Brett Zamir (http://brett-zamir.me)
    //        note: May look like overkill, but in order to be truly faithful to handling all Unicode
    //        note: characters and to this function in PHP which does not count the number of bytes
    //        note: but counts the number of characters, something like this is really necessary.
    //   example 1: strlen('Kevin van Zonneveld');
    //   returns 1: 19
    //   example 2: ini_set('unicode.semantics', 'on');
    //   example 2: strlen('A\ud87e\udc04Z');
    //   returns 2: 3

    var str = string + '';
    var i = 0,
            chr = '',
            lgth = 0;

    if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini[
            'unicode.semantics'].local_value.toLowerCase() !== 'on') {
        return string.length;
    }

    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i);
        var next = '',
                prev = '';
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw 'High surrogate without following low surrogate';
            }
            next = str.charCodeAt(i + 1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i) + str.charAt(i + 1);
        } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i - 1);
            if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
        }
        return str.charAt(i);
    };

    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((chr = getWholeChar(str, i)) === false) {
            continue;
        } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
        lgth++;
    }
    return lgth;
}