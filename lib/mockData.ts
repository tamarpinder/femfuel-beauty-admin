export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar: string;
  status: 'Activo' | 'Suspendido';
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  preferredServices: string[];
}

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  address: string;
  avatar: string;
  status: 'Activo' | 'Pendiente' | 'Suspendido';
  joinDate: string;
  verified: boolean;
  rating: number;
  totalBookings: number;
  monthlyRevenue: number;
  services: string[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  vendorId: string;
  description: string;
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  vendorId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'Confirmada' | 'Pendiente' | 'Completada' | 'Cancelada';
  totalAmount: number;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  vendorId: string;
  description: string;
  image: string;
  status: 'Disponible' | 'Agotado' | 'Descontinuado';
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'María González',
    email: 'maria@email.com',
    phone: '+1 809 555 0101',
    city: 'Santo Domingo',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2024-01-15',
    totalBookings: 12,
    totalSpent: 3450,
    preferredServices: ['Corte de Cabello', 'Manicure', 'Facial']
  },
  {
    id: 'user-002',
    name: 'Ana Martínez',
    email: 'ana@email.com',
    phone: '+1 809 555 0102',
    city: 'Santiago',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2024-02-20',
    totalBookings: 8,
    totalSpent: 2180,
    preferredServices: ['Spa', 'Masajes', 'Pedicure']
  },
  {
    id: 'user-003',
    name: 'Carmen López',
    email: 'carmen@email.com',
    phone: '+1 809 555 0103',
    city: 'La Romana',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2024-03-10',
    totalBookings: 15,
    totalSpent: 4200,
    preferredServices: ['Maquillaje', 'Uñas', 'Depilación']
  },
  {
    id: 'user-004',
    name: 'Sofia Rodríguez',
    email: 'sofia@email.com',
    phone: '+1 809 555 0104',
    city: 'Puerto Plata',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2024-01-05',
    totalBookings: 20,
    totalSpent: 5680,
    preferredServices: ['Corte', 'Coloración', 'Tratamientos']
  },
  {
    id: 'user-005',
    name: 'Isabella Santos',
    email: 'isabella@email.com',
    phone: '+1 809 555 0105',
    city: 'Santo Domingo',
    avatar: '/placeholder.svg',
    status: 'Suspendido',
    joinDate: '2024-04-01',
    totalBookings: 3,
    totalSpent: 890,
    preferredServices: ['Manicure']
  }
];

// Mock Vendors Data
export const mockVendors: Vendor[] = [
  {
    id: 'vendor-001',
    name: 'Rosa María Fernández',
    businessName: 'Beauty Studio Rosa',
    email: 'rosa@beautystudio.com',
    phone: '+1 809 555 0201',
    businessType: 'Salón de Belleza',
    city: 'Santo Domingo',
    address: 'Av. Winston Churchill 1205, Ensanche Piantini',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2023-09-15',
    verified: true,
    rating: 4.8,
    totalBookings: 245,
    monthlyRevenue: 32500,
    services: ['Corte', 'Coloración', 'Peinados', 'Tratamientos']
  },
  {
    id: 'vendor-002',
    name: 'Carlos Mendoza',
    businessName: 'Spa Relax Total',
    email: 'carlos@sparelax.com',
    phone: '+1 809 555 0202',
    businessType: 'Spa',
    city: 'Santiago',
    address: 'Calle del Sol 45, Centro Histórico',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2023-11-20',
    verified: true,
    rating: 4.9,
    totalBookings: 189,
    monthlyRevenue: 28900,
    services: ['Masajes', 'Faciales', 'Aromaterapia', 'Reflexología']
  },
  {
    id: 'vendor-003',
    name: 'Miguel Torres',
    businessName: 'Barbería El Corte',
    email: 'miguel@elcorte.com',
    phone: '+1 809 555 0203',
    businessType: 'Barbería',
    city: 'La Romana',
    address: 'Calle Libertad 89, Centro',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2023-08-10',
    verified: true,
    rating: 4.7,
    totalBookings: 156,
    monthlyRevenue: 18750,
    services: ['Corte Masculino', 'Afeitado', 'Barba', 'Bigote']
  },
  {
    id: 'vendor-004',
    name: 'Lucía Jiménez',
    businessName: 'Nails Art Studio',
    email: 'lucia@nailsart.com',
    phone: '+1 809 555 0204',
    businessType: 'Uñas',
    city: 'Puerto Plata',
    address: 'Plaza Dorada Local 12',
    avatar: '/placeholder.svg',
    status: 'Activo',
    joinDate: '2023-12-05',
    verified: true,
    rating: 4.6,
    totalBookings: 198,
    monthlyRevenue: 22400,
    services: ['Manicure', 'Pedicure', 'Nail Art', 'Extensiones']
  },
  {
    id: 'vendor-005',
    name: 'Patricia Morales',
    businessName: 'Glamour Express',
    email: 'patricia@glamour.com',
    phone: '+1 809 555 0205',
    businessType: 'Maquillaje',
    city: 'Santo Domingo',
    address: 'Av. 27 de Febrero 1442, Mirador Sur',
    avatar: '/placeholder.svg',
    status: 'Pendiente',
    joinDate: '2024-08-20',
    verified: false,
    rating: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    services: ['Maquillaje Social', 'Maquillaje Novias', 'Cejas']
  }
];

