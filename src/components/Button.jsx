import React from 'react'

function Button({title, type, extraStyle, width, onClick}) {
  return (
    <button style={{width:`${width}px`}} onClick={onClick} type={type} className={`w-[248px] py-[11px] bg-sky-600 text-[14px] font-bold text-white rounded-[5px] ${extraStyle}`}>{title}</button>
  )
}

export default Button