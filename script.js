/*

  1/13 
  - Project Content
  - Contact Content
  - About me content
  - Host
  
  1/15
  - Clean code
  - Compatabilty with phone and other devices (inclues making all px to vh/vw, hiding 
    desktop apps for phone, removing moving functionality and fill screen if on phone)

  Later Implemenetation
  - Format portfolio as a myspace profile
  - Desktop folder of jagg and jambo
  - hover over options for buttons and change cursor
  - Get cursor to wait on load after close
  
*/ 

// HTML elements constants
const launchTerminal = document.getElementById('launch_terminal');
const launchInput = document.getElementById('launch_input');
const startingWindowsText = document.getElementById('starting_windows_text');
const desktop = document.getElementById('desktop');
const portfolioWindow = document.getElementById('portfolio_window');
const windowContent = document.getElementById('window_content');
const windowHeader = document.getElementById('window_header');
const websiteButton = document.getElementById('website_button');
const volumeImage = document.getElementById('volume_image');
const currentHour = document.getElementById('hours');
const currentMinute = document.getElementById('minutes');
const currentTimeOfDay = document.getElementById('time_of_day');
const startMenu = document.getElementById('start_menu');
const startButton = document.getElementById('start_button');
const desktopPortfolioApp = document.getElementById('desktop_portfolio_app');
const menuRight = document.getElementById('menu_right');
const maximizeButton = document.getElementById('maximize_button');
const profileContainer = document.getElementById('profile_container');
const aboutMeContainer = document.getElementById('about_me_container');
const contactContainer = document.getElementById('contact_container');
const contactLinks = document.getElementById('contact_links');
const aboutMePic = document.getElementById('about_me_pic');
const aboutMeIntroduction = document.getElementById('about_me_introduction');
const profilePic = document.getElementById('profile_pic');

// Window Manipulation Variables
let isMouseDownMove = false;
let isMouseDownExtendLeft = false;
let isMouseDownExtendRight = false;
let isMouseDownExtendBottom = false;
let initialWidth = 0;
let initialHeight = 0;
let xOffset = 0;
let yOffset = 0;
let xMouse = 0;
let yMouse = 0;

// Misc Variables
let portfolioClose = false;
let isMute = false;
let siteStarted = false;
let isStartMenuOpen = false;
let isDesktopAppPressed = false;
const edgeThresh = 5;

// Audio Clips
var startup = new Audio('./assets/sound effects/win95_startup.mp3');
var minimizeWindow = new Audio('./assets/sound effects/Win98_minimize.mp3');
var maximizeWindow = new Audio('./assets/sound effects/Win98_maximize.mp3');
var restoreUpWindow = new Audio('./assets/sound effects/Win98_restore_up.mp3');
var restoreDownWindow = new Audio('./assets/sound effects/Win98_restore_down.mp3');

// isMobile() 
// Returns if a user is on a mobile device
function isMobile() {
    return/Android|iPhone/i.test(navigator.userAgent);
}

function adjustForMobile() {
    menuRight.style.display = 'none';
    portfolioWindow.style.marginTop = '0';
    portfolioWindow.style.marginLeft = '0';
    portfolioWindow.style.width = '99vw';
    portfolioWindow.style.height = '96vh';
    launchTerminal.style.width = '99vw';
    launchTerminal.style.paddingLeft = '1vw';
    launchInput.style.width = '30vw';
    windowContent.style.width = '100vw';
    windowContent.style.display = 'block';
    maximizeButton.style.display = 'none';
    profileContainer.style.display = 'block';
    aboutMeContainer.style.display = 'block';
    aboutMeContainer.style.width = '80vw';
    contactContainer.style.display = 'block';
    contactLinks.style.display = 'block';
    contactLinks.style.width = '80vw';
    contactLinks.style.height = '115px';
    aboutMePic.style.width = '80vw';
    aboutMeIntroduction.style.display = 'block';
    profilePic.style.marginTop = '30px';
}

