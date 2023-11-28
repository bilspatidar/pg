export function addNumbers(num1, num2) {
    return num1 + num2;
  }

  const handleFileInputChange = (e, set) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64Data = reader.result;
        set(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };
  
  export default handleFileInputChange;