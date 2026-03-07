export default function GlassCard({
  children,
  className = '',
  variant = 'card',
  shimmer = false,
  liquid = false,
  style = {},
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onMouseEnter,
  as: Tag = 'div',
  title,
  disabled,
}) {
  const variantClass = {
    card:   'glass glass-card',
    btn:    'glass glass-btn',
    pill:   'glass glass-pill',
    modal:  'glass glass-modal',
    navbar: 'glass-navbar',
  }[variant] || 'glass glass-card'

  const shimmerClass = shimmer ? ' glass-shimmer' : ''
  const liquidClass  = liquid  ? ' glass-liquid'  : ''

  return (
    <Tag
      className={`${variantClass}${shimmerClass}${liquidClass} ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      title={title}
      disabled={disabled}
      style={style}
    >
      {children}
    </Tag>
  )
}
