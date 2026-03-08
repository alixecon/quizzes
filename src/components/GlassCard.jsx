export default function GlassCard({
  children, className='', variant='card',
  shimmer, liquid, style={},
  onClick, onMouseDown, onMouseUp, onMouseLeave,
  onTouchStart, onTouchEnd, onMouseEnter,
  as:Tag='div', title, disabled,
}) {
  return (
    <Tag
      className={className}
      onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      title={title} disabled={disabled} style={style}
    >
      {children}
    </Tag>
  )
}
