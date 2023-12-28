const capitalizeFirstLetter = (string: string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  };

  const checkURL = (url: string) => {
    if (url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG)$/) !== null) {
      return "image";
    } else if (url.match(/\.(mp4|MP4|mov|MOV)$/) !== null) {
      return "video";
    }
  };

  const idNumberGenerate = (count: number) => {
    const desiredLength = 5;
    let countString = count.toString();
    while (countString.length < desiredLength) {
      countString = "0" + countString;
    }
    return countString;
  };

  const generateNumber = ()=> {
    return Math.floor(10000000 + Math.random()* 90000000).toString()
    }
  

  export {
    capitalizeFirstLetter,
    checkURL,
    idNumberGenerate,
    generateNumber

  }