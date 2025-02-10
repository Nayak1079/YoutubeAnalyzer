import React from 'react'

export default function Footer() {
  return (
    <div className="bg-black text-white bg-opacity-80 text-center p-10">
        © {new Date().getFullYear()} YouTube Analyzer. All rights reserved.
    </div>
  )
}
