function base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new File(byteArrays, `file.${contentType.split('/')[1]}`, { type: contentType });
  // const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export default function b2b(data) {
  // Split the base64 string in data and contentType
  let block = data.split(";");
  // Get the content type of the image
  let contentType = block[0].split(":")[1];// In this case "image/gif"
  // get the real base64 content of the file
  let realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

  // Convert it to a blob to upload
  var blob = base64ToBlob(realData, contentType);
  return blob;
}
