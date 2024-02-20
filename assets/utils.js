const baseUrl = 'https://yukbor.tiktuls.com/api';

function requestFunction(method, url, data, token) {
   let URL = url;

   let config = {
      method: method,
      headers: {
         'Origin': 'null'
      }
   }

   if (method == 'GET' && data) {
      URL += '?' + new URLSearchParams(data)
   }
   else if (data) {
      config.body = JSON.stringify(data)
      config.headers['Content-Type'] = 'application/json';
   }

   if (token) {
      config.headers['x-access-token'] = token;
   }

   return fetch(baseUrl + URL, config)
}

const request = {
   get: function (url, data, token) {
      return requestFunction('GET', url, data, token)
   },
   post: function (url, data, token) {
      return requestFunction('POST', url, data, token)
   },
   put: function (url, data, token) {
      return requestFunction('PUT', url, data, token)
   },
   delete: function (url, data, token) {
      return requestFunction('DELETE', url, data, token)
   },
}


function formatPhone(text) {
   if(text == '') return;
   
   let phone = '';
   
   try {
      const parsedNumber = libphonenumber.parsePhoneNumber('+' + text);
      let formatted = new libphonenumber.AsYouType(parsedNumber.country).input(text);
      
      if( parsedNumber.isValid() ) phone = parsedNumber.number.replace('+', '');

      return {
         formatted: formatted,
         phone: phone
      };

   } catch (error) {
      console.log(error);
   }

   return {
      formatted: text,
      phone: phone
   };
};

function isObjectOrString(property, xml, initialIndex) {
   initialIndex++;
   let closingProperty = '</' + property + '>';
   let content = '';
   let lastIndex = 0;

   for (let index = initialIndex; index < xml.length; index++) {
      const l = xml[index];
      content += l;

      var endOfContent = content.slice(content.length - closingProperty.length, content.length);

      if (closingProperty == endOfContent) {
         lastIndex = index;
         break;
      }
   }

   content = content.substring(0, content.length - closingProperty.length);

   if (content.match(/<\//g)) {
      if (content.match(/<\//g).length > 1) {
         return { content: content, type: 'object', lastIndex: lastIndex };
      }
   }

   return { content: content, type: 'string', lastIndex: lastIndex };
}

function xmlToObject(xml, obj = {}, InitialIndex = 0) {
   let property = '';
   let start = false;
   let lastIndex = 0;

   for (let index = InitialIndex; index < xml.length; index++) {
      const l = xml[index];

      if (lastIndex != 0 && index <= lastIndex) {
         continue;
      }

      if (l == '>') {
         let newProperty = property;
         property = '';
         start = false;

         let result = isObjectOrString(newProperty, xml, index);
         lastIndex = result.lastIndex;

         if (result.type == 'object') {
            obj[newProperty] = {};
            let newObject = obj[newProperty];

            obj[newProperty] = xmlToObject(result.content, newObject, 0);
         }
         else {
            obj[newProperty] = result.content;
         }
      }

      if (start) property += l;

      if (l == '<') start = true;
   }

   return obj;
}

function prettyLocation(xml, type, lang = 'ru') {
   if (!xml) return '';

   let location = xmlToObject(xml);

   if(lang == 'auto') {
      if(location.country.code == 'UZ') {
         lang = 'uz';
      } else {
         lang = 'ru';
      }
   }

   if(type == 'district') 
   {
      return location.district[lang];
   }
   else if(type == 'region') 
   {
      return location.region[lang];
   }
   else if(type == 'country') 
   {
      return location.country[lang];
   }
   else if(type == 'all') 
   {
      let name = location.country[lang];

      if (location.region) {
         name = name + ', ' + location.region[lang];
      }
      
      if (location.district) {
         name = name + ', ' + location.district[lang];
      }

      return name;
   }
   else 
   {
      if(location.district) return location.district[lang];
      if(location.region) return location.region[lang];
      if(location.country) return location.country[lang];
   }
}