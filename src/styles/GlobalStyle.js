// NOTE: No IE browsers support
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
    }
    *, ::before, ::after { 
        box-sizing: border-box; 
    }
    body {
      min-height: 100vh;
      min-height: -webkit-fill-available;
      position: relative;
    }
    html {
      height: -webkit-fill-available;
      scroll-behavior: smooth;
    }
    input {
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
    // required by tsParticle 
    #tsparticles {
      width: 100%;
      height: 100%;
    }
`
