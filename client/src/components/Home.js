import React from 'react'
import Top10Songs from './Top10Songs'
import Top10Artists from './Top10Artists'

export default function Home() {
  return (
    <>
      <Top10Songs />
      <div style={{width: "100%", height: "1px", backgroundColor: "#808080", marginTop: "2rem", marginBottom: "2rem"}}></div>
      <Top10Artists />
    </>
  )
}