// Mock Services Data
export const mockServices: Service[] = [
  { id: 'service-001', name: 'Corte de Cabello Femenino', category: 'Cabello', price: 1200, duration: 45, vendorId: 'vendor-001', description: 'Corte personalizado con lavado y secado', available: true },
  { id: 'service-002', name: 'Coloración Completa', category: 'Cabello', price: 2500, duration: 120, vendorId: 'vendor-001', description: 'Coloración profesional con productos de calidad', available: true },
  { id: 'service-003', name: 'Peinado para Eventos', category: 'Cabello', price: 1800, duration: 60, vendorId: 'vendor-001', description: 'Peinado elegante para ocasiones especiales', available: true },
  { id: 'service-004', name: 'Masaje Relajante', category: 'Spa', price: 2000, duration: 60, vendorId: 'vendor-002', description: 'Masaje completo con aceites aromáticos', available: true },
  { id: 'service-005', name: 'Facial Hidratante', category: 'Spa', price: 1500, duration: 45, vendorId: 'vendor-002', description: 'Tratamiento facial profundo para hidratar la piel', available: true },
  { id: 'service-006', name: 'Corte Masculino Clásico', category: 'Cabello', price: 800, duration: 30, vendorId: 'vendor-003', description: 'Corte tradicional con acabado profesional', available: true },
  { id: 'service-007', name: 'Afeitado Tradicional', category: 'Afeitado', price: 600, duration: 25, vendorId: 'vendor-003', description: 'Afeitado con navaja y toallas calientes', available: true },
  { id: 'service-008', name: 'Manicure Francesa', category: 'Uñas', price: 900, duration: 40, vendorId: 'vendor-004', description: 'Manicure clásico con acabado francés', available: true },
  { id: 'service-009', name: 'Pedicure Spa', category: 'Uñas', price: 1100, duration: 50, vendorId: 'vendor-004', description: 'Pedicure completo con exfoliación y masaje', available: true },
  { id: 'service-010', name: 'Nail Art Personalizado', category: 'Uñas', price: 1300, duration: 60, vendorId: 'vendor-004', description: 'Diseños únicos y personalizados en uñas', available: true }
];

