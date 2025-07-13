// SCSS 모듈 타입 선언
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// 이미지 파일 타입 선언
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// FontAwesome 타입 선언
declare module '@fortawesome/react-fontawesome' {
  import { ComponentType } from 'react';
  
  interface FontAwesomeIconProps {
    icon: any;
    size?: string;
    className?: string;
    [key: string]: any;
  }
  
  const FontAwesomeIcon: ComponentType<FontAwesomeIconProps>;
  export { FontAwesomeIcon };
}

declare module '@fortawesome/free-solid-svg-icons' {
  export const fas: any;
  export const faChevronCircleLeft: any;
  export const faChevronCircleRight: any;
  export const faAngleDoubleLeft: any;
  export const faAngleDoubleRight: any;
}

// React Icons 타입 선언
declare module 'react-icons/gi' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: number | string;
    className?: string;
    [key: string]: any;
  }
  
  export const GiShoppingCart: ComponentType<IconProps>;
}

// Stripe 타입 선언
declare module 'react-stripe-checkout' {
  import { ComponentType } from 'react';
  
  interface StripeCheckoutProps {
    label?: string;
    name?: string;
    billingAddress?: boolean;
    shippingAddress?: boolean;
    image?: string;
    description?: string;
    amount?: number;
    panelLabel?: string;
    token: (token: any) => void;
    stripeKey: string;
    [key: string]: any;
  }
  
  const StripeCheckout: ComponentType<StripeCheckoutProps>;
  export default StripeCheckout;
} 