export default function High24hIcon({ className = "w-6 h-6" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M7 17V7" />
            <path d="M3 11l4-4 4 4" />

            <text
                x="11"
                y="15"
                fontFamily="sans-serif"
                fontWeight="bold"
                fontSize="9px"
                fill="currentColor"
                stroke="none"
            >
                24h
            </text>
        </svg>
    );
}