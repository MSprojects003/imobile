import React from 'react'
import Image from 'next/image'
import logo from '../../pictures/own-brand.png'

function OwnBrand() {
  return (
    <div className="flex flex-col items-center space-y-0 mb-0">
      {/* Logo */}
      <div className="w-32 h-32 relative">
        <Image
          src={logo}
          alt="Company Logo "
          fill
          className="object-contain  "
          priority
        />
        
      </div>
      
      
    </div>
  )
}

export default OwnBrand