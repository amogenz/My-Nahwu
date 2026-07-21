// Hide Splash Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hide');
  }, 1200);
});

// DEFAULT CONSTANTS
const DEFAULT_AVATAR = 'https://i.ibb.co.com/VYv0QJVK/ammo-ai.webp';
const SECRET_SALT = "AmogenzSecretKey2026_N3hwv_SecureRank";

// SVG ICONS DICTIONARY FOR RANKS
const SVG_ICONS = {
    kaisar: `<svg height="21px" width="21px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(1 1)"> <g> <path style="fill:#00DA6C;" d="M425.667,442.842H84.333c-9.387,0-17.067-7.68-17.067-17.067s7.68-17.067,17.067-17.067h341.333 c9.387,0,17.067,7.68,17.067,17.067S435.053,442.842,425.667,442.842"></path> <path style="fill:#00DA6C;" d="M425.667,340.442H84.333c-9.387,0-17.067-7.68-17.067-17.067c0-9.387,7.68-17.067,17.067-17.067 h341.333c9.387,0,17.067,7.68,17.067,17.067C442.733,332.762,435.053,340.442,425.667,340.442"></path> </g> <path style="fill:#FFFFFF;" d="M92.867,323.375c0-9.387,7.68-17.067,17.067-17.067h-25.6c-9.387,0-17.067,7.68-17.067,17.067 c0,9.387,7.68,17.067,17.067,17.067h25.6C100.547,340.442,92.867,332.762,92.867,323.375"></path> <g> <path style="fill:#00AD55;" d="M417.133,323.375c0,9.387-7.68,17.067-17.067,17.067h25.6c9.387,0,17.067-7.68,17.067-17.067 c0-9.387-7.68-17.067-17.067-17.067h-25.6C409.453,306.309,417.133,313.989,417.133,323.375"></path> <path style="fill:#00AD55;" d="M417.133,425.775c0,9.387-7.68,17.067-17.067,17.067h25.6c9.387,0,17.067-7.68,17.067-17.067 s-7.68-17.067-17.067-17.067h-25.6C409.453,408.709,417.133,416.389,417.133,425.775"></path> </g> <path style="fill:#FFFFFF;" d="M92.867,425.775c0-9.387,7.68-17.067,17.067-17.067h-25.6c-9.387,0-17.067,7.68-17.067,17.067 s7.68,17.067,17.067,17.067h25.6C100.547,442.842,92.867,435.162,92.867,425.775"></path> <path style="fill:#00DA6C;" d="M255,220.975L255,220.975c-9.387,0-17.067-7.68-17.067-17.067v-68.267 c0-9.387,7.68-17.067,17.067-17.067s17.067,7.68,17.067,17.067v68.267C272.067,213.295,264.387,220.975,255,220.975"></path> <polygon style="fill:#FFE100;" points="92.867,408.709 417.133,408.709 417.133,340.442 92.867,340.442 "></polygon> <polygon style="fill:#FFA800;" points="391.533,408.709 417.133,408.709 417.133,340.442 391.533,340.442 "></polygon> <polygon style="fill:#FFFFFF;" points="92.867,408.709 118.467,408.709 118.467,340.442 92.867,340.442 "></polygon> <g> <path style="fill:#FFE100;" d="M169.667,179.162L169.667,179.162C70.68,174.895,7.533,67.375,7.533,67.375 s-0.853,163.84,98.133,203.093C115.053,232.922,138.093,199.642,169.667,179.162"></path> <path style="fill:#FFE100;" d="M340.333,178.309L340.333,178.309c31.573,21.333,54.613,54.613,64,92.16 c98.987-39.253,98.133-203.093,98.133-203.093S439.32,174.895,340.333,178.309"></path> </g> <path style="fill:#FFA800;" d="M483.693,94.682c-4.267,44.373-19.627,133.973-81.92,169.813c0.853,2.56,1.707,5.12,1.707,7.68 c99.84-39.253,98.987-203.093,98.987-203.093S495.64,80.175,483.693,94.682"></path> <path style="fill:#FFFFFF;" d="M28.013,92.975c4.267,44.373,19.627,133.973,81.92,169.813c-0.853,2.56-1.707,5.12-1.707,7.68 C8.387,231.215,9.24,67.375,9.24,67.375S16.067,78.469,28.013,92.975"></path> <path style="fill:#FFE100;" d="M272.067,153.562v50.347c0,9.387-7.68,17.067-17.067,17.067s-17.067-7.68-17.067-17.067v-50.347 c-76.8,8.533-136.533,73.387-136.533,152.747h307.2C408.6,226.949,348.867,162.095,272.067,153.562"></path> <path d="M425.667,348.975H84.333c-14.507,0-25.6-11.093-25.6-25.6c0-14.507,11.093-25.6,25.6-25.6h341.333 c14.507,0,25.6,11.093,25.6,25.6C451.267,337.882,440.173,348.975,425.667,348.975z M84.333,314.842 c-5.12,0-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533h341.333c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533H84.333z"></path> <path d="M425.667,451.375H84.333c-14.507,0-25.6-11.093-25.6-25.6s11.093-25.6,25.6-25.6h341.333c14.507,0,25.6,11.093,25.6,25.6 S440.173,451.375,425.667,451.375z M84.333,417.242c-5.12,0-8.533,3.413-8.533,8.533s3.413,8.533,8.533,8.533h341.333 c5.12,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533H84.333z"></path> <path d="M425.667,417.242H84.333v-85.333h341.333V417.242z M101.4,400.175h307.2v-51.2H101.4V400.175z"></path> <path d="M220.867,383.109H152.6c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h68.267c5.12,0,8.533,3.413,8.533,8.533 S225.987,383.109,220.867,383.109z"></path> <path d="M357.4,383.109h-68.267c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533H357.4c5.12,0,8.533,3.413,8.533,8.533 S362.52,383.109,357.4,383.109z"></path> <path d="M263.533,374.575c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533 S263.533,369.455,263.533,374.575"></path> <path d="M400.067,374.575c0,5.12-3.413,8.533-8.533,8.533S383,379.695,383,374.575s3.413-8.533,8.533-8.533 S400.067,369.455,400.067,374.575"></path> <path d="M109.933,374.575c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533s-3.413,8.533-8.533,8.533 S109.933,379.695,109.933,374.575"></path> <path d="M105.667,279.002c-0.853,0-1.707,0-3.413-0.853C-1,237.189-1,74.202-1,67.375c0-3.413,2.56-6.827,5.973-8.533 c3.413-0.853,7.68,0.853,9.387,4.267c0.853,0.853,63.147,103.253,155.307,106.667c3.413,0,5.973,1.707,6.827,4.267 s0.853,5.973,0,8.533c-0.853,0.853-1.707,2.56-2.56,2.56c-29.867,20.48-51.2,51.2-59.733,86.187 c-0.853,2.56-2.56,4.267-4.267,5.973C108.227,279.002,107.373,279.002,105.667,279.002z M17.773,97.242 c5.12,45.227,21.333,130.56,81.92,161.28c8.533-29.013,25.6-54.613,47.787-74.24C86.893,173.189,41.667,127.109,17.773,97.242z"></path> <path d="M404.333,279.002c-1.707,0-2.56,0-4.267-0.853c-2.56-0.853-3.413-3.413-4.267-5.973 c-8.533-35.84-29.867-66.56-59.733-86.187c-0.853-0.853-1.707-1.707-2.56-2.56c-1.707-2.56-1.707-5.973-0.853-8.533 c1.707-2.56,4.267-5.12,6.827-5.12c93.013-3.413,155.307-105.813,155.307-106.667c1.707-3.413,5.973-5.12,9.387-4.267 c4.267,1.707,6.827,4.267,6.827,8.533c0,6.827,0,169.813-103.253,210.773C406.04,279.002,405.187,279.002,404.333,279.002z M361.667,184.282c22.187,19.627,39.253,45.227,47.787,74.24c60.587-30.72,77.653-116.053,81.92-161.28 C468.333,127.109,423.107,173.189,361.667,184.282z"></path> <path d="M255,229.509c-14.507,0-25.6-11.093-25.6-25.6v-68.267c0-14.507,11.093-25.6,25.6-25.6c14.507,0,25.6,11.093,25.6,25.6 v68.267C280.6,218.415,269.507,229.509,255,229.509z M255,127.109c-5.12,0-8.533,3.413-8.533,8.533v68.267 c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533v-68.267C263.533,130.522,260.12,127.109,255,127.109z"></path> <path d="M408.6,314.842H101.4c-5.12,0-8.533-3.413-8.533-8.533c0-82.773,62.293-151.893,144.213-161.28 c2.56,0,5.12,0.853,6.827,1.707c1.707,1.707,2.56,4.267,2.56,5.973v51.2c0,5.12,3.413,8.533,8.533,8.533 c5.12,0,8.533-3.413,8.533-8.533v-50.347c0-2.56,0.853-5.12,2.56-5.973c1.707-1.707,4.267-2.56,6.827-1.707 c81.92,8.533,144.213,77.653,144.213,160.427C417.133,311.429,413.72,314.842,408.6,314.842z M109.933,297.775h290.133 C395.8,230.362,347.16,174.895,280.6,163.802v40.107c0,14.507-11.093,25.6-25.6,25.6c-14.507,0-25.6-11.093-25.6-25.6v-40.107 C163.693,174.895,114.2,230.362,109.933,297.775z"></path> <path d="M220.867,255.109h-34.133c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h34.133c5.12,0,8.533,3.413,8.533,8.533 S225.987,255.109,220.867,255.109z"></path> <path d="M144.067,246.575c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533s-3.413,8.533-8.533,8.533 C147.48,255.109,144.067,251.695,144.067,246.575"></path> <path d="M331.8,272.175h-34.133c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533H331.8c5.12,0,8.533,3.413,8.533,8.533C340.333,268.762,336.92,272.175,331.8,272.175z"></path> <path d="M374.467,263.642c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S374.467,258.522,374.467,263.642"></path> </g> </g></svg>`,
    
    panglima: `<svg height="19px" width="19px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 503.82 503.82" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.0050382000000000005"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(1 1)"> <g> <path style="fill:#ffffff;" d="M400.313,451.62c4.197-4.197,10.072-6.715,16.787-7.554l-57.075-56.236l-23.502,23.502 l57.075,57.075C393.599,462.532,396.117,456.656,400.313,451.62"></path> <path style="fill:#ffffff;" d="M101.507,451.62c-4.197-4.197-10.072-6.715-16.787-7.554l57.075-57.075l23.502,23.502 l-57.075,57.915C108.222,462.532,105.704,456.656,101.507,451.62"></path> </g> <g> <path style="fill:#00ff00;" d="M348.274,398.742C348.274,399.581,348.274,399.581,348.274,398.742 c-14.269,14.269-31.895,23.502-51.2,26.859c-10.911,1.679-20.984-5.875-20.144-16.787l0,0c0-7.554,5.875-14.269,13.43-15.948 c12.59-2.518,24.341-8.393,33.574-17.626c10.072-10.072,15.948-21.823,18.466-35.252c1.679-7.554,8.393-13.43,15.948-13.43l0,0 c10.072,0,18.466,9.233,16.787,19.305C372.615,366.007,362.543,384.473,348.274,398.742"></path> <path style="fill:#00ff00;" d="M436.405,451.62c10.072,10.072,10.072,26.02,0,35.252c-10.072,10.072-26.02,10.072-35.252,0 c-10.072-10.072-10.072-26.02,0-35.252C410.386,441.548,426.333,441.548,436.405,451.62"></path> <path style="fill:#00ff00;" d="M153.546,398.742C153.546,399.581,153.546,399.581,153.546,398.742 c14.269,14.269,31.895,23.502,51.2,26.859c10.911,1.679,20.984-5.875,20.144-16.787l0,0c0-7.554,5.875-14.269,13.43-15.948 c-12.59-2.518-24.341-8.393-33.574-17.626c-10.072-10.072-15.948-21.823-18.466-35.252c-1.679-7.554-8.393-13.43-15.948-13.43l0,0 c-10.072,0-18.466,9.233-16.787,19.305C129.205,366.007,139.277,384.473,153.546,398.742"></path> <path style="fill:#00ff00;" d="M65.415,451.62c-10.072,10.072-10.072,26.02,0,35.252c10.072,10.072,26.02,10.072,35.252,0 c10.072-10.072,10.072-26.02,0-35.252C91.435,441.548,75.487,441.548,65.415,451.62"></path> </g> <g> <path style="fill:#ffffff;" d="M191.317,386.152c-5.036-2.518-10.072-5.875-14.269-10.072s-7.554-8.393-10.072-13.43 l99.043-99.043c83.095-83.095,112.472-160.315,112.472-160.315C438.923,87.345,485.927,7.607,485.927,7.607 s4.197,76.38-25.18,142.689c-4.197,9.233-41.967,8.393-41.967,8.393s10.911,31.056,8.393,33.574 c-5.036,5.875-84.774,89.81-127.58,113.311c-10.072,5.036-20.144,10.911-29.377,17.626 C250.91,335.791,221.533,357.614,191.317,386.152"></path> <path style="fill:#ffffff;" d="M215.658,313.129l35.252-35.252l-15.108-15.108C152.707,179.673,123.33,102.453,123.33,102.453 C62.897,87.345,15.894,7.607,15.894,7.607s-4.197,76.38,25.18,142.689c4.197,9.233,41.967,8.393,41.967,8.393 s-10.911,31.056-8.393,33.574c5.036,5.875,84.774,89.81,127.58,113.311C207.264,308.093,211.461,310.611,215.658,313.129"></path> <path style="fill:#ffffff;" d="M270.215,323.201c-5.875,4.197-11.751,8.393-19.305,13.43c17.626,12.59,38.61,29.377,59.593,49.521 c5.036-2.518,10.072-5.875,14.269-10.072s7.554-8.393,10.072-13.43l-48.682-48.682 C280.287,316.486,275.251,319.843,270.215,323.201"></path> </g> <path d="M293.717,434.834c-5.875,0-11.751-2.518-16.787-5.875c-5.875-5.036-9.233-12.59-8.393-20.144 c0-11.751,9.233-21.823,20.144-23.502c10.911-1.679,20.984-7.554,29.377-15.108c8.393-8.393,14.269-19.305,15.948-31.056 c1.679-11.751,12.59-20.144,24.341-20.144c7.554,0,15.108,3.357,20.144,9.233c5.036,5.875,6.715,13.43,5.875,20.144 c-4.197,21.823-14.269,41.128-30.216,57.075l0,0l0,0c-15.108,15.108-34.413,25.18-55.397,29.377 C297.074,434.834,295.395,434.834,293.717,434.834z M359.186,335.791L359.186,335.791c-4.197,0-7.554,2.518-8.393,6.715 c-2.518,14.269-10.072,28.538-20.984,39.449s-24.341,17.626-38.61,20.144c-3.357,0.839-6.715,4.197-6.715,7.554 s1.679,5.875,2.518,6.715c1.679,1.679,5.036,2.518,7.554,1.679c17.626-3.357,33.574-11.751,46.164-24.341l6.715,5.875l-5.875-5.875 c12.59-12.59,21.823-30.216,25.18-47.843c0.839-3.357-0.839-5.036-1.679-6.715C364.222,336.63,361.704,335.791,359.186,335.791z"></path> <path d="M418.779,502.82c-8.393,0-16.787-3.357-23.502-10.072c-13.43-13.43-13.43-34.413,0-47.843 c13.429-13.43,34.413-13.43,47.843,0c13.429,13.429,13.429,34.413,0,47.843C435.566,499.463,427.172,502.82,418.779,502.82z M418.779,452.46c-4.197,0-8.393,1.679-11.751,5.036c-6.715,6.715-6.715,16.787,0,23.502c6.715,6.715,17.626,6.715,23.502,0 c6.715-6.715,6.715-16.787,0-23.502C427.172,454.138,422.976,452.46,418.779,452.46z"></path> <path d="M393.599,476.801c-2.518,0-4.197-0.839-5.875-2.518l-57.075-57.075c-3.357-3.357-3.357-8.393,0-11.751l23.502-23.502 c3.357-3.357,8.393-3.357,11.751,0l57.075,57.075c2.518,2.518,3.357,5.875,1.679,9.233c-0.839,3.357-4.197,5.036-7.554,5.036 s-7.554,0.839-10.911,5.036c-3.357,3.357-5.036,8.393-5.036,10.911c0,3.357-2.518,5.875-5.036,7.554 C395.277,476.801,394.438,476.801,393.599,476.801z M348.274,411.332l41.128,41.128c1.679-2.518,3.357-5.036,5.036-6.715 c1.679-1.679,4.197-3.357,6.715-5.036l-41.128-41.128L348.274,411.332z"></path> <path d="M208.104,434.834c-1.679,0-3.357,0-5.036-0.839c-20.984-4.197-40.289-14.269-55.397-28.538l-0.839-0.839 c-15.948-15.948-26.02-35.252-30.216-57.075c-1.679-7.554,0.839-14.269,5.875-20.144c5.036-5.875,12.59-9.233,20.144-9.233 c11.751,0,21.823,8.393,24.341,20.144c1.679,10.911,7.554,21.823,15.948,31.056c8.393,8.393,18.466,13.43,29.377,15.108 c11.751,1.679,20.144,11.751,20.144,23.502c0,7.554-3.357,15.108-8.393,20.144C219.854,433.155,213.979,434.834,208.104,434.834z M159.422,393.706c12.59,12.59,28.538,20.984,46.164,24.341c2.518,0.839,5.036,0,7.554-1.679c0.839-0.839,3.357-3.357,2.518-6.715 c0-4.197-2.518-7.554-6.715-7.554c-14.269-2.518-27.698-9.233-38.61-20.144c-10.911-10.911-18.466-25.18-20.984-39.449 c-0.839-3.357-4.197-6.715-7.554-6.715c-2.518,0-5.036,0.839-6.715,3.357c-0.839,0.839-2.518,3.357-1.679,6.715 C137.599,362.65,145.992,380.276,159.422,393.706C159.422,392.866,159.422,392.866,159.422,393.706l-6.715,5.875L159.422,393.706z"></path> <path d="M83.041,502.82c-8.393,0-16.787-3.357-23.502-10.072c-13.43-13.43-13.43-34.413,0-47.843l0,0 c13.43-13.43,34.413-13.43,47.843,0c13.43,13.429,13.43,34.413,0,47.843C100.668,499.463,92.274,502.82,83.041,502.82z M71.291,457.496c-6.715,6.715-6.715,16.787,0,23.502c6.715,6.715,16.787,6.715,23.502,0c6.715-6.715,6.715-16.787,0-23.502 C88.917,450.781,78.005,450.781,71.291,457.496L71.291,457.496z"></path> <path d="M191.317,394.545c-1.679,0-2.518,0-4.197-0.839c-5.875-3.357-10.911-7.554-15.948-11.751 c-4.197-4.197-8.393-9.233-11.751-15.108c-1.679-3.357-1.679-7.554,0.839-10.072l99.043-99.043c82.256-82.256,111.633-157.797,111.633-157.797c0.839-2.518,3.357-4.197,5.875-5.036C433.048,79.791,478.372,4.25,478.372,3.411 c1.679-3.357,5.875-5.036,9.233-4.197c4.197,0.839,6.715,4.197,6.715,7.554s4.197,78.898-26.02,146.885 c-3.357,7.554-15.948,12.59-37.771,13.43c8.393,25.18,5.875,27.698,3.357,31.056c-5.036,5.875-84.774,90.649-130.098,115.83 c-8.393,5.036-19.305,10.072-28.538,16.787c-19.305,13.43-48.682,34.413-78.059,62.111 C195.513,393.706,192.995,394.545,191.317,394.545z M177.887,363.489c1.679,2.518,3.357,4.197,5.875,6.715 c1.679,1.679,4.197,4.197,6.715,5.875c28.538-26.02,56.236-46.164,75.541-59.593c10.072-6.715,20.984-12.59,30.216-17.626 c38.61-20.984,110.793-95.685,123.384-109.954c-0.839-5.036-4.197-17.626-8.393-27.698c-0.839-2.518-0.839-5.036,0.839-7.554 c1.679-2.518,4.197-3.357,6.715-3.357c14.269,0,31.056-1.679,34.413-4.197c17.626-39.449,22.662-83.934,23.502-110.793 c-18.466,25.18-52.039,62.111-92.328,74.702c-7.554,16.787-38.61,84.774-113.311,159.475L177.887,363.489z M420.458,187.227 L420.458,187.227L420.458,187.227z"></path> <path d="M108.222,476.801c-0.839,0-1.679,0-3.357-0.839c-3.357-0.839-5.036-4.197-5.036-7.554s-0.839-7.554-5.036-10.911l0,0 c-3.357-3.357-8.393-5.036-10.911-5.036c-3.357,0-5.875-2.518-7.554-5.036c-0.839-3.357-0.839-6.715,1.679-9.233l57.075-57.075 c3.357-3.357,8.393-3.357,11.751,0l23.502,23.502c3.357,3.357,3.357,8.393,0,11.751l-57.075,57.075 C112.418,475.961,110.74,476.801,108.222,476.801z M107.382,445.745c1.679,1.679,3.357,4.197,5.036,6.715l41.128-41.128 l-11.751-11.751l-41.128,41.128C103.186,442.388,104.864,444.066,107.382,445.745L107.382,445.745z"></path> <path d="M215.658,321.522c-1.679,0-2.518,0-4.197-0.839c-4.197-2.518-8.393-5.036-13.43-7.554 C152.707,288.788,72.13,203.175,67.933,197.299c-2.518-2.518-4.197-5.036,3.357-30.216c-21.823-0.839-34.413-5.036-37.77-13.43 C3.304,86.506,7.5,10.125,7.5,6.768s2.518-6.715,6.715-7.554c3.357-0.839,7.554,0.839,9.233,4.197 c0,0.839,45.325,76.38,101.561,90.649c2.518,0.839,5.036,2.518,5.875,5.036c0,0.839,30.216,76.38,110.793,156.957l15.108,15.108 c1.679,1.679,2.518,3.357,2.518,5.875s-0.839,4.197-2.518,5.875l-35.252,35.252C219.854,320.683,218.176,321.522,215.658,321.522z M83.041,188.906c12.59,14.269,84.774,88.131,123.384,109.954c2.518,1.679,5.036,3.357,8.393,4.197l24.341-24.341l-9.233-9.233 c-73.862-73.862-105.757-141.849-113.311-159.475c-40.289-12.59-73.862-50.361-92.328-74.702 c1.679,27.698,6.715,71.344,23.502,110.793c4.197,2.518,20.144,4.197,35.252,4.197c2.518,0,5.036,1.679,6.715,3.357 c1.679,2.518,1.679,5.036,0.839,7.554C87.238,171.279,83.881,183.87,83.041,188.906z M81.363,187.227L81.363,187.227 L81.363,187.227z"></path> <path d="M310.504,394.545c-1.679,0-4.197-0.839-5.875-2.518c-17.626-16.787-37.771-32.734-58.754-48.682 c-2.518-1.679-3.357-4.197-3.357-6.715s1.679-5.036,3.357-6.715c7.554-5.036,14.269-10.072,19.305-14.269 c5.036-3.357,10.072-6.715,15.948-10.072c3.357-1.679,7.554-1.679,10.072,1.679l48.682,48.682 c2.518,2.518,3.357,6.715,1.679,10.072c-3.357,5.875-7.554,10.911-11.751,15.108c-4.197,4.197-10.072,8.393-15.948,11.751 C313.861,393.706,312.182,394.545,310.504,394.545z M265.179,336.63c16.787,12.59,31.895,25.18,46.164,38.61 c2.518-1.679,5.036-3.357,6.715-5.875c1.679-1.679,3.357-4.197,5.036-6.715l-38.61-38.61c-3.357,2.518-6.715,4.197-10.072,5.875 l0,0C271.894,332.434,268.536,334.112,265.179,336.63z M270.215,323.201L270.215,323.201L270.215,323.201z"></path> </g> </g></svg>`,
    
    jendral: `<svg height="17px" width="17px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.147 511.147" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(1 1)"> <path style="fill:#ffffff;" d="M450.84,177.347V57.88c-11.093-12.8-45.227-24.747-82.773-34.987 c-74.24-19.627-152.747-19.627-226.987,0C103.534,33.133,69.4,45.08,58.307,57.88v119.467c0,0-3.413,237.227,196.267,324.267 C454.254,414.573,450.84,177.347,450.84,177.347"></path> <path style="fill:#FFA800;" d="M451.694,177.347V57.88c-11.093-12.8-45.227-24.747-82.773-34.987 c-31.573-8.533-64-12.8-95.573-14.507c26.453,1.707,52.907,6.827,78.507,13.653c37.547,10.24,72.533,22.187,82.773,34.987v119.467 c0,0,3.413,230.4-188.587,320.853c3.413,1.707,5.973,3.413,9.387,4.267C455.107,414.573,451.694,177.347,451.694,177.347"></path> <path style="fill:#FFFFFF;" d="M58.307,177.347V57.88c11.093-12.8,45.227-24.747,82.773-34.987c31.573-8.533,64-12.8,95.573-14.507c-26.453,1.707-52.907,6.827-78.507,13.653c-37.547,9.387-71.68,22.187-82.773,34.987v119.467c0,0-3.413,230.4,188.587,320.853c-3.413,1.707-5.973,3.413-9.387,4.267C54.894,414.573,58.307,177.347,58.307,177.347"></path> <path style="fill:#ffffff;" d="M254.574,454.68c-153.6-80.213-153.6-268.8-153.6-276.48V80.92 c9.387-4.267,24.747-10.24,51.2-17.067c33.28-9.387,67.413-13.653,102.4-13.653s69.12,4.267,102.4,13.653 c26.453,6.827,41.813,12.8,51.2,17.067v96.427C408.174,185.88,408.174,374.467,254.574,454.68"></path> <path style="fill:#63D3FD;" d="M237.507,245.613c0,44.373-24.747,75.093-24.747,75.093l23.04-4.267l18.773,23.04l18.773-23.04 l23.04,4.267c0,0-24.747-30.72-24.747-75.093c44.373,0,75.093,24.747,75.093,24.747l-4.267-23.04l23.04-18.773l-23.04-18.773 l4.267-23.04c0,0-30.72,24.747-75.093,24.747c0-44.373,24.747-75.093,24.747-75.093l-23.04,4.267l-18.773-23.04l-18.773,23.04 l-23.04-4.267c0,0,24.747,30.72,24.747,75.093c-44.373,0-75.093-24.747-75.093-24.747l4.267,23.04l-23.04,18.773l23.04,18.773 l-4.267,23.04C162.414,270.36,193.134,245.613,237.507,245.613"></path> <path d="M254.574,348.013c-2.56,0-5.12-0.853-6.827-3.413l-15.36-18.773l-17.92,3.413c-3.413,0.853-6.827-0.853-8.533-4.267 c-1.707-3.413-1.707-6.827,0.853-9.387c0,0,19.627-24.747,22.187-61.44c-35.84,2.56-60.587,22.187-61.44,22.187 c-2.56,2.56-6.827,2.56-9.387,0.853c-2.56-1.707-4.267-5.12-4.267-8.533l3.413-17.92l-18.773-15.36 c-2.56-1.707-3.413-4.267-3.413-6.827s0.853-5.12,3.413-6.827l18.773-15.36l-3.413-17.92c-0.853-3.413,0.853-6.827,4.267-8.533 c3.413-1.707,6.827-1.707,9.387,0.853c0,0,24.747,19.627,61.44,22.187c-2.56-35.84-22.187-60.587-22.187-61.44 c-2.56-2.56-2.56-6.827-0.853-9.387c1.707-3.413,5.12-4.267,8.533-4.267l17.92,3.413l15.36-18.773 c3.413-4.267,10.24-4.267,13.653,0l15.36,18.773l17.92-3.413c3.413-0.853,6.827,0.853,8.533,4.267 c1.707,3.413,1.707,6.827-0.853,9.387c0,0-19.627,24.747-22.187,61.44c35.84-2.56,60.587-22.187,61.44-22.187 c2.56-2.56,6.827-2.56,9.387-0.853c3.413,1.707,4.267,5.12,4.267,8.533l-3.413,17.92l18.773,15.36 c1.707,1.707,3.413,4.267,3.413,6.827s-0.853,5.12-3.413,6.827l-18.773,15.36l3.413,17.92c0.853,3.413-0.853,6.827-4.267,8.533 s-6.827,1.707-9.387-0.853c0,0-24.747-19.627-61.44-22.187c2.56,35.84,22.187,60.587,22.187,61.44 c2.56,2.56,2.56,6.827,0.853,9.387c-1.707,3.413-5.12,4.267-8.533,4.267l-17.92-3.413L261.4,344.6 C259.694,347.16,257.134,348.013,254.574,348.013z M235.8,307.907c2.56,0,5.12,0.853,6.827,3.413l11.947,14.507l11.947-14.507 c1.707-2.56,5.12-3.413,8.533-3.413l4.267,0.853c-7.68-14.507-16.213-36.693-16.213-63.147c0-5.12,3.413-8.533,8.533-8.533 c26.453,0,48.64,8.533,63.147,15.36l-0.853-4.267c-0.853-3.413,0.853-5.973,3.413-8.533l14.507-11.947l-14.507-11.947 c-2.56-1.707-3.413-5.12-3.413-8.533l0.853-4.267c-14.507,8.533-36.693,17.067-63.147,17.067c-5.12,0-8.533-3.413-8.533-8.533 c0-26.453,8.533-48.64,15.36-63.147l-4.267,0.853c-3.413,0.853-5.973-0.853-8.533-3.413l-11.093-14.507l-11.947,14.507 c-1.707,2.56-5.12,3.413-8.533,3.413l-4.267-0.853c7.68,14.507,16.213,36.693,16.213,63.147c0,5.12-3.413,8.533-8.533,8.533 c-26.453,0-48.64-8.533-63.147-15.36l0.853,4.267c0.853,3.413-0.853,5.973-3.413,8.533l-14.507,11.093l14.507,11.947 c2.56,1.707,3.413,5.12,3.413,8.533l-0.853,4.267c14.507-7.68,36.693-16.213,63.147-16.213c5.12,0,8.533,3.413,8.533,8.533 c0,26.453-8.533,48.64-15.36,63.147l4.267-0.853C234.947,307.907,235.8,307.907,235.8,307.907z"></path> <path d="M254.574,510.147c-0.853,0-2.56,0-3.413-0.853C48.067,420.547,49.774,179.907,49.774,177.347V57.88 c0-1.707,0.853-4.267,1.707-5.12c11.093-12.8,39.253-25.6,87.893-38.4c75.947-20.48,155.307-20.48,231.253,0 c47.787,12.8,76.8,25.6,87.04,37.547c0.853,1.707,1.707,4.267,1.707,5.973v119.467c0,5.973,0,244.053-201.387,331.947 C257.134,510.147,255.427,510.147,254.574,510.147z M66.84,61.293v116.053c0,2.56-0.853,229.547,187.733,314.88 c188.587-85.333,187.733-312.32,187.733-314.88l0,0V61.293c-6.827-5.973-25.6-16.213-76.8-30.72 c-72.533-19.627-149.333-19.627-221.867,0C92.44,45.08,73.667,55.32,66.84,61.293z"></path> <path d="M254.574,463.213c-1.707,0-2.56,0-4.267-0.853C92.44,379.587,92.44,185.88,92.44,178.2V80.92 c0-3.413,1.707-6.827,5.12-7.68c12.8-5.12,30.72-11.093,52.907-17.067c68.267-18.773,140.8-18.773,209.067,0 C381.72,62.147,399.64,68.12,412.44,73.24c2.56,0.853,4.267,4.267,4.267,7.68v96.427c0,8.533,0,202.24-157.867,284.16 C257.134,462.36,256.28,463.213,254.574,463.213z M109.507,86.893V178.2c0,7.68,0,187.733,145.067,267.093 C399.64,365.933,399.64,185.027,399.64,177.347V86.893c-8.533-3.413-23.04-8.533-45.227-14.507 c-64.853-17.92-134.827-17.92-199.68,0C132.547,78.36,118.04,82.627,109.507,86.893z"></path> </g> </g></svg>`,
    
    prajurit: `<svg height="17px" width="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="#8E8E93" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

// --- 1. ENKRIPSI & ANTI-TAMPER SCORE SECURITY SYSTEM ---
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function getSecureScore() {
    const rawScore = localStorage.getItem('mynahwu_sec_sc');
    const rawSig = localStorage.getItem('mynahwu_sec_sig');
    
    if (!rawScore || !rawSig) return 0;

    try {
        const decodedScore = parseInt(atob(rawScore), 10);
        if (isNaN(decodedScore) || decodedScore < 0) return 0;

        const expectedSig = simpleHash(decodedScore + SECRET_SALT);
        if (rawSig !== expectedSig) {
            console.warn("⚠️ Anti-Cheat Warning: Injeksi Console Dideteksi! Skor di-reset.");
            saveSecureScore(0);
            return 0;
        }
        return decodedScore;
    } catch(e) {
        return 0;
    }
}

function saveSecureScore(score) {
    const validScore = Math.max(0, parseInt(score, 10) || 0);
    const encodedScore = btoa(validScore.toString());
    const sig = simpleHash(validScore + SECRET_SALT);
    
    localStorage.setItem('mynahwu_sec_sc', encodedScore);
    localStorage.setItem('mynahwu_sec_sig', sig);
}

function addAccumulatedCorrect(scoreToAdd) {
    const current = getSecureScore();
    const updated = current + scoreToAdd;
    saveSecureScore(updated);
    updateRankUI();
}

// --- 2. AUDIO SFX ---
const sndCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
const sndWrong = new Audio('https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3');
sndCorrect.load(); sndWrong.load();

let wrongSoundTimer = null;
function mainkanSuaraSalah() {
    if (wrongSoundTimer) clearTimeout(wrongSoundTimer);
    sndWrong.pause();
    sndWrong.currentTime = 0;

    sndWrong.play().then(() => {
        wrongSoundTimer = setTimeout(() => {
            sndWrong.pause();
            sndWrong.currentTime = 0;
        }, 1300);
    }).catch(err => console.log("Autoplay diblokir:", err));
}

// --- 3. MARQUEE DATA ---
const DAWUH_PLAYLIST = [
    "من تبحر فى علم النحو اهتدى الى كل العلوم - Barangsiapa mendalami ilmu Nahwu, akan mendapat petunjuk ke segala ilmu.",
    "تعلموا العربية فإنها من دينكم - Pelajarilah bahasa Arab, karena ia adalah bagian dari agamamu. (Umar bin Khattab)",
    "النحو في الكلام كالملح في الطعام - Nahwu dalam ucapan ibarat garam dalam masakan.",
    "الخطأ في النحو كالجذام في الوجه - Kesalahan dalam Nahwu ibarat cacat di wajah.",
    "من جد وجد - Barangsiapa bersungguh-sungguh, pasti dapat.",
    "Kalam menurut ahli nahwu adalah lafazh yang tersusun yang memberi faedah dengan disengaja.",
    "Awal ilmu adalah diam, kemudian mendengarkan, menghafal, dan mengamalkan.",
    "Ilmu tanpa amal bagaikan pohon tanpa buah.",
    "Setiap Fa'il itu Rafa', every Maf'ul itu Nashob. Pahami kaidah ini sebagai pondasi dasar."
];
let dawuhIndex = 0;

const TAB_ICONS = {
    home: { active: 'ph-fill ph-house', inactive: 'ph ph-house' },
    kartu: { active: 'ph-fill ph-cards', inactive: 'ph ph-cards' },
    info: { active: 'ph-fill ph-gear', inactive: 'ph ph-gear' }
};

// --- 4. STATE ---
let quizData = null;
let dbCache = {}; 
let wordIndex = 0;
let stepIndex = 1;
let quizScore = { correct: 0, wrong: 0, total: 0 };
let failedStepsHistory = new Set();
let els = {};
let currentDatabase = 'lv1';
let toastTimer = null;

// --- 5. TOAST NOTIFICATION ---
function showToast(message) {
    const toast = document.getElementById('ios-toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

// --- 6. MEMORY CACHE INDICATOR & RESET ---
function getLocalStorageSizeKB() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length + key.length) * 2;
        }
    }
    const kb = total / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
}

function updateStorageSizeUI() {
    if (els.storageSizeVal) {
        els.storageSizeVal.innerText = getLocalStorageSizeKB();
    }
}

// --- 7. LOGIKA CALCULATE PANGKAT & UNLOCK BADGES (SVG REPLACED) ---
function calculateUserRank(totalCorrect) {
    let rankPosition = 4;
    if (totalCorrect >= 100) rankPosition = 1;
    else if (totalCorrect >= 50) rankPosition = 2;
    else if (totalCorrect >= 20) rankPosition = 3;

    let autoColor = '#8E8E93';
    let rankText = 'PRAJURIT';
    let rankIconSvg = SVG_ICONS.prajurit;

    if (rankPosition === 1) {
        autoColor = '#FFD700'; // Emas
        rankText = 'KAISAR';
        rankIconSvg = SVG_ICONS.kaisar;
    } else if (rankPosition === 2) {
        autoColor = '#34C759'; // Hijau Santri
        rankText = 'PANGLIMA BESAR';
        rankIconSvg = SVG_ICONS.panglima;
    } else if (rankPosition === 3) {
        autoColor = '#007AFF'; // Biru Premium
        rankText = 'JENDRAL';
        rankIconSvg = SVG_ICONS.jendral;
    }

    return { rankPosition, autoColor, rankText, rankIconSvg };
}

function updateRankUI() {
    const totalCorrect = getSecureScore();
    const rankObj = calculateUserRank(totalCorrect);

    // Apply UI Pangkat dengan SVG Icon & Auto Color
    if (els.userRankPill) {
        els.userRankPill.innerHTML = `${rankObj.rankIconSvg} <span>${rankObj.rankText}</span>`;
        els.userRankPill.style.backgroundColor = rankObj.autoColor;
    }

    if (els.quizUserRank) {
        els.quizUserRank.innerHTML = `${rankObj.rankIconSvg} <span>${rankObj.rankText}</span>`;
        els.quizUserRank.style.color = rankObj.autoColor;
        els.quizUserRank.style.backgroundColor = `${rankObj.autoColor}20`;
    }

    if (els.rcUserRankBadge) {
        els.rcUserRankBadge.innerHTML = `${rankObj.rankIconSvg} <span>${rankObj.rankText}</span>`;
        els.rcUserRankBadge.style.backgroundColor = rankObj.autoColor;
    }

    if (els.badgePageRankTitle) {
        els.badgePageRankTitle.innerHTML = `${rankObj.rankIconSvg} <span>${rankObj.rankText}</span>`;
    }

    if (els.badgePageScorePill) {
        els.badgePageScorePill.innerText = `${totalCorrect} Jawaban Benar`;
    }

    // Set Icon SVG pada List Badge Pangkat di Tab Kartu
    const bicPrajurit = document.getElementById('bic-icon-prajurit');
    const bicJendral = document.getElementById('bic-icon-jendral');
    const bicPanglima = document.getElementById('bic-icon-panglima');
    const bicKaisar = document.getElementById('bic-icon-kaisar');

    if (bicPrajurit) bicPrajurit.innerHTML = SVG_ICONS.prajurit;
    if (bicJendral) bicJendral.innerHTML = SVG_ICONS.jendral;
    if (bicPanglima) bicPanglima.innerHTML = SVG_ICONS.panglima;
    if (bicKaisar) bicKaisar.innerHTML = SVG_ICONS.kaisar;

    // Update Progress Bar
    let maxGoal = 20;
    let nextTitle = "JENDRAL";
    if (totalCorrect >= 100) {
        maxGoal = 100;
        nextTitle = "Mencapai Pangkat Tertinggi!";
    } else if (totalCorrect >= 50) {
        maxGoal = 100;
        nextTitle = "KAISAR";
    } else if (totalCorrect >= 20) {
        maxGoal = 50;
        nextTitle = "PANGLIMA BESAR";
    }

    const percent = Math.min(100, Math.round((totalCorrect / maxGoal) * 100));
    if (els.rpcBarFill) els.rpcBarFill.style.width = `${percent}%`;

    if (els.rpcNextText) {
        if (totalCorrect >= 100) {
            els.rpcNextText.innerText = "Selamat! Kamu telah berada di Pangkat Tertinggi.";
        } else {
            const needMore = maxGoal - totalCorrect;
            els.rpcNextText.innerText = `Selesaikan ${needMore} soal lagi untuk naik ke ${nextTitle}`;
        }
    }

    // Update Visual Lock / Unlock pada List Badge
    updateBadgeCardVisual('badge-card-prajurit', totalCorrect >= 0);
    updateBadgeCardVisual('badge-card-jendral', totalCorrect >= 20);
    updateBadgeCardVisual('badge-card-panglima', totalCorrect >= 50);
    updateBadgeCardVisual('badge-card-kaisar', totalCorrect >= 100);

    updateStorageSizeUI();
}

function updateBadgeCardVisual(elementId, isUnlocked) {
    const card = document.getElementById(elementId);
    if (!card) return;

    const statusSpan = card.querySelector('.bic-status');
    if (isUnlocked) {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        if (statusSpan) {
            statusSpan.className = 'bic-status unlocked';
            statusSpan.innerHTML = '<i class="ph-bold ph-check"></i> Terbuka';
        }
    } else {
        card.classList.remove('unlocked');
        card.classList.add('locked');
        if (statusSpan) {
            statusSpan.className = 'bic-status locked';
            statusSpan.innerHTML = '<i class="ph-bold ph-lock"></i> Terkunci';
        }
    }
}

// --- 8. HELPER FUNGSI ---
function getLevelLabel(dbKey) {
    switch(dbKey) {
        case 'lv1':          return 'Jurumiyah · Lv 1';
        case 'lv2':          return 'Imrithi · Lv 2';
        case 'alfiyah-isim': return 'Alfiyah Isim';
        case 'alfiyah-fiil': return 'Alfiyah Fi\'il';
        case 'shorof':       return 'Shorof';
        default:             return 'Jurumiyah';
    }
}

function updateMarquee(text) {
    if (els.marqueeTexts && els.marqueeTexts.length > 0) {
        els.marqueeTexts.forEach(el => el.innerText = text || "");
    }
}

function setRandomMarquee() {
    if (DAWUH_PLAYLIST.length > 0) {
        const randomIdx = Math.floor(Math.random() * DAWUH_PLAYLIST.length);
        updateMarquee(DAWUH_PLAYLIST[randomIdx]);
        dawuhIndex = randomIdx;
    }
}

function getDbUrl(dbName) {
    const baseUrl = "https://cdn.jsdelivr.net/gh/amogenz/Amogenz/db";
    switch(dbName) {
        case 'lv1':          return `${baseUrl}/amogenzdb-lv1.js`;
        case 'lv2':          return `${baseUrl}/amogenzdb-lv2.js`;
        case 'alfiyah-fiil': return `${baseUrl}/amogenzdb-alfiyah-fiil.js`;
        case 'alfiyah-isim': return `${baseUrl}/amogenzdb-alfiyah-isim.js`;
        case 'shorof':       return `${baseUrl}/amogenzdb-shorof.js`;
        default:             return `${baseUrl}/amogenzdb-lv1.js`;
    }
}

async function loadDatabaseAsync(dbName) {
    if (dbCache[dbName]) return dbCache[dbName];

    const url = getDbUrl(dbName);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal mengunduh database: ${dbName}`);
    
    const text = await response.text();
    const match = text.match(/export\s+const\s+AMOGENZ_DB_[A-Z0-9_]+\s*=\s*([\s\S]*?);?\s*$/);
    if (!match || !match[1]) throw new Error(`Format data file ${dbName} tidak valid.`);

    let rawData = match[1].trim();
    const parsedData = new Function(`return ${rawData}`)();
    
    dbCache[dbName] = parsedData;
    return parsedData;
}

