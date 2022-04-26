function light(mode) {
     if (mode === true) {
        document.querySelector('header').style.backgroundImage = "url('https://github.com/Alucard2169/JS-TO-DO-list/blob/main/images/bg-mobile-light.jpg?raw=true')";
    }
    document.querySelector('header').style.backgroundImage = "url('https://github.com/Alucard2169/JS-TO-DO-list/blob/main/images/bg-desktop-light.jpg?raw=true')";
    document.querySelector('.theme').src = 'images/icon-sun.svg';
  document.documentElement.style.setProperty('--body-c', '#FAFAFA');  
  document.documentElement.style.setProperty('--list-c', '#FFFFFF');  
  document.documentElement.style.setProperty('--input-c', '#A1A0A6');  
  document.documentElement.style.setProperty('--incomplete-c', '#4C4B59');  
  document.documentElement.style.setProperty('--bottom-border', '#E6E5EA');  
  document.documentElement.style.setProperty('--complete-c', '#D6D5DA'); 
}

function dark(mode) {
    if (mode === true) {
        document.querySelector('header').style.backgroundImage = "url('https://github.com/Alucard2169/JS-TO-DO-list/blob/main/images/bg-mobile-dark.jpg?raw=true')";
    }
    
    document.querySelector('header').style.backgroundImage = "url('https://github.com/Alucard2169/JS-TO-DO-list/blob/main/images/bg-desktop-dark.jpg?raw=true')";
    document.querySelector('.theme').src = 'images/icon-moon.svg';
  document.documentElement.style.setProperty('--body-c', '#161620');  
  document.documentElement.style.setProperty('--list-c', '#25273C');  
  document.documentElement.style.setProperty('--input-c', '#626479');  
  document.documentElement.style.setProperty('--incomplete-c', '#B4B6CD');  
  document.documentElement.style.setProperty('--bottom-border', '#383A4F');  
  document.documentElement.style.setProperty('--complete-c', '#64667D'); 
}


export {light,dark}
