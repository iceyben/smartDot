import React from 'react'
import Image from 'next/image'

export const ProductDetailCard = () => {
  return (
      <div>
      <div className='relative '>
        <span className='flex absolute bottom-5 mx-auto justify-center'>
          <div>
            <Image src={"/image1.jpg"} alt='' width={123} height={123} className='w-10 h-10' />
          </div>
          <div>
            <Image src={"/image1.jpg"} alt='' width={123} height={123} className='w-10 h-10' />
          </div>
          <div>
            <Image src={"/image1.jpg"} alt='' width={123} height={123} className='w-10 h-10' />
            </div>
        </span>
              <Image src={"/image1.jpg"} alt='' width={123} height={123} className='w-full'/>
          </div>
          <div>
              
          </div>
    </div>
  )
}
