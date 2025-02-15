import React from 'react'

export default function HoverMainDiv({children, isLoginOpen}) {
  return (
    <div className={isLoginOpen ? "dim-background" : ""}>
        {children}
    </div>
  )
}