function getSeenSentences() { 
    const key = `mynahwu_seen_indices_${currentDatabase}`;
    const seen = localStorage.getItem(key); 
    return seen ? JSON.parse(seen) : []; 
}

function markSentenceSeen(id) { 
    if (id && id !== "ai_generated") { 
        const key = `mynahwu_seen_indices_${currentDatabase}`;
        const seen = getSeenSentences(); 
        if (!seen.includes(id)) { 
            seen.push(id); 
            localStorage.setItem(key, JSON.stringify(seen)); 
        } 
    } 
}

function playSound(isCorrect) { 
    if (!els.soundToggle || !els.soundToggle.checked) return; 
    if (isCorrect) { 
        sndCorrect.currentTime = 0; 
        sndCorrect.play().catch(() => {}); 
    } else { 
        mainkanSuaraSalah(); 
    } 
}

function updateScoreUI() {
    if (els.scoreCorrect) els.scoreCorrect.innerText = quizScore.correct;
    if (els.scoreWrong) els.scoreWrong.innerText = quizScore.wrong;
}

// --- 9. PERSONALIZATION HANDLERS ---
function loadPersonalization() {
    // 1. Nama Panggilan
    const savedName = localStorage.getItem('mynahwu_user_name') || '';
    if (els.userNameInput) els.userNameInput.value = savedName;
    updateGreetingUI(savedName);

    // 2. Foto Profil (PP)
    const savedPP = localStorage.getItem('mynahwu_user_pp') || DEFAULT_AVATAR;
    applyUserPP(savedPP, false);

    // 3. Warna Aksen
    const savedColor = localStorage.getItem('mynahwu_accent_color') || '#007AFF';
    applyAccentColor(savedColor, false);

    // 4. Wallpaper Latar Belakang
    const savedBg = localStorage.getItem('mynahwu_custom_bg') || 'default';
    applyBackground(savedBg, false);

    // 5. Slider Opacity Overlay
    const savedOpacity = localStorage.getItem('mynahwu_bg_opacity') || '15';
    if (els.sliderBgOpacity) {
        els.sliderBgOpacity.value = savedOpacity;
        applyBgOpacity(savedOpacity, false);
    }

    // 6. Slider Blur Kartu
    const savedBlur = localStorage.getItem('mynahwu_card_blur') || '6';
    if (els.sliderCardBlur) {
        els.sliderCardBlur.value = savedBlur;
        applyCardBlur(savedBlur, false);
    }

    // 7. Update Pangkat & Memori UI
    updateRankUI();
}

