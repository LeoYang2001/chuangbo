'use client'

import { useRouter } from 'next/navigation'

const ReturnButton = () => {
    
    const router = useRouter()

    function handleClick(){
        router.back()
    }

  return (
    <div>
            <button
            onClick={handleClick}
                type='button'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
              >
                Return
            </button>
    </div>
  )
}

export default ReturnButton