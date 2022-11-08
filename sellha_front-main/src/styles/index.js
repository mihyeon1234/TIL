import { createGlobalStyle } from 'styled-components';

export function isPC() {
  const pc = ['win16', 'win32', 'win64', 'mac', 'macintel'];

  if (pc.indexOf(navigator.platform.toLowerCase()) < 0) {
    return false;
  }
  return true;
}

const size = {
  small: '770px',
  medium: '1220px',
  large: '1700px',
};

const colors = {
  primary: '#FFDA4F',
  success: '#20C239',
  warning: '#FACA22',
  danger: '#E5503C',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#EBEBEB',
  lineGray: '#F2F2F2',
  gray: '#D9D9D9',
  darkGray: '#7F7F7F',
  lightYellow: '#ffda4f80',
  orange: '#FFC83A',
  lightOrange: '#ffcd50',
  blue: '#5278da99',
  oceanBlue: '#0077d7',
  green: '#00ae0099',
  yellow: '#f8cc5e',
  dashColor: '#747474',
};

const theme = {
  ...colors,
  colors,
  mobile: `(max-width: ${size.small})`,
  tablet: `(max-width: ${size.medium})`,
  laptop: `(max-width: 1440px)`,
  desktop: `(max-width: ${size.large})`,
};

const GlobalStyle = createGlobalStyle`

  * { font-family: 'Spoqa Han Sans Neo', sans-serif; }


  body {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.colors.white};
  }

  .swal2-shown { 
    padding-right: 0px !important; 
    overflow: unset !important;
  }

  a, a:link, a:visited, a:focus {
    color: #000000;
    text-decoration: none;
    font-weight: 400;
  }

  a:hover {
    color: #7F7F7F;
  }

  a,
  a:link,
  a:hover,
  a:active,
  a:visited {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    height: auto; // 높이 초기화
    line-height: normal; // line-height 초기화
    /* border-radius: 0; */
    outline: none;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  button,
  input[type="submit"],
  input[type="button"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    border: none;
    outline: 0;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }

  button:active,
  button:hover,
  button:focus,
  input[type="submit"]:active,
  input[type="submit"]:hover,
  input[type="submit"]:focus,
  input[type="button"]:active,
  input[type="button"]:hover,
  input[type="button"]:focus {
    background-color: ${(props) => props.theme.colors.primary};
    outline: 0;
  }

  .ant-popover.ant-popover-placement-bottom  {
    left: 141px !important;
    top: 172px !important;
  }

  .ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow {
    left: 54%;
    transform: translateX(-50%) rotate(45deg);
  }

  div.ant-popover-content > div.ant-popover-arrow {
    border: 1px solid ${(props) => props.theme.colors.gray};
    background-color: #ffffff !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    border-top-color: ${(props) => props.theme.colors.gray} !important;
    border-left-color: ${(props) => props.theme.colors.gray} !important;
    box-shadow: none !important;
    top: 4px !important;
  }

  .ant-popover-arrow {
    width: 12px !important;
    height: 12px !important;
  }

  .ant-popover-placement-leftBottom > .ant-popover-content > .ant-popover-arrow  {
    transform: translateY(350%) rotate(45deg);
    border-top-color: ${(props) => props.theme.colors.white} !important;
    border-left-color: ${(props) => props.theme.colors.white} !important;
  }

  .ant-popover-inner {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.gray};
    border-radius: 0.5em;
  }

  .ant-popover-inner-content {
    padding: 0;
  }

  .ant-drawer-body > a,
  .ant-drawer-body > a:link,
  .ant-drawer-body > a:focus,
  .ant-drawer-body > a:visited {
    color: ${(props) => props.theme.colors.white};
    font-size: 17px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    margin-bottom: 15px;
  }

  .ant-tooltip-inner {
    box-shadow: none;
    background-color: ${(props) => props.theme.colors.darkGray};
  }

  /* 테이블 progress bar 사용을 위한 header 크기 통일 */
  .ant-table-header > table {
    height: 72px;
  }
  
  .ant-table-thead tr, 
  .ant-table-tbody tr {
    height: 72px;
  }

  .ant-table-filter-dropdown {
    /* width: 130px; */
    .ant-dropdown-menu-item {
      font-size: 12px;
      padding: 3px 12px;
    }
  }

  .ant-btn-sm {
    font-size: 12px;
  }

  .ant-select-item-option-content {
    font-size: 0.9em;
    margin-left: 0.35em;
    :hover {
      /* font-weight: 600; */
      color: ${(props) => props.theme.colors.orange};
    }
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    color: ${(props) => props.theme.colors.orange};
    font-weight: 500;
    font-size: 0.9em;
  }
  
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: ${(props) => props.theme.colors.lineGray};
  }

  .row-dragging {
    background: transparent;
  }

  .row-dragging td {
    font-size: 0.85em;
    background: transparent;
    visibility: hidden;
  }

  .row-dragging .drag-visible {
    visibility: visible;
  }

  .ant-modal-content > .ant-modal-close {
    background-color: transparent;
  }
  .ant-popover-placement-bottom, .ant-popover-placement-bottomLeft, .ant-popover-placement-bottomRight{
    position: fixed;
  }
  .ant-input-number-input-wrap,.ant-input-number, .ant-input-number-input {
    transition: none;
  }
  .ant-input-number-input-wrap,.ant-input-number, .ant-input-number-input ,.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,.ant-tabs-tab-btn,.ant-btn{
    transition: none;
  }
  .ant-form-item {
    border: none;
    box-shadow: none;
  }
  .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus {
    box-shadow: none;
  }
  .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    border-color: black;
  }
  

  .swal2-popup .swal2-styled:focus {
    box-shadow: none !important;
  }

  .swal2-popup{
    padding: 0 0 2.25em;
  }

  .swal2-html-container{
    margin: 2em 1.6em 0.3em;
  }

  .swal2-styled.swal2-cancel,
  .swal2-styled.swal2-confirm{
    min-width: 125px;
    margin: 5px 15px;
  }

  .swal2-styled.swal2-confirm{
    background-color: ${(props) => props.theme.colors.orange};

    &:hover{
      background-color: ${(props) => props.theme.colors.primary};
      background-image: unset!important;
    }
  }

  .swal2-styled.swal2-cancel{
    background-color: ${(props) => props.theme.colors.gray};
  }
`;

export { theme, GlobalStyle };
