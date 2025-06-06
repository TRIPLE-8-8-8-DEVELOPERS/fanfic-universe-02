
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				'xs': '480px',
			},
			height: {
				'screen-dynamic': '100dvh',
			},
			minHeight: {
				'screen-dynamic': '100dvh',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'calc(var(--radius) + 2px)',
				'2xl': 'calc(var(--radius) + 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"fade-out": {
					from: { opacity: "1", transform: "translateY(0)" },
					to: { opacity: "0", transform: "translateY(10px)" },
				},
				"scale-in": {
					from: { opacity: "0", transform: "scale(0.95)" },
					to: { opacity: "1", transform: "scale(1)" },
				},
				"scale-out": {
					from: { opacity: "1", transform: "scale(1)" },
					to: { opacity: "0", transform: "scale(0.95)" },
				},
				"slide-in": {
					from: { opacity: "0", transform: "translateX(-10px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				"slide-out": {
					from: { opacity: "1", transform: "translateX(0)" },
					to: { opacity: "0", transform: "translateX(-10px)" },
				},
				"slide-up": {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"pulse-slow": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.7" },
				},
				"text-shimmer": {
					from: { backgroundPosition: "0 0" },
					to: { backgroundPosition: "-200% 0" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				"glow": {
					"0%, 100%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.3)" },
					"50%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"scale-out": "scale-out 0.2s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"slide-out": "slide-out 0.3s ease-out",
				"slide-up": "slide-up 0.5s ease-out",
				"pulse-slow": "pulse-slow 3s ease-in-out infinite",
				"text-shimmer": "text-shimmer 2.5s ease-out infinite",
				"float": "float 3s ease-in-out infinite",
				"glow": "glow 2s ease-in-out infinite",
			},
			transitionTimingFunction: {
				"ease-spring": "cubic-bezier(0.37, 0, 0.63, 1)",
			},
			spacing: {
				'header': '4rem',
				'sidebar': '16rem',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
