export default function GlassCard({
  children, className = '', variant = 'card',
  shimmer, liquid, style = {},
  onClick, onMouseDown, onMouseUp, onMouseLeave,
  onTouchStart, onTouchEnd, onMouseEnter,
  as: Tag = 'div', title, disabled,
}) {
  const cls = {
    card:   'g-card',
    btn:    'g-btn',
    pill:   'g-tag',
    modal:  'g-card',
    navbar: 'g-card',
  }[variant] || 'g-card'

  return (
    <Tag
      className={`${cls} ${className}`}
      onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      title={title} disabled={disabled} style={style}
    >
      {children}
    </Tag>
  )
}
