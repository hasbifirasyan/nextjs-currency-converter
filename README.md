# 💱 Currency Converter

A modern, real-time currency converter built with Next.js 16, featuring a beautiful dark/light mode interface and live exchange rates.

## 🚀 Live Demo

[View Live Demo](https://currency-converter-hasbi.vercel.app/) • [Report Bug](https://github.com/hasbifirasyan/nextjs-currency-converter/issues)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This project was created to provide a fast, reliable, and user-friendly currency conversion tool. With support for 20+ major currencies and real-time exchange rates, it's perfect for travelers, traders, or anyone who needs quick currency conversions.

### Why I Built This

- **Learning Goal**: To master Next.js 15 with TypeScript and modern React patterns
- **Real-World Application**: Currency conversion is a common need that showcases API integration
- **UI/UX Focus**: Practice building responsive, accessible interfaces with Tailwind CSS
- **State Management**: Implement efficient client-side state with Zustand

## ✨ Features

- 🔄 **Real-time Exchange Rates** - Live data from ExchangeRate-API
- 🌓 **Dark/Light Mode** - Persistent theme with smooth transitions
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Instant Conversion** - Updates automatically as you type
- 🔁 **Currency Swap** - Quick button to flip currencies
- 💾 **Local Storage** - Remembers your theme preference
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🚀 **Fast Performance** - Optimized with Next.js and efficient state management

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[React 19](https://react.dev/)** - Latest React features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### API
- **[ExchangeRate-API](https://exchangerate-api.com/)** - Free currency exchange rates

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-currency-converter.git
   cd nextjs-currency-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Enter Amount**: Type the amount you want to convert
2. **Select Currencies**: Choose source and target currencies from the dropdowns
3. **View Result**: The conversion happens automatically
4. **Swap Currencies**: Click the swap button to flip currencies
5. **Toggle Theme**: Use the 🌙/☀️ button to switch between dark and light modes

### Supported Currencies

USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD, MXN, SGD, HKD, NOK, TRY, ZAR, BRL, INR, KRW, IDR

## 🔌 API Reference

This app uses the [ExchangeRate-API](https://exchangerate-api.com/) for live exchange rates:

```
GET https://api.exchangerate-api.com/v4/latest/{base_currency}
```

**Response:**
```json
{
  "base": "USD",
  "date": "2024-01-15",
  "rates": {
    "EUR": 0.85,
    "GBP": 0.75,
    "JPY": 110.0
  }
}
```

## 📁 Project Structure

```
nextjs-currency-converter/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx           # Main currency converter page
│   └── globals.css        # Global styles with Tailwind
├── lib/
│   └── useCurrencyStore.ts # Zustand store for state management
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── next.config.ts         # Next.js configuration
└── package.json          # Dependencies and scripts
```


## 🙏 Acknowledgments

- [ExchangeRate-API](https://exchangerate-api.com/) for providing free exchange rate data
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility classes
- [Next.js](https://nextjs.org/) team for the fantastic framework

---

⭐ **Star this repo if you found it helpful!**

[🔝 Back to top](#-currency-converter)