// onLoad()
// When site is loaded, focus the terminal text input and accomodate for phone users
window.onload = () => {
    if (isMobile()) {
        adjustForMobile();
    }
    launchInput.focus();
    
};
 
// eventListener()
// When user inputs y in terminal and presses enter, transition to desktop
document.addEventListener("keyup", (e) => {
    if (!siteStarted
     && e.key === 'Enter'
     && launchInput.value.toLowerCase().trim() === "y") {
        startUpTransition();
    }
});

// showDesktop() 
// Shows the desktop from hidden on startup
function showDesktop() {
    document.body.style.backgroundColor = '#008080';
    desktop.style.display = 'block';
    document.body.style.userSelect = 'none';
} 

// hideTerminal()
// Hides the terminal displayed on startup
function hideTerminal() {
    launchTerminal.style.display = 'none';
}

// startUpTransition() 
// Performs timed transition of hiding the terminal, showing the desktop and playing audio
function startUpTransition() {
    
    siteStarted = true;
    launchInput.blur();
    startingWindowsText.style.display = 'block';

    setTimeout(()=> {
        hideTerminal();
        setTimeout(()=> {
            startup.play();
            setTimeout(()=> { 
                showDesktop();
            }, 600);
        }, 1000);  
    }, 2000); 
   
}

// setInterval()
// Updates the time in the bottom right of the desktop 
setInterval(()=>{ 
    let currentTime = new Date();
    let hour = currentTime.getHours().toString();
    let amPm = "AM";
    let minute = currentTime.getMinutes().toString();

    if (hour > 12) amPm = "PM"; 
    if (hour == "0") hour = "12";
    else if (hour.charAt(0) === '0' && hour.length > 1) hour = hour.substring(1);
    else if (parseInt(hour) % 12 > 0) hour = (parseInt(hour) % 12).toString();
    if (minute.length === 1) minute = "0" + minute;

    currentHour.innerHTML = hour;
    currentMinute.innerHTML = minute;
    currentTimeOfDay.innerHTML = amPm;
}, 1000);


// toDefaultWindowSize()
// Sets the window to the default size
function toDefaultWindowSize() {
    portfolioWindow.style.width = '70vw';
    portfolioWindow.style.marginLeft = '10vw';
    portfolioWindow.style.height = '80vh';
    portfolioWindow.style.marginTop = '2vh';
}

// toMaxWindowSize()
// Sets the window to the max size
function toMaxWindowSize() {
    portfolioWindow.style.width = '100vw';
    portfolioWindow.style.marginLeft = '0';
    portfolioWindow.style.height = '96vh';
    portfolioWindow.style.marginTop = '0';
}

// toggleOpen()
// Shows the window if it is hidden or hides it if shown
function toggleOpen() {
    if (portfolioWindow.style.display === 'none') { 
        showPortfolio();
        if (!isMute) maximizeWindow.play();                // Play maximize window audio
    } else {                                         
        portfolioWindow.style.display = 'none';
        websiteButton.style.backgroundColor = '#bdbdbd';   // Set button to untoggled     
        if (!isMute) minimizeWindow.play();                // Play minimize window audio
    }
}

// toggleOpenFromStart()
// Opens the window when opened from the start menu as it were opened from being close
function toggleOpenFromStart() {
    
    if (portfolioWindow.style.display === 'none') {
        document.body.style.cursor = 'wait';
        toggleStartMenu();
            setTimeout(() => {
                showPortfolio();
                document.body.style.cursor = 'default'; 
            }, 1500);    
    } else {
        toggleStartMenu();
    }
}

// showPortfolio()
// Display the portfolio window from hidden
function showPortfolio() {
    if (isMobile()) {
        adjustForMobile();
    }
    portfolioClose = false;
    portfolioWindow.style.display = 'flex';     
    websiteButton.style.backgroundColor = '#818181';   // Set button to toggled visually
    websiteButton.style.display = 'flex';
}

