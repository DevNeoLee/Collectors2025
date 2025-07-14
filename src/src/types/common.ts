// Firebase user type
export interface UserData {
  displayName: string | null;
  email: string | null;
  createdAt?: Date;
  [key: string]: any;
}

// Product related types
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

// Cart related types
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

// User related types
export interface UserState {
  currentUser: UserData | null;
}

// Directory related types
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

// Root state type (inferred from store)
export interface RootState {
  user: UserState;
  cart: CartState;
  shop: ShopState;
  directory: DirectoryState;
}

// Component Props types
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