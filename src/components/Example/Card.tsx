import React, { useState} from 'react'

   interface CardProps {
      title: string,
      paragraph: string
    }
    
    export const Card: React.FC<CardProps> = ({ title, paragraph }) =>  {
      return (
        <aside>
        <h2>{ title }</h2>
        <p>
          { paragraph }
        </p>
      </aside>
      )
    }

