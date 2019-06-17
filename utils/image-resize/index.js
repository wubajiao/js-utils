export default function imageResize(params = {}) {
  let defaultOptions = {
    image: undefined,
    maxWidth: 1080,
    maxHeight: 1080,
  }
  let options = {
    ...defaultOptions,
    ...params,
  }

  return new Promise((resolve, reject) => {
    const $image = new Image()
    $image.onload = () => {
      let canvas = document.createElement('canvas')
      let width = $image.width
      let height = $image.height
      let scaleNumber = Math.min(options.maxWidth / width, options.maxHeight / height, 1)
      width = width * scaleNumber
      height = height * scaleNumber

      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage($image, 0, 0, width, height)

      // read as blob
      canvas.toBlob(function (blob) {
        resolve(new File([blob], `file.png`, { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.5)
    }

    if (typeof options.image === 'string') { //read image from url
      $image.src = options.image
    } else if (typeof options.image === 'object') { //we assume it is a blob image
      $image.src = URL.createObjectURL(options.image)
    }
  }).then(file => {
    return file
  })
}
