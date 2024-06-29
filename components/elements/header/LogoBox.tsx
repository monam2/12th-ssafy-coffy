import Image from 'next/image'
import React from 'react'

const LogoBox = () => {
  return (
    <div className='flex justify-center gap-2'>
        <Image className='p-1' src="/img/logo/logo-sm.png" width={55} height={40} alt='logo'/>
        <span className='text-2xl font-[Moyamoya] text-center my-auto'>삽히코히</span>
    </div>
  )
}

export default LogoBox