// Mock Bookings Data
export const mockBookings: Booking[] = [
  {
    id: 'booking-001',
    userId: 'user-001',
    vendorId: 'vendor-001',
    serviceId: 'service-001',
    date: '2024-09-08',
    time: '10:00',
    status: 'Completada',
    totalAmount: 1200,
    notes: 'Corte moderno, cliente muy satisfecha'
  },
  {
    id: 'booking-002',
    userId: 'user-002',
    vendorId: 'vendor-002',
    serviceId: 'service-004',
    date: '2024-09-09',
    time: '14:30',
    status: 'Confirmada',
    totalAmount: 2000
  },
  {
    id: 'booking-003',
    userId: 'user-003',
    vendorId: 'vendor-004',
    serviceId: 'service-008',
    date: '2024-09-07',
    time: '11:00',
    status: 'Completada',
    totalAmount: 900,
    notes: 'Manicure perfecta como siempre'
  },
  {
    id: 'booking-004',
    userId: 'user-001',
    vendorId: 'vendor-002',
    serviceId: 'service-005',
    date: '2024-09-10',
    time: '16:00',
    status: 'Pendiente',
    totalAmount: 1500
  },
  {
    id: 'booking-005',
    userId: 'user-004',
    vendorId: 'vendor-001',
    serviceId: 'service-002',
    date: '2024-09-06',
    time: '09:30',
    status: 'Completada',
    totalAmount: 2500,
    notes: 'Coloración rubia, excelente resultado'
  }
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: 'product-001',
    name: 'Shampoo Hidratante Premium',
    category: 'Cuidado Capilar',
    brand: 'L\'Oreal Professional',
    price: 850,
    stock: 24,
    vendorId: 'vendor-001',
    description: 'Shampoo profesional para cabello seco y dañado',
    image: '/placeholder.svg',
    status: 'Disponible'
  },
  {
    id: 'product-002',
    name: 'Aceite de Argan Puro',
    category: 'Tratamientos',
    brand: 'Moroccanoil',
    price: 1200,
    stock: 8,
    vendorId: 'vendor-002',
    description: 'Aceite nutritivo para masajes corporales',
    image: '/placeholder.svg',
    status: 'Disponible'
  },
  {
    id: 'product-003',
    name: 'Kit de Afeitado Clásico',
    category: 'Afeitado',
    brand: 'The Art of Shaving',
    price: 2500,
    stock: 12,
    vendorId: 'vendor-003',
    description: 'Kit completo con crema, brocha y aftershave',
    image: '/placeholder.svg',
    status: 'Disponible'
  },
  {
    id: 'product-004',
    name: 'Esmalte Gel UV Collection',
    category: 'Esmaltes',
    brand: 'OPI',
    price: 450,
    stock: 0,
    vendorId: 'vendor-004',
    description: 'Colección de esmaltes gel de larga duración',
    image: '/placeholder.svg',
    status: 'Agotado'
  },
  {
    id: 'product-005',
    name: 'Base de Maquillaje HD',
    category: 'Maquillaje',
    brand: 'MAC Cosmetics',
    price: 1800,
    stock: 15,
    vendorId: 'vendor-005',
    description: 'Base líquida de alta definición para todo tipo de piel',
    image: '/placeholder.svg',
    status: 'Disponible'
  }
];

// Helper functions for data manipulation
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getVendorById = (id: string): Vendor | undefined => {
  return mockVendors.find(vendor => vendor.id === id);
};

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id);
};

export const getBookingsByUserId = (userId: string): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId);
};

export const getBookingsByVendorId = (vendorId: string): Booking[] => {
  return mockBookings.filter(booking => booking.vendorId === vendorId);
};

export const getServicesByVendorId = (vendorId: string): Service[] => {
  return mockServices.filter(service => service.vendorId === vendorId);
};

export const getProductsByVendorId = (vendorId: string): Product[] => {
  return mockProducts.filter(product => product.vendorId === vendorId);
};

// Statistics helpers
export const getTotalRevenue = (): number => {
  return mockBookings
    .filter(booking => booking.status === 'Completada')
    .reduce((total, booking) => total + booking.totalAmount, 0);
};

export const getMonthlyRevenue = (): number => {
  const currentMonth = new Date().getMonth();
  return mockBookings
    .filter(booking => {
      const bookingMonth = new Date(booking.date).getMonth();
      return booking.status === 'Completada' && bookingMonth === currentMonth;
    })
    .reduce((total, booking) => total + booking.totalAmount, 0);
};