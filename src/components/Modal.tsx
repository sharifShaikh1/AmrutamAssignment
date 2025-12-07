import React from 'react'

type Props = {
  title?: string
  children?: React.ReactNode
  open: boolean
  onClose: () => void
}

const Modal: React.FC<Props> = ({ title, children, open, onClose }) => {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <div className="modal-header"><h4>{title}</h4></div>}
        <div className="modal-body">{children}</div>
        <div className="modal-foot" style={{display:'flex', justifyContent: 'flex-end', gap:12}}>
          <button className="btn outline" onClick={onClose}>Cancel</button>
          <button className="btn primary">Replace</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
