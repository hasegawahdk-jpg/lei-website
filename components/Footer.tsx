export default function Footer() {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '0.5px solid rgba(42,191,191,0.2)',
      padding: '1.5rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: '60px'
    }}>
      <p style={{
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSize: '12px',
        fontWeight: 400,
        color: '#2abfbf',
        letterSpacing: '0.08em',
        textAlign: 'center'
      }}>
        © 2025 LEI, inc. All Rights Reserved.
      </p>
    </footer>
  );
}
