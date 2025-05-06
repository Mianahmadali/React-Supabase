import React from 'react'

const CopyRights = () => {
    const year = new Date().getFullYear()
  return (
    <footer className='text-light text-center bg-primary'>
        <div className="container  ">
            <div className="Row">
                <div className="col text=center py-2">&copy;{year} All rights are reserved by Ahmad</div>
            </div>
        </div>
    </footer>
  )
}

export default CopyRights