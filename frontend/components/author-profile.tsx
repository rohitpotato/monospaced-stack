import Image from 'next/image'
import React from 'react'
import { colors } from '../app/__new/theme'
import Typography from './typography'
import Window from './window'

const AuthorProfile: React.FC = () => {
  return (
    <Window title="USER_ID:potato" className="mb-8">
      <div className="flex items-center space-x-4">
        <Image
          src="/neo-8bit.jpg"
          alt="rohitpotato"
          className={`w-24 h-24 border-2 border-${colors.border}`}
          width={96}
          height={96}
        />
        <div>
          <Typography variant="h3">rohitpotato</Typography>
          <Typography variant="body" color="textMuted" className="text-md">
            i just build stuff. exploring infrastructure by night and frontend by day.
          </Typography>
        </div>
      </div>
    </Window>
  )
}

export default AuthorProfile
