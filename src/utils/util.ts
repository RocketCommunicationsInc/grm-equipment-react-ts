  export const addToast = (
    message: string,
    hideClose: boolean,
    closeAfter: number
  ) => {
    const toastStack = document.querySelector(
      "rux-toast-stack"
    ) as HTMLRuxToastStackElement;
  
    toastStack.addToast({
      message: message,
      hideClose: hideClose,
      closeAfter: closeAfter,
    });
  };
  
  export const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  export function capitalize(str: string) {
    if (!str) return;
    let arr = str.split('-');
    let capitalized = arr.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    );
    return capitalized.join(' ');
  }
  