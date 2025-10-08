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
          <div className="flex items-center space-x-2 mt-2">
            <a href="https://github.com/rohitpotato" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/github.svg" alt="github" width={24} height={24} />
            </a>
            <a href="https://twitter.com/rohitpotato" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/twitter.svg" alt="twitter" width={24} height={24} />
            </a>
            <a href="https://www.linkedin.com/in/rohit-kashyap-a33a4716a" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/linkedin.svg" alt="linkedin" width={24} height={24} />
            </a>
            <a href="mailto:rohit.212@icloud.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/email.png" alt="email" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </Window>
  )
}

export default AuthorProfile
