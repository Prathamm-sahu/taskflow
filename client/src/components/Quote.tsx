import { FC } from 'react'

interface QuoteProps {
  
}

const Quote: FC<QuoteProps> = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center px-28 bg-gray-100'>
      <div className='mb-4 text-3xl font-bold'>
      "The customer support I recieved was exceptional. The support team went above and beyond to address my concerns."
      </div>
      <div className='w-full font-bold text-xl'>
        Jules Winnfeild
      </div>
      <div className='w-full text-gray-600 font-semibold'>
        CEO, Acme Inc
      </div>
    </div>
  )
}

export default Quote