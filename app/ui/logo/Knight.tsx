import styles from './KnightLogo.module.css';

export default function Knight() {
  return (
      <svg className={styles.logo} zoomAndPan="magnify" viewBox="0 0 375 374.999991" preserveAspectRatio="xMidYMid meet" version="1.0">

        {/* outline */}
        <path 
          d="M 107.570312 370.355469 C 100.828125 366.992188 99.828125 347.148438 105.546875 330.335938 C 110.433594 315.964844 116.074219 308.371094 137.636719 287.132812 C 157.058594 268 162.234375 261.703125 168.277344 249.835938 C 175.492188 235.671875 178.335938 224.464844 179.09375 207.234375 C 179.363281 201.15625 179.378906 196.179688 179.132812 196.179688 C 178.890625 196.179688 174.796875 198.558594 170.039062 201.464844 C 165.28125 204.375 154.574219 210.214844 146.242188 214.445312 C 114.617188 230.5 109.652344 235.214844 95.539062 262.582031 C 92.917969 267.667969 89.09375 273.96875 87.039062 276.585938 C 80.460938 284.96875 69.878906 291.304688 62.460938 291.304688 C 59.296875 291.304688 53.496094 289.125 50.421875 286.78125 C 48.988281 285.6875 47.140625 283.292969 46.3125 281.457031 C 44.949219 278.433594 44.4375 278.0625 40.933594 277.546875 C 16.976562 274.015625 -0.0078125 253.175781 1.875 229.632812 C 3.085938 214.496094 9.894531 199.359375 27.027344 173.75 C 38.75 156.222656 43.515625 147.722656 46.78125 138.503906 C 48.476562 133.722656 48.671875 131.59375 48.707031 117.742188 L 48.742188 102.304688 L 51.445312 96.597656 C 53.695312 91.84375 56.066406 88.988281 65.648438 79.492188 C 71.972656 73.222656 78.238281 66.476562 79.566406 64.503906 L 81.984375 60.914062 L 80.15625 37.800781 C 77.628906 5.941406 77.625 6.023438 82.804688 3.84375 C 86.332031 2.363281 86.164062 2.28125 112.839844 18.332031 C 125.148438 25.734375 135.503906 31.792969 135.851562 31.792969 C 136.199219 31.792969 142.792969 25.042969 150.503906 16.792969 C 162.117188 4.359375 165.015625 1.699219 167.410156 1.246094 C 172.507812 0.292969 173.714844 1.996094 184.085938 24.796875 L 193.59375 45.691406 L 198.769531 44.933594 C 206.203125 43.84375 224.304688 44.804688 233.703125 46.785156 C 250.769531 50.382812 267.71875 57.722656 281.4375 67.457031 C 290.601562 73.953125 305.351562 88.875 312.183594 98.546875 C 326.9375 119.449219 337.636719 142.84375 347.4375 175.667969 C 364.273438 232.023438 374.644531 297.929688 374.921875 350.316406 C 375.007812 366.8125 374.96875 367.222656 373.109375 369.089844 L 371.207031 371 L 240.433594 371.199219 C 137.253906 371.359375 109.21875 371.179688 107.574219 370.359375 Z M 107.570312 370.355469 "
          fillOpacity="1" 
          fillRule="nonzero"
        />
        
        {/* back ear */}
        <path 
          d="M 108.050781 32.496094 C 100.671875 28.0625 94.523438 24.539062 94.394531 24.664062 C 94.265625 24.789062 94.609375 30.898438 95.15625 38.238281 L 96.15625 51.578125 L 108.816406 46.066406 L 121.472656 40.558594 Z M 108.050781 32.496094 " 
          fill="#739851" 
          fillOpacity="1" 
          fillRule="nonzero"
        />
        
        {/* body */}
        <path 
          d="M 360.929688 355.9375 C 363.339844 353.527344 363.339844 353.421875 360.746094 320.511719 C 355.90625 259.027344 340.910156 186.675781 324.347656 144.863281 C 319.496094 132.617188 310.25 115.113281 303.847656 106.058594 C 290.113281 86.628906 269.695312 70.714844 248.929688 63.257812 C 236.472656 58.785156 226.828125 57.238281 211.867188 57.316406 C 202.921875 57.363281 195.914062 57.839844 191.871094 58.679688 C 188.445312 59.394531 185.203125 59.808594 184.671875 59.601562 C 184.140625 59.398438 180.773438 52.777344 177.195312 44.886719 C 173.617188 36.996094 169.757812 28.503906 168.617188 26.007812 L 166.542969 21.472656 L 153.53125 34.910156 L 140.523438 48.34375 L 117.855469 58.101562 L 95.1875 67.855469 L 89.71875 75.175781 C 86.714844 79.199219 80.484375 85.972656 75.875 90.226562 C 63.5 101.644531 63.765625 101.027344 63.695312 118.578125 C 63.640625 131.144531 63.375 134.050781 61.769531 139.4375 C 58.613281 150.058594 51.574219 163.320312 39.632812 181.160156 C 26.535156 200.726562 19.722656 213.738281 17.773438 222.890625 C 16.121094 230.671875 16.609375 240.390625 18.910156 245.515625 C 22.96875 254.5625 32.953125 261.742188 42.746094 262.65625 L 48.105469 263.15625 L 53.695312 255.746094 C 56.769531 251.667969 60.101562 247.875 61.101562 247.320312 C 65.144531 245.066406 69.496094 246.496094 71.246094 250.65625 C 72.714844 254.15625 71.984375 255.84375 64.894531 265.277344 C 61.6875 269.550781 59.179688 273.679688 59.328125 274.457031 C 59.8125 277.011719 64.996094 276.714844 68.871094 273.910156 C 74.234375 270.023438 77.808594 265.015625 85.082031 251.203125 C 88.8125 244.117188 93.496094 236.03125 95.488281 233.234375 C 103.144531 222.496094 114.6875 214.136719 138.722656 201.921875 C 162.371094 189.902344 183.285156 176.566406 189.457031 169.570312 C 196.734375 161.316406 199.820312 151.695312 199.097656 139.492188 C 198.554688 130.351562 199.480469 127.621094 203.597656 126.183594 C 205.6875 125.457031 206.792969 125.539062 208.988281 126.578125 C 212.476562 128.234375 213.558594 131.113281 214.132812 140.296875 C 215.015625 154.320312 208.734375 170.878906 198.636719 181.148438 L 193.089844 186.789062 L 193.765625 192.113281 C 194.765625 200.03125 193.761719 218.050781 191.839844 226.636719 C 188.054688 243.554688 180.933594 259.667969 171.613281 272.402344 C 168.851562 276.175781 158.542969 287.199219 148.472656 297.148438 C 130.503906 314.898438 125.308594 321.183594 121.222656 330.105469 C 118.625 335.785156 116.773438 344.511719 116.753906 351.179688 L 116.742188 356.394531 L 234.765625 356.394531 C 312.546875 356.394531 352.964844 356.679688 353.304688 357.226562 C 354.316406 358.859375 358.761719 358.109375 360.929688 355.9375 Z M 360.929688 355.9375 " 
          fill="#739851" 
          fillOpacity="1" 
          fillRule="nonzero"
        />
        
        {/* eye */}
        <path 
          d="M 74.25 135.132812 C 78.023438 128.023438 88.910156 110.511719 91.121094 107.992188 C 95.621094 102.867188 102.59375 100.671875 107.929688 102.699219 C 109.105469 103.148438 110.070312 104 110.070312 104.597656 C 110.070312 107.195312 103.300781 116.996094 97.53125 122.753906 C 92.769531 127.507812 89.542969 129.867188 84.179688 132.515625 C 80.292969 134.4375 76.230469 136.253906 75.160156 136.550781 C 73.335938 137.054688 73.277344 136.964844 74.25 135.132812 Z M 74.25 135.132812 " 
          fill="#000000" 
          fillOpacity="1" 
          fillRule="nonzero"
        />
        
        {/* nostril: */}
        <path 
          d="M 22.617188 237.371094 C 22.933594 230.757812 23.460938 228.074219 25.179688 224.316406 C 27.457031 219.347656 31.171875 216.21875 34.800781 216.210938 C 39.496094 216.203125 44.148438 220.894531 44.148438 225.640625 C 44.148438 229.238281 40.546875 233.109375 31.304688 239.453125 L 22.214844 245.695312 L 22.613281 237.371094 Z M 22.617188 237.371094 " 
          fill="#000000" 
          fillOpacity="1" 
          fillRule="nonzero"
        />
        
      </svg>
  );
}


