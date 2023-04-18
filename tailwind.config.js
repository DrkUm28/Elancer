module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        'mytheme': {                          /* your theme name */
           'primary' : '#3583AF',           /* Primary color */
           'primary-focus' : '#177DAA',     /* Primary color - focused */
           'primary-content' : '#E3F4F9',   /* Foreground content color to use on primary color */

           'secondary' : '#2D9E90',         /* Secondary color */
           'secondary-focus' : '#158978',   /* Secondary color - focused */
           'secondary-content' : '#E3F4F9', /* Foreground content color to use on secondary color */

           'accent' : '#9571AC',            /* Accent color */
           'accent-focus' : '#9062A9',      /* Accent color - focused */
           'accent-content' : '#E3F4F9',    /* Foreground content color to use on accent color */

           'neutral' : '#15202B',           /* Neutral color */
           'neutral-focus' : '#090F14',     /* Neutral color - focused */
           'neutral-content' : '#E3F4F9',   /* Foreground content color to use on neutral color */

           'base-100' : '#3C4C64',          /* Base color of page, used for blank backgrounds #283241 */
           'base-200' : '#151B23',          /* Base color, a little darker */
           'base-300' : '#090C11',          /* Base color, even more darker */
           'base-content' : '#E3F4F9',      /* Foreground content color to use on base color */

           'info' : '#D7E5E7',              /* Info */
           'success' : '#7FB85D',           /* Success */
           'warning' : '#D1AD52',           /* Warning */
           'error' : '#C95057',             /* Error */
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },

}