// closeWindow()
// Closes the window when visible
function closeWindow() {
    windowContent.scrollTop = 0;
    hideWindow();
    websiteButton.style.display = 'none';
}

// toggleMinimize()
// Closes windown and plays the minimize audio effect
function toggleMinimize() {
    hideWindow();
    if (!isMute) minimizeWindow.play();                // Play minimize window audio
}

// hideWindow()
// Hides the portfolio window
function hideWindow() {
    portfolioClose = true;
    portfolioWindow.style.display = 'none';            // Close the window when open
    toDefaultWindowSize();
    websiteButton.style.backgroundColor = '#bdbdbd';   // Set button to untoggled 
}

// toggleMaximize()
// Maximizes window to full screen if not already or shrinks window to default size
function toggleMaximize() {   
    
    if (portfolioWindow.style.width !== '100vw' 
     && portfolioWindow.style.height !== '96vh') {      // If window isn't maximized, maximize it
        toMaxWindowSize();
        if (!isMute) restoreUpWindow.play();            // Play restore up audio
        
    } else {                                            // Otherwise shrink the window size
        toDefaultWindowSize();
        if (!isMute) restoreDownWindow.play();          // Play restore down audio
    }
}

// toggleVolume()
// Toggles the volume of the site
function toggleVolume() {
    isMute = !isMute;

    if (isMute) {
        volumeImage.src = "./assets/system icons/volume mute.png";
    } else {
        volumeImage.src = "./assets/system icons/volume on.png";
    }
}

// toggleStartMenu()
// Toggles the start menu
function toggleStartMenu() {
    if (!isStartMenuOpen) {
        startMenu.style.display = 'flex';
        isStartMenuOpen = true;
        startButton.style.backgroundColor = '#818181';
    } else {
        isStartMenuOpen = false;
        startMenu.style.display = 'none';
        startButton.style.backgroundColor = '#c3c3c3';
    }
}

// windowHeader.addEventListener()
// When the window header is clicked, calculate the mouse offset to the screen
windowHeader.addEventListener('mousedown', (e) => {
    isMouseDownMove = true;

    xOffset = portfolioWindow.offsetLeft - e.clientX;
    yOffset = portfolioWindow.offsetTop - e.clientY;
    
});

// document.addEventListener()
// 
document.addEventListener('mousedown', (e) => {

    const edgeThresh = 5;
    const rect = portfolioWindow.getBoundingClientRect();
    initialWidth = rect.width;
    initialHeight = rect.height;

    if (isDesktopAppPressed && !desktopPortfolioApp.contains(e.target)) {
        isDesktopAppPressed = false;
        desktopPortfolioApp.style.border = 'none';
    }

    else if (!startMenu.contains(e.target) && !startButton.contains(e.target) && isStartMenuOpen) {
        toggleStartMenu();
    }
    
    else if ((rect.right - edgeThresh <= e.clientX) && (e.clientX <= rect.right + edgeThresh) 
     && (rect.bottom - edgeThresh <= e.clientY) && (e.clientY <= rect.bottom + edgeThresh)) {
        isMouseDownExtendRight = true;
        isMouseDownExtendBottom = true;
        xOffset = e.clientX;
        yOffset = e.clientY;
    }

    else if ((rect.left - edgeThresh <= e.clientX) && (e.clientX <= rect.left + edgeThresh) 
          && (rect.bottom - edgeThresh <= e.clientY) && (e.clientY <= rect.bottom + edgeThresh)) {
        isMouseDownExtendLeft = true;
        isMouseDownExtendBottom = true;
        xOffset = e.clientX;
        yOffset = e.clientY;
    }

    else if ((rect.left - edgeThresh <= e.clientX) && (e.clientX <= rect.left + edgeThresh)) {
        isMouseDownExtendLeft = true;
        xOffset = e.clientX;
    }

    else if ((rect.right - edgeThresh <= e.clientX) && (e.clientX <= rect.right + edgeThresh)) {
        isMouseDownExtendRight = true;
        xOffset = e.clientX;
    }

    else if ((rect.bottom - edgeThresh <= e.clientY) && (e.clientY <= rect.bottom + edgeThresh)) {
        isMouseDownExtendBottom = true;
        yOffset = e.clientY;
    }

});