function updateGreetingUI(name) {
    const cleanName = name.trim();
    if (els.greetingTitle) {
        els.greetingTitle.innerText = cleanName ? `Assalamu'alaikum, ${cleanName}` : "Assalamu'alaikum";
    }
    if (els.greetingNameBold) {
        els.greetingNameBold.innerText = cleanName || "Ammo";
    }
    if (els.quizUserName) {
        els.quizUserName.innerText = cleanName || "Pengguna My Nahwu";
    }
}

function applyUserPP(ppSrc, triggerToast = true) {
    if (els.heroAvatar) els.heroAvatar.src = ppSrc;
    if (els.quizUserAvatar) els.quizUserAvatar.src = ppSrc;
    if (els.rcUserPP) els.rcUserPP.src = ppSrc;

    localStorage.setItem('mynahwu_user_pp', ppSrc);
    if (triggerToast) showToast("Foto profil diperbarui");
}

function applyAccentColor(hex, triggerToast = true) {
    document.documentElement.style.setProperty('--ios-blue', hex);
    localStorage.setItem('mynahwu_accent_color', hex);
    
    document.querySelectorAll('.color-dot').forEach(btn => {
        if (btn.getAttribute('data-color') === hex) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    if (triggerToast) showToast("Warna aksen diperbarui");
}

function applyBackground(bgValue, triggerToast = true) {
    const bgLayer = document.getElementById('app-bg-layer');
    if (!bgLayer) return;

    if (bgValue === 'default' || !bgValue) {
        bgLayer.style.backgroundImage = 'none';
        bgLayer.style.background = '#F2F2F7';
        localStorage.setItem('mynahwu_custom_bg', 'default');
        if (triggerToast) showToast("Latar kembali ke default iOS");

    } else if (bgValue.startsWith('linear-gradient')) {
        bgLayer.style.backgroundImage = 'none';
        bgLayer.style.background = bgValue;
        localStorage.setItem('mynahwu_custom_bg', bgValue);
        if (triggerToast) showToast("Latar gradasi diperbarui");

    } else {
        bgLayer.style.background = 'none';
        bgLayer.style.backgroundImage = `url("${bgValue}")`;
        localStorage.setItem('mynahwu_custom_bg', bgValue);
        if (triggerToast) showToast("Wallpaper HP dipasang!");
    }

    document.querySelectorAll('.preset-dot').forEach(btn => {
        if (btn.getAttribute('data-bg') === bgValue) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function applyBgOpacity(val, triggerToast = true) {
    const opacityDecimal = (parseInt(val) / 100).toFixed(2);
    document.documentElement.style.setProperty('--app-overlay-opacity', opacityDecimal);
    localStorage.setItem('mynahwu_bg_opacity', val);
    if (els.valBgOpacity) els.valBgOpacity.innerText = `${val}%`;
    if (triggerToast) showToast(`Kegelapan wallpaper: ${val}%`);
}

function applyCardBlur(val, triggerToast = true) {
    document.documentElement.style.setProperty('--card-blur', `${val}px`);
    localStorage.setItem('mynahwu_card_blur', val);
    if (els.valCardBlur) els.valCardBlur.innerText = `${val}px`;
    if (triggerToast) showToast(`Blur kartu: ${val}px`);
}

// --- 10. MODAL MANAGEMENT ---
function resetModalState() {
    if (els.fbBtnCancel) els.fbBtnCancel.style.display = 'none';
    if (els.fbBtn) {
        els.fbBtn.innerText = 'Lanjut';
        els.fbBtn.classList.remove('danger');
    }
}

function closeModal(callback) {
    els.mCard.style.transform = 'scale(0.92)';
    setTimeout(() => {
        els.modal.style.display = 'none';
        resetModalState();
        if (callback) callback();
    }, 150);
}

function showConfirmModal(title, msg, onConfirm) {
    resetModalState();
    els.mTitle.innerText = title;
    els.mTitle.style.color = "#000000";
    els.mIcon.innerHTML = '<i class="ph-fill ph-warning" style="color: var(--ios-orange); font-size: 2.1rem;"></i>';
    els.mMsg.innerText = msg;
    
    if (els.fbBtnCancel) els.fbBtnCancel.style.display = 'block';
    if (els.fbBtn) {
        els.fbBtn.innerText = 'Setuju';
        els.fbBtn.classList.add('danger');
    }

    els.modal.style.display = 'flex';
    setTimeout(() => els.mCard.style.transform = 'scale(1)', 10);

    if (els.fbBtnCancel) {
        els.fbBtnCancel.onclick = () => closeModal();
    }

    els.fbBtn.onclick = () => closeModal(onConfirm);
}

// --- 11. LOGIKA QUIZ SAFE & ANTI-UNDEFINED ---
async function startLearningCycle() {
    els.viewStart.style.display = 'none';
    els.viewQuiz.style.display = 'none';
    els.viewLoading.style.display = 'flex';

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
        const DATABASE = await loadDatabaseAsync(currentDatabase);
        if (!Array.isArray(DATABASE) || DATABASE.length === 0) {
            throw new Error("Database kosong!");
        }

        const seenIds = getSeenSentences();
        let availableQuizzes = DATABASE.filter(q => q && q.id_kalimat && !seenIds.includes(q.id_kalimat));
        
        if (availableQuizzes.length === 0) {
            availableQuizzes = DATABASE;
        }

        const selectedQuiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];

        if (!selectedQuiz || !selectedQuiz.analysis || !Array.isArray(selectedQuiz.analysis) || selectedQuiz.analysis.length === 0) {
            throw new Error("Struktur soal tidak lengkap.");
        }

        quizData = {
            id: selectedQuiz.id_kalimat,
            sentence: selectedQuiz.teks_kalimat || "Lafadz Kitab",
            analysis: selectedQuiz.analysis
        };

        markSentenceSeen(quizData.id);
        setRandomMarquee();

        wordIndex = 0; 
        stepIndex = 1;
        quizScore = { correct: 0, wrong: 0, total: 0 };
        failedStepsHistory.clear();
        updateScoreUI();
        
        els.viewLoading.style.display = 'none';
        els.viewQuiz.style.display = 'flex';
        
        renderQuestion();

    } catch (error) {
        console.error("Error loading quiz data:", error);
        alert("Gagal memuat database. Cek koneksi internet brey!");
        els.viewLoading.style.display = 'none';
        els.viewStart.style.display = 'flex';
    }
}

function renderQuestion() {
    if (!quizData || !Array.isArray(quizData.analysis) || !quizData.analysis[wordIndex]) {
        startLearningCycle();
        return;
    }

    const curWord = quizData.analysis[wordIndex];
    if (!curWord || !curWord.steps) {
        startLearningCycle();
        return;
    }

    const stepKey = stepIndex.toString();
    const curStep = curWord.steps[stepKey];
    const totalSteps = Object.keys(curWord.steps).length;

    if (!curStep) {
        if (stepIndex > totalSteps) {
            showRewardPhase();
        } else {
            stepIndex = 1;
            renderQuestion();
        }
        return;
    }

    if (els.badgeLevel) els.badgeLevel.innerText = getLevelLabel(currentDatabase);
    els.badge.innerText = `LANGKAH ${stepIndex}/${totalSteps}`;

    const currentStepSignature = `${wordIndex}_${stepIndex}`;
    if (els.historyWarning) {
        if (failedStepsHistory.has(currentStepSignature)) {
            els.historyWarning.style.display = 'flex';
        } else {
            els.historyWarning.style.display = 'none';
        }
    }

    els.ctxSent.innerText = quizData.sentence || "-";
    els.ctxWord.innerText = curWord.word || "-";
    els.qText.innerHTML = curStep.question || "Pilih jawaban yang tepat:";
    els.options.innerHTML = '';
    
    const optionsList = Array.isArray(curStep.options) ? curStep.options : [];
    const shuffled = [...optionsList].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'btn-option';
        btn.innerHTML = `<span>${opt || ""}</span> <i class="ph-bold ph-caret-right" style="color: var(--ios-gray);"></i>`;
        btn.onclick = () => handleAnswer(opt, curStep);
        els.options.appendChild(btn);
    });
}

function handleAnswer(ans, data) {
    if (!data) return;

    resetModalState();

    const cleanUser = (ans || "").trim().toLowerCase();
    const cleanCorrect = (data.correct || "").trim().toLowerCase();
    const isCorrect = cleanUser === cleanCorrect;

    playSound(isCorrect);

    quizScore.total++;
    if (isCorrect) {
        quizScore.correct++;
        addAccumulatedCorrect(1);
    } else {
        quizScore.wrong++;
        failedStepsHistory.add(`${wordIndex}_${stepIndex}`);
    }
    updateScoreUI();

    const currentWordData = quizData ? quizData.analysis[wordIndex] : null;
    const totalSteps = currentWordData && currentWordData.steps ? Object.keys(currentWordData.steps).length : 1;

    if (isCorrect) {
        els.mTitle.innerText = "Benar"; 
        els.mTitle.style.color = "#000000"; 
        els.mIcon.innerHTML = '<i class="ph-fill ph-check-circle" style="color: var(--ios-green); font-size: 2rem;"></i>';
        els.mMsg.innerText = data.explanation || "Jawaban kamu tepat!"; 
        els.modal.style.display = 'flex';
        setTimeout(() => els.mCard.style.transform = 'scale(1)', 10);
        
        els.fbBtn.onclick = () => {
            closeModal(() => {
                if (stepIndex < totalSteps) {
                    stepIndex++; 
                    renderQuestion();
                } else {
                    showRewardPhase(); 
                }
            });
        };

    } else {
        els.mTitle.innerText = "Kurang Tepat"; 
        els.mTitle.style.color = "#000000"; 
        els.mIcon.innerHTML = '<i class="ph-fill ph-x-circle" style="color: var(--ios-red); font-size: 2rem;"></i>';
        els.mMsg.innerHTML = `Jawaban Benar: <b>${data.correct || "-"}</b><br><br>${data.explanation || ""}`;
        els.modal.style.display = 'flex';
        setTimeout(() => els.mCard.style.transform = 'scale(1)', 10);
        els.fbBtn.onclick = () => { 
            closeModal();
        };
    }
}

// SHOW RAPOR RESULT CARD
function showRewardPhase() {
    const userName = localStorage.getItem('mynahwu_user_name') || 'Pengguna My Nahwu';
    const userPP = localStorage.getItem('mynahwu_user_pp') || DEFAULT_AVATAR;

    if (els.rcUserName) els.rcUserName.innerText = userName;
    if (els.rcUserPP) els.rcUserPP.src = userPP;
    if (els.rcLevelVal) els.rcLevelVal.innerText = getLevelLabel(currentDatabase);
    if (els.rcCorrectVal) els.rcCorrectVal.innerText = quizScore.correct;
    if (els.rcWrongVal) els.rcWrongVal.innerText = quizScore.wrong;

    const totalAns = quizScore.correct + quizScore.wrong;
    const accPercent = totalAns > 0 ? Math.round((quizScore.correct / totalAns) * 100) : 100;
    if (els.rcAccuracyVal) els.rcAccuracyVal.innerText = `${accPercent}%`;

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    if (els.rcDate) els.rcDate.innerText = dateStr;

    updateRankUI();

    if (els.modalResult) els.modalResult.style.display = 'flex';
}

// EXPORT RESULT CARD TO PNG
function exportResultPNG() {
    const cardElement = document.getElementById('result-card-render');
    if (!cardElement || typeof html2canvas === 'undefined') {
        alert("Fitur gambar sedang disiapkan, brey!");
        return;
    }

    showToast("Mengolah Gambar PNG...");

    html2canvas(cardElement, {
        scale: 2,
        backgroundColor: "#FFFFFF",
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Rapor-MyNahwu-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast("Gambar Rapor Berhasil Diunduh!");
    }).catch(err => {
        console.error("Gagal export PNG:", err);
        showToast("Gagal mengunduh gambar");
    });
}

// --- 12. PAGE NAVIGATION ---
function switchPage(pageName) {
    document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) targetPage.classList.add('active');
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        const btnPage = btn.getAttribute('data-page');
        const iconEl = btn.querySelector('.tab-icon');
        
        if (btnPage === pageName) {
            btn.classList.add('active');
            if (iconEl && TAB_ICONS[btnPage]) iconEl.className = `tab-icon ${TAB_ICONS[btnPage].active}`;
        } else {
            btn.classList.remove('active');
            if (iconEl && TAB_ICONS[btnPage]) iconEl.className = `tab-icon ${TAB_ICONS[btnPage].inactive}`;
        }
    });

    if (pageName === 'kartu') updateRankUI();
    if (pageName === 'info') updateStorageSizeUI();
}

