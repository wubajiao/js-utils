// only support one level number/string/blob and array of that
export default function convertToFormData(postData) {
  var formData = new FormData();
  Object.keys(postData).map(key => {
    if (['string', 'number'].includes(typeof postData[key])) {
      formData.append(key, postData[key]);
    } else if (typeof postData[key] === 'object') {
      if (!Array.isArray(postData[key])) {
        //is not array
        if (postData[key] instanceof Blob) {
          formData.append(key, postData[key]);
        }
      } else {
        // is array
        postData[key].map(arrayItem => {
          //only one level
          if (['string', 'number'].includes(typeof arrayItem)) {
            formData.append(`${key}[]`, arrayItem);
          } else if (typeof arrayItem === 'object') {
            if (!Array.isArray(arrayItem)) {
              //is not array
              if (arrayItem instanceof Blob) {
                formData.append(`${key}[]`, arrayItem);
              }
            }
          }
        })
      }
    }
  })
  for (var item of formData.entries()) {
    console.log(`formDataItem ${item[0]}:`, item[1]);
  }
  return formData;
}