document.addEventListener('mousemove', (e) => {
    const rect = portfolioWindow.getBoundingClientRect();

    let cursorStyle = 'default';

    // Check if the mouse is near the left or right edge
    if (e.clientX >= rect.left - edgeThresh && e.clientX <= rect.left) {
        cursorStyle = 'w-resize'; // Left edge
    } else if (e.clientX >= rect.right - edgeThresh && e.clientX <= rect.right) {
        cursorStyle = 'e-resize'; // Right edge
    }

    // Check if the mouse is near the bottom edge
    if (e.clientY >= rect.bottom - edgeThresh && e.clientY <= rect.bottom) {
        if (cursorStyle === 'w-resize') {
            cursorStyle = 'sw-resize'; // Bottom-left corner
        } else if (cursorStyle === 'e-resize') {
            cursorStyle = 'se-resize'; // Bottom-right corner
        } else {
            cursorStyle = 's-resize'; // Bottom edge
        }
    }

    // Set the cursor style
    document.body.style.cursor = cursorStyle;

});

// Reset cursor when leaving the portfolioWindow
portfolioWindow.addEventListener('mouseleave', () => {
    document.body.style.cursor = 'default';
});

document.addEventListener('mousemove', (e) => {

    if (isMouseDownMove) {
        e.preventDefault();
        portfolioWindow.style.marginLeft = (xOffset + e.clientX) + "px";
        portfolioWindow.style.marginTop = (yOffset + e.clientY) + "px";
    }

    else if (isMouseDownExtendRight && isMouseDownExtendBottom) {
        e.preventDefault();
        const newWidth = initialWidth - (xOffset - e.clientX);
        const newHeight = initialHeight - (yOffset - e.clientY);
        if (newWidth > 0 && newHeight > 0) {
            portfolioWindow.style.width = newWidth + "px";
            portfolioWindow.style.height = newHeight + "px";
        }
    }

    else if (isMouseDownExtendLeft && isMouseDownExtendBottom) {
        e.preventDefault();
        const newWidth = initialWidth + (xOffset - e.clientX);
        const newHeight = initialHeight - (yOffset - e.clientY);
        if (newWidth > 0 && newHeight > 0) {
            portfolioWindow.style.width = newWidth + "px";
            portfolioWindow.style.marginLeft = e.clientX + "px";
            portfolioWindow.style.height = newHeight + "px";
        }
    }

    else if (isMouseDownExtendRight) {
        e.preventDefault();
        const newWidth = initialWidth - (xOffset - e.clientX);
        if (newWidth > 0) {
            portfolioWindow.style.width = newWidth + "px";
        }
    }

    else if (isMouseDownExtendLeft) {
        e.preventDefault();
        const newWidth = initialWidth + (xOffset - e.clientX);
        if (newWidth > 0) {
            portfolioWindow.style.width = newWidth + "px";
            portfolioWindow.style.marginLeft = e.clientX + "px";
        }
    }

    else if (isMouseDownExtendBottom) {
        e.preventDefault();
        const newHeight = initialHeight - (yOffset - e.clientY);
        if (newHeight > 0) {
            portfolioWindow.style.height = newHeight + "px";
        }
    }

});

document.addEventListener('mouseup', () => {
    isMouseDownMove = false;
    isMouseDownExtendLeft = false;
    isMouseDownExtendRight = false;
    isMouseDownExtendBottom = false;
});

// 
desktopPortfolioApp.addEventListener('mousedown', (e) => {
    desktopPortfolioApp.style.border = '1px black';
    desktopPortfolioApp.style.borderStyle = 'dotted';
    isDesktopAppPressed = true;
    toggleOpenFromStart();
});