// --- 13. INIT APP ---
function initApp() {
    els = {
        viewStart: document.getElementById('view-start'), 
        viewLoading: document.getElementById('view-loading'), 
        viewQuiz: document.getElementById('view-quiz'),
        greetingTitle: document.getElementById('greeting-title'),
        greetingNameBold: document.getElementById('greeting-name-bold'),
        heroAvatar: document.getElementById('hero-avatar'),
        userRankPill: document.getElementById('user-rank-pill'),
        quizUserAvatar: document.getElementById('quiz-user-avatar'),
        quizUserName: document.getElementById('quiz-user-name'),
        quizUserRank: document.getElementById('quiz-user-rank'),
        userNameInput: document.getElementById('user-name-input'),
        btnSaveName: document.getElementById('btn-save-name'),
        ppUploadInput: document.getElementById('pp-upload-input'),
        btnResetPp: document.getElementById('btn-reset-pp'),
        bgUploadInput: document.getElementById('bg-upload-input'),
        btnResetBg: document.getElementById('btn-reset-bg'),
        sliderBgOpacity: document.getElementById('slider-bg-opacity'),
        valBgOpacity: document.getElementById('val-bg-opacity'),
        sliderCardBlur: document.getElementById('slider-card-blur'),
        valCardBlur: document.getElementById('val-card-blur'),
        ctxSent: document.getElementById('ctx-sentence'), 
        ctxWord: document.getElementById('ctx-word'), 
        badgeLevel: document.getElementById('badge-level'),
        badge: document.getElementById('badge-step'), 
        historyWarning: document.getElementById('history-warning'),
        scoreCorrect: document.getElementById('score-correct-val'),
        scoreWrong: document.getElementById('score-wrong-val'),
        qText: document.getElementById('question-text'), 
        options: document.getElementById('options-container'),
        modal: document.getElementById('modal-feedback'), 
        mCard: document.getElementById('modal-card'), 
        mTitle: document.getElementById('fb-title'), 
        mIcon: document.getElementById('fb-icon'), 
        mMsg: document.getElementById('fb-msg'), 
        fbBtn: document.getElementById('fb-btn'),
        fbBtnCancel: document.getElementById('fb-btn-cancel'),
        modalResult: document.getElementById('modal-result'),
        rcUserPP: document.getElementById('rc-user-pp'),
        rcUserName: document.getElementById('rc-user-name'),
        rcUserRankBadge: document.getElementById('rc-user-rank-badge'),
        rcDate: document.getElementById('rc-date'),
        rcLevelVal: document.getElementById('rc-level-val'),
        rcCorrectVal: document.getElementById('rc-correct-val'),
        rcWrongVal: document.getElementById('rc-wrong-val'),
        rcAccuracyVal: document.getElementById('rc-accuracy-val'),
        btnSharePng: document.getElementById('btn-share-png'),
        btnContinueQuiz: document.getElementById('btn-continue-quiz'),
        soundToggle: document.getElementById('sound-toggle'),
        marqueeTexts: document.querySelectorAll('.marquee-text'),
        badgePageRankTitle: document.getElementById('badge-page-rank-title'),
        badgePageScorePill: document.getElementById('badge-page-score-pill'),
        rpcBarFill: document.getElementById('rpc-bar-fill'),
        rpcNextText: document.getElementById('rpc-next-text'),
        storageSizeVal: document.getElementById('storage-size-val'),
        btnClearCache: document.getElementById('btn-clear-cache')
    };

    // Load Personalisasi & Pangkat
    loadPersonalization();

    // Listener Simpan Nama
    if (els.btnSaveName && els.userNameInput) {
        els.btnSaveName.addEventListener('click', () => {
            const val = els.userNameInput.value.trim();
            localStorage.setItem('mynahwu_user_name', val);
            updateGreetingUI(val);
            showToast("Nama berhasil disimpan");
        });
    }

    // Listener Upload Foto Profil (PP)
    if (els.ppUploadInput) {
        els.ppUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    applyUserPP(event.target.result, true);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Listener Reset PP
    if (els.btnResetPp) {
        els.btnResetPp.addEventListener('click', () => {
            applyUserPP(DEFAULT_AVATAR, true);
        });
    }

    // Listener Sliders
    if (els.sliderBgOpacity) {
        els.sliderBgOpacity.addEventListener('input', (e) => applyBgOpacity(e.target.value, false));
        els.sliderBgOpacity.addEventListener('change', (e) => applyBgOpacity(e.target.value, true));
    }

    if (els.sliderCardBlur) {
        els.sliderCardBlur.addEventListener('input', (e) => applyCardBlur(e.target.value, false));
        els.sliderCardBlur.addEventListener('change', (e) => applyCardBlur(e.target.value, true));
    }

    // Listener Colors Accent
    document.querySelectorAll('.color-dot').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const color = e.currentTarget.getAttribute('data-color');
            if (color) applyAccentColor(color, true);
        });
    });

    // Listener Upload Background HP
    if (els.bgUploadInput) {
        els.bgUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => applyBackground(event.target.result, true);
                reader.readAsDataURL(file);
            }
        });
    }

    // Listener Reset Background
    if (els.btnResetBg) {
        els.btnResetBg.addEventListener('click', () => applyBackground('default', true));
    }

    // Listener Presets Gradient
    document.querySelectorAll('.preset-dot').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bgVal = e.currentTarget.getAttribute('data-bg');
            if (bgVal) applyBackground(bgVal, true);
        });
    });

    // Listener Reset Cache & Reset Data
    if (els.btnClearCache) {
        els.btnClearCache.addEventListener('click', () => {
            showConfirmModal(
                'Hapus Cache & Reset?',
                'Semua foto profil, wallpaper, dan data poin tersimpan akan dihapus bersih.',
                () => {
                    localStorage.clear();
                    location.reload();
                }
            );
        });
    }

    // Listener Unduh PNG Rapor
    if (els.btnSharePng) {
        els.btnSharePng.addEventListener('click', exportResultPNG);
    }

    // Listener Lanjut Belajar
    if (els.btnContinueQuiz) {
        els.btnContinueQuiz.addEventListener('click', () => {
            if (els.modalResult) els.modalResult.style.display = 'none';
            if (quizData && quizData.analysis && wordIndex < quizData.analysis.length - 1) {
                wordIndex++; 
                stepIndex = 1; 
                renderQuestion();
            } else {
                startLearningCycle();
            }
        });
    }

    document.getElementById('btn-start').addEventListener('click', startLearningCycle);
    
    // NATIVE CONFIRMATION ALERT UNTUK TOMBOL KEMBALI
    document.getElementById('btn-back-home').addEventListener('click', () => {
        showConfirmModal(
            'Keluar dari Soal?',
            'Progres pengerjaan soal saat ini akan hilang.',
            () => {
                els.viewQuiz.style.display = 'none';
                els.viewStart.style.display = 'flex';
                quizData = null;
                wordIndex = 0;
                stepIndex = 1;
                quizScore = { correct: 0, wrong: 0, total: 0 };
                failedStepsHistory.clear();
            }
        );
    });
    
    document.querySelectorAll('.ios-grid-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.ios-grid-item').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentDatabase = target.getAttribute('data-db');
        });
    });
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            if (page) switchPage(page);
        });
    });
    
    if (els.marqueeTexts && els.marqueeTexts.length > 0) {
        els.marqueeTexts[0].addEventListener('animationiteration', () => {
            dawuhIndex = (dawuhIndex + 1) % DAWUH_PLAYLIST.length;
            updateMarquee(DAWUH_PLAYLIST[dawuhIndex]);
        });
    }
}

if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', initApp); 
} else { 
    initApp(); 
}
