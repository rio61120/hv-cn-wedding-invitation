import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';

const siteUrl = 'https://hv-cn-wedding-invitation.vercel.app';
const title = 'Hoàng Việt & Cẩm Nhung | Thiệp cưới 29.11.2026';
const description = 'Trân trọng kính mời bạn đến chung vui cùng Hoàng Việt & Cẩm Nhung ngày 29.11.2026.';
const ogImage = '/og-image.jpg';
const waxSeal = '/assets/decor/decor_wax_seal_vn.png';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: waxSeal, type: 'image/png', sizes: '512x512' }],
    apple: [{ url: waxSeal }],
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Hoàng Việt & Cẩm Nhung',
    title,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Ảnh cưới của Hoàng Việt và Cẩm Nhung' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#680D1B',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#121212] text-[#1A1A1A] antialiased selection:bg-[#8B1E2E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
