export const parseXMLToText = (xmlString: string) => {
    if (!xmlString) return "";
  
    const tempElement = document.createElement("div");
    tempElement.innerHTML = xmlString;
    tempElement.querySelectorAll("script, style, iframe, noscript, #videoadv, #adfox_169469407653772735, a").forEach(el => el.remove());
    let text = tempElement.innerHTML || "";
  
    text = text
      .replace(/\s+/g, " ") 
      .replace(/&lt;.*?&gt;/g, "") 
      .replace(/<\/?[^>]+(>|$)/g, "") 
      .replace(/\[\.\.\.\]/g, "") 
      .replace(/\s{2,}/g, " ") 
      .trim();
  
    return text;
  };