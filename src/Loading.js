import React from 'react'

export default function Loading() {
    return (
        <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100vw",height:"70vh",position:"absolute",zIndex:9999999999}}>
            <img style={{width:"100%",height:"100%"}} src="https://i.pinimg.com/originals/07/bf/6f/07bf6f0f7d5dd64829822e95e97f908d.gif" alt="" />
        </div>
    )
}
