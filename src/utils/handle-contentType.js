const handleContentType = (fileName) => {
  let contentType;
  switch (fileName) {
    case "png":
      contentType = "image/png";
      break;
    case "jpg":
      contentType = "image/jpeg";
      break;
    default:
      contentType = "image/png";
      break;
  }
  return contentType;
};

module.exports = handleContentType;
