// Firebase 사용자 타입
export interface UserData {
  displayName: string | null;
  email: string | null;
  createdAt?: Date;
  [key: string]: any;
}

// 상품 관련 타입
export interface ShopItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface ShopCollection {
  id: number;
  title: string;
  subtitle: string;
  routeName: string;
  items: ShopItem[];
}

export interface ShopState {
  collections: { [key: string]: ShopCollection };
}

// 장바구니 관련 타입
export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

export interface CartState {
  hidden: boolean;
  cartProducts: CartItem[];
}

// 사용자 관련 타입
export interface UserState {
  currentUser: UserData | null;
}

// 디렉토리 관련 타입
export interface DirectoryItem {
  id: number;
  title: string;
  imageUrl: string;
  size?: string;
  linkUrl: string;
}

export interface DirectoryState {
  sections: DirectoryItem[];
}

// 루트 상태 타입 (store에서 추론됨)
export interface RootState {
  user: UserState;
  cart: CartState;
  shop: ShopState;
  directory: DirectoryState;
}

// 컴포넌트 Props 타입들
export interface CategoryProps {
  id: number;
  title: string;
  subtitle: string;
  routeName: string;
  items: ShopItem[];
}

export interface ProductProps {
  item: ShopItem;
}

export interface CartItemProps {
  item: CartItem;
}

export interface FormInputProps {
  type: string;
  name: string;
  value: string;
  required?: boolean;
  label?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormButtonProps {
  type: 'button' | 'submit';
  children: React.ReactNode;
  onClick?: () => void;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